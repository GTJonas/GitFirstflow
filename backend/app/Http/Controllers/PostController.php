<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\ClassRule;
use App\Models\User;
use App\Models\Company;
use App\Models\ProcessingHistory;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class PostController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Get the authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                'content' => 'required|string|max:255',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
                'from' => 'required|date_format:H:i|nullable',
                'to' => 'required|date_format:H:i|nullable',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

        // Check if the student is in a class and company
        if ($user->class_id && $user->company_uuid) {
            // Get the current day of the week (e.g., "Monday", "Wednesday")
            $currentDay = Carbon::now()->format('l');

            // Fetch class rules for the student's class
            $classRules = ClassRule::where('class_id', $user->class_id)->first();

            if (!$classRules) {
                return response()->json(['error' => 'Class rules not found for this class.'], 400);
            }

            // Check if the current day is allowed according to the class rules
            $allowedDays = explode(',', $classRules->days_allowed);
            if (!in_array($currentDay, $allowedDays)) {
                return response()->json(['error' => 'You cannot post on this day.'], 400);
            }

            // Create a new post
            $post = new Post();
            $post->uuid = Str::uuid()->toString();
            $post->content = $request->input('content');
            $post->user_uuid = $user->uuid;

            // Process the uploaded image and use the post UUID as the file name
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = $post->uuid . '.' . 'png';
                $imagePath = $image->storeAs('post_images', $imageName, 'public');

                // Resize the uploaded image to a fixed width while maintaining aspect ratio
                $resizedImage = Image::make(public_path('storage/' . $imagePath))
                    ->resize(1440, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })
                    ->save(public_path('storage/' . $imagePath)); // Save the resized image
            }

            $url = 'http://194.71.0.30:8000/storage/';
            if ($imagePath) {
                $post->image = $url . $imagePath;
            } else {
                $post->image = null;
            }
            
            $post->class_id = $user->class_id;
            $post->company_id = $user->company_uuid;
            $post->status = 'pending';
            $post->from = $request->input('from');
            $post->to = $request->input('to');
            $post->save();

            // Create a record in processing history for the pending post
            ProcessingHistory::create([
                'post_id' => $post->uuid,
                'supervisor_id' => null, // No supervisor initially
                'user_id' => $post->user_uuid,
                'processing_date' => null, // No processing date initially
                'feedback' => null, // No feedback initially
                'status' => 'pending', // Status is 'pending'
            ]);

            return response()->json($post, 201);
        } else {
            return response()->json(['error' => 'You are not in a class or company.'], 400);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Failed to authenticate.'], 401);
    }
}

    public function getClasses()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            // Need A If role_id === 2 for supervisors to see its classes




            if ($user->role_id === 3) {
                $teacherClasses = SchoolClass::where('teacher_id', $user->uuid)->with('students')->get(['id', 'name']);

                $formattedClasses = [];
                foreach ($teacherClasses as $class) {
                    $formattedClass = [
                        'id' => $class->id,
                        'name' => $class->name,
                    ];
                    $formattedClasses[] = $formattedClass;
                }

                return response()->json(['teacherClasses' => $formattedClasses]);
            } else {
                return response()->json(['teacherClasses' => "Null"]);;
            }

        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to authenticate.'], 401);
        }
    }

    public function getUsersForClass(Request $request)
    {
        try {
            // Get the authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            // Check if the authenticated user is a teacher or admin
            if ($user->role_id !== 3 && $user->role_id !== 1) {
                return response()->json(['error' => 'Unauthorized.'], 401);
            }

            // Retrieve the selected class ID from the query parameter
            $classId = $request->input('classId');

            // Fetch users who belong to the specified class
            $users = User::where('class_id', $classId)->get(['id', 'name']);

            return response()->json(['userOptions' => $users]);

        } catch (JWTException $e) {
            // Something went wrong with JWT token
            return response()->json(['error' => 'Failed to authenticate.'], 401);
        }
    }

public function acceptPost($postId)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();

        $post = Post::findOrFail($postId);

        // Update the status in the 'posts' table
        $post->update(['status' => 'approved', 'handled_by' => $user->uuid]);

        // Find and update the corresponding record in the 'processing_history' table
        ProcessingHistory::where('post_id', $post->uuid)->update([
            'supervisor_id' => $user->uuid,
            'processing_date' => now(),
            'feedback' => 'approved',
            'status' => 'approved', // Update status in processing_history
        ]);

        return response()->json(['message' => 'Post accepted']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to accept post'], 500);
    }
}

public function declinePost($postId)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();

        $post = Post::findOrFail($postId);

        // Update the status in the 'posts' table
        $post->update(['status' => 'rejected', 'handled_by' => $user->uuid]);

        // Find and update the corresponding record in the 'processing_history' table
        ProcessingHistory::where('post_id', $post->uuid)->update([
            'supervisor_id' => $user->uuid,
            'processing_date' => now(),
            'feedback' => 'rejected',
            'status' => 'rejected', // Update status in processing_history
        ]);

        return response()->json(['message' => 'Post declined']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to decline post'], 500);
    }
}


