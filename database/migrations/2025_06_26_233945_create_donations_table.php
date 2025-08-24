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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('charity_id')->constrained('charities')->cascadeOnDelete();
            $table->string('email');
            $table->string('phonenumber');
            $table->string('address');
            $table->string('image')->nullable();
            $table->decimal('amount', 8, 2);
            $table->string('payment_intent_id')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
