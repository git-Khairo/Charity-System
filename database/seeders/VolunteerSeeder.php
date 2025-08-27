<?php

namespace Database\Seeders;

use App\Domain\Volunteer\Models\Volunteer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class VolunteerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Volunteer::factory()->count(10)->create();

        $faker = Faker::create();

        // Get existing volunteer and event IDs
        $volunteerIds = DB::table('volunteers')->pluck('id')->toArray();
        $eventIds = DB::table('events')->pluck('id')->toArray();

        // Check if there are volunteers and events
        if (empty($volunteerIds) || empty($eventIds)) {
            throw new \Exception('No volunteers or events found. Please seed those tables first.');
        }

        // Generate 20 feedback entries
        $feedbacks = [];
        for ($i = 0; $i < 20; $i++) {
            $feedbacks[] = [
                'volunteer_id' => $faker->randomElement($volunteerIds), // Random volunteer ID
                'rating' => $faker->numberBetween(1, 5), // Random rating between 1 and 5
                'event_id' => $faker->randomElement($eventIds), // Random event ID
                'title' => $faker->sentence(4), // Random 4-word title
                'description' => $faker->paragraph(2), // Random 2-sentence description
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert feedback entries into the table
        DB::table('volunteer_feedbacks')->insert($feedbacks);
    }
}
