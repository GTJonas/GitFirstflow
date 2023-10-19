<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassRulesTable extends Migration
{
    public function up()
    {
        Schema::create('class_rules', function (Blueprint $table) {
            $table->integer('class_id')->autoIncrement();
            $table->string('days_allowed'); // Store days as a string, e.g., "Monday,Wednesday"
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('class_rules');
    }
}
