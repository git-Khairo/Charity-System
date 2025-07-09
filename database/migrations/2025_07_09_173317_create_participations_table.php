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
        Schema::create('participations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->text('phone_number');
            $table->string('address');
            $table->string('email');
            $table->text('study');
            $table->text('national_number');
            $table->enum('gender', ['male', 'female']);
            $table->text('why_charity');
            $table->string('availability_for_volunteering');
            $table->string('preferred_time');
            $table->boolean('Developmental')->default(false)->nullable();
            $table->boolean('Child_care')->default(false)->nullable();
            $table->boolean('Training')->default(false)->nullable();
            $table->boolean('Shelter_and_relief')->default(false)->nullable();
            $table->boolean('Events_and_conferences')->default(false)->nullable();
            $table->boolean('Awareness_campaigns')->default(false)->nullable();
            $table->boolean('Elderly_care')->default(false)->nullable();
            $table->boolean('Supporting_women')->default(false)->nullable();
            $table->boolean('Maintenance_technician')->default(false)->nullable();
            $table->boolean('field_media_photography')->default(false)->nullable();
            $table->boolean('Administrative_field')->default(false)->nullable();
            $table->foreignId('volunteer_id')->constrained('volunteers')->cascadeOnDelete();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participations');
    }
};
