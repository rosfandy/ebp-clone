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
        Schema::create('log_verifications', function (Blueprint $table) {
            $table->id();
            $table->uuid('staff_id')->index();
            $table->uuid('student_id')->index();
            $table->unsignedBigInteger('verification_status_id')->index();
            $table->dateTime('verification_date')->index();
            $table->text('message');
            $table->boolean('is_rejected')->index();
            $table->timestamps();

            $table->foreign('staff_id')->references('id')->on('staff');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('verification_status_id')->references('id')->on('verifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_verifications');
    }
};
