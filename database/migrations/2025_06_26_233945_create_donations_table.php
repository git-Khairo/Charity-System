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
            $table->longText('details');
            $table->string('address');
            $table->string('image')->nullable();
            $table->decimal('amount');
            $table->string('payment_info');
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
