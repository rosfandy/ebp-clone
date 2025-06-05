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
        Schema::create('ebp_letters', function (Blueprint $table) {
            $table->id();
            $table->integer('reference_number')->default(0);
            $table->string('reference_id')->nullable();
            $table->string('name_of_head')->nullable();
            $table->string('nip_of_head')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ebp_letters');
    }
};
