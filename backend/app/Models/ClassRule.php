<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassRule extends Model
{

    protected $primaryKey = 'class_id';

    protected $fillable = [
        'class_id',
        'days_allowed',
    ];

    // Define relationships if necessary, for example, a class rule belongs to a class
    public function classroom()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
}
