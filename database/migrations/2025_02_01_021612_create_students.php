<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->index();
            $table->unsignedBigInteger('degree_id')->index();
            $table->unsignedBigInteger('faculty_id')->index();
            $table->unsignedBigInteger('department_id')->index();
            $table->unsignedBigInteger('verification_status_id')->default(1)->index();
            $table->string('final_project');
            $table->string('repository_code')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('degree_id')->references('id')->on('degrees');
            $table->foreign('faculty_id')->references('id')->on('faculties');

            $table->foreign('department_id')->references('id')->on('departments');
            $table->foreign('verification_status_id')->references('id')->on('verifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