public function getFilteredPosts(Request $request)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
        $role = $user->role_id;

        // Get the 'user' query parameter
        $userParam = $request->query('user');

        // Get the 'class' query parameter
        $classParam = $request->query('class');

        // Initialize the query builder for 'Post' model
        $filteredPosts = Post::query()->with('user');

        // Initialize an array to store user-related class IDs
        $classIds = []; // Initialize the array here

        // Use a switch statement to determine how posts should be filtered
        switch ($role) {
            case 1: // Admin - Show all users
                // No additional filtering needed
                break;

            case 2: // Supervisor - Show only posts with the company UUID
                $filteredPosts->where('company_id', $user->company_uuid);
                break;

            case 3: // Teacher - Show posts related to the teacher's classes
                $classIds = SchoolClass::where('teacher_id', $user->uuid)->pluck('id');
                $filteredPosts->whereIn('class_id', $classIds);
                break;

            case 4: // Student - Show only posts with the user's ID
                $filteredPosts->where('user_uuid', $user->uuid);
                break;

            default:
                // Handle other roles if needed
                break;
        }

        // Filter posts by 'user' parameter if provided
        if ($userParam) {
            $filteredPosts->where('user_uuid', $userParam);
        }

        // Filter posts by 'class' parameter if provided
        if ($classParam) {
            $filteredPosts->where('class_id', $classParam);
        }

        // ... Global Filter methods

        $perPage = $request->input('per_page', 5); // Default per page is 5
        $paginatedPosts = $filteredPosts->orderByDesc('created_at')->paginate($perPage);

        $transformedPosts = $paginatedPosts->getCollection()->map(function ($post) use ($user, $role) {
            // Transform the post as needed
            return $post;
        });

        return response()->json([
            'filteredPosts' => $transformedPosts,
            'pagination' => [
                'current_page' => $paginatedPosts->currentPage(),
                'last_page' => $paginatedPosts->lastPage(),
                'per_page' => $paginatedPosts->perPage(),
                'total' => $paginatedPosts->total(),
            ],
            'classes' => $classIds // Use the classIds value here
        ]);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Failed to authenticate.'], 401);
    }
}


    function getAttendanceStatus(Request $request)
    {
        // parameters
        $user = JWTAuth::parseToken()->authenticate();
        $desiredDate = $request->input('desiredDate'); // Get the desired date from the request
        $classSelector = $request->input('classSelector'); // Get the class selector from the request
    
        // Default to the current date if $desiredDate is not provided
        $desiredDate = $desiredDate ?: date('Y-m-d');
    
        // Retrieve the class IDs assigned to the teacher
        $classIds = SchoolClass::where('teacher_id', $user->uuid)->pluck('id');
    
        if ($classSelector) {
            // If a class selector is provided, filter classes based on it
            $classIds->where('class_selector', $classSelector);
        }
    
        // Retrieve students in the assigned classes
        $students = ($classSelector)
            ? User::whereIn('class_id', $classIds)
                ->where('class_selector', $classSelector)
                ->get()
            : User::whereIn('class_id', $classIds)->get();
    
        // Initialize arrays to store attendance status
        $attendanceStatus = [
            'approved' => [],
            'rejected' => [],
            'pending' => [],
        ];
    
        $studentCount = $students->count(); // Calculate the student count
    
        foreach ($students as $student) {
            // Check if there is a processing history record
            $attendances = ProcessingHistory::where([
                'processing_date' => $desiredDate,
                'user_id' => $student->uuid,
            ])->get();
    
            $attendanceDate = null; // Initialize the variable
            $allPending = true; // Assume all records are pending initially
    
            foreach ($attendances as $attendance) {
                $status = $attendance->status;
                $attendanceDate = $attendance->created_at->toDateString();
    
                if ($status === 'approved') {
                    $attendanceStatus['approved'][] = [
                        'student_uuid' => $student->uuid,
                        'student_name' => $student->first_name.' '.$student->last_name,
                        'date' => $attendanceDate,
                    ];
                    $allPending = false; // At least one record is not pending
                } elseif ($status === 'rejected') {
                    $attendanceStatus['rejected'][] = [
                        'student_uuid' => $student->uuid,
                        'student_name' => $student->first_name.' '.$student->last_name,
                        'date' => $attendanceDate,
                    ];
                    $allPending = false; // At least one record is not pending
                }
            }
    
            if ($allPending) {
                // All records are pending, categorize the student as pending
                $attendanceStatus['pending'][] = [
                    'student_uuid' => $student->uuid,
                    'student_name' => $student->first_name.' '.$student->last_name,
                    'date' => null, // You can set it to null or leave it empty
                ];
            }
        }
    
        $classes = SchoolClass::whereIn('id', $classIds)->get();
    
        // Include the classes in the response
        $attendanceStatus['classes'] = $classes;
    
        // Include the student count in the JSON response
        $attendanceStatus['studentCount'] = $studentCount;
    
        return $attendanceStatus;
    }

}