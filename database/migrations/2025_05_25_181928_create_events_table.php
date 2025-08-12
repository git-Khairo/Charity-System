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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('charity_id')->constrained('charities')->cascadeOnDelete();
            $table->json('title');          // translatable
            $table->json('images');
            $table->json('description');    // translatable
            $table->json('location');       // translatable
            $table->string('status');
            $table->integer('capacity');
            $table->integer('NumOfVolunteer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
