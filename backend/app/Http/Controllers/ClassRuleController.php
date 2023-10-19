<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassRule;

class ClassRuleController extends Controller
{
    /**
     * Display a listing of the class rules.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classRules = ClassRule::all();

        return response()->json($classRules);
    }

    /**
     * Store a newly created class rule in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'days_allowed' => 'required|string',
        ]);

        // Set the id field to the same value as class_id
        $validatedData['id'] = $validatedData['class_id'];
    
        $classRule = ClassRule::create($validatedData);
    
        return response()->json($classRule, 201);
    }
    

    /**
     * Display the specified class rule.
     *
     * @param  \App\Models\ClassRule  $classRule
     * @return \Illuminate\Http\Response
     */
    public function show(ClassRule $classRule)
    {
        return response()->json($classRule);
    }

    /**
     * Update the specified class rule in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassRule  $classRule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Validate the request data, including the class_id in the request body
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'days_allowed' => 'string',
        ]);
    
        // Find the class rule by class_id
        $classRule = ClassRule::where('class_id', $validatedData['class_id'])->first();
    
        if (!$classRule) {
            // Handle the case where the class rule is not found, you can return a response or throw an exception.
            return response()->json(['message' => 'Class rule not found'], 404);
        }
    
        // Update the class rule with the validated data
        $classRule->update([
            'days_allowed' => $validatedData['days_allowed'],
        ]);
    
        // Return a response indicating a successful update
        return response()->json($classRule, 200);
    }
    

    /**
     * Remove the specified class rule from storage.
     *
     * @param  \App\Models\ClassRule  $classRule
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassRule $classRule)
    {
        $classRule->delete();

        return response()->json(null, 204);
    }

        /**
     * Check if a class rule exists and update it or create a new one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkAndUpdate(Request $request)
    {
        // Validate the request data, including the class_id in the request body
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'days_allowed' => 'string',
        ]);

        // Check if a class rule already exists for the provided class_id
        $classRule = ClassRule::where('class_id', $validatedData['class_id'])->first();

        if (!$classRule) {
            // If no class rule exists, create a new one
            $classRule = ClassRule::create([
                'class_id' => $validatedData['class_id'],
                'days_allowed' => $validatedData['days_allowed'],
            ]);
        } else {
            // If a class rule exists, update it with the provided data
            $classRule->update([
                'days_allowed' => $validatedData['days_allowed'],
            ]);
        }

        // Return a response indicating a successful update or creation
        return response()->json($classRule, 200);
    }
}
