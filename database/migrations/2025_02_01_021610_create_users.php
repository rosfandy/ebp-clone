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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 200)->nullable()->index();
            $table->string('username')->nullable()->index();
            $table->string('gender', 10)->nullable();
            $table->dateTime('birthdate')->nullable();
            $table->enum('role', ['Administrator', 'Tendik', 'Mahasiswa'])->default('Mahasiswa');
            $table->string('email')->nullable()->index();
            $table->string('password', 255)->nullable();
            $table->tinyInteger('email_verified')->default(0);

            $table->string('alternate_email')->nullable();
            $table->tinyInteger('alternate_email_verified')->default(0);

            $table->string('phone', 18)->nullable()->index();
            $table->tinyInteger('phone_verified')->default(0);
            $table->string('sso_role')->nullable()->index();

            $table->string('zoneinfo', 50)->nullable();
            $table->string('locale', 10)->nullable();
            $table->string('picture')->nullable();

            $table->timestamps();
            $table->uuid('updater');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
