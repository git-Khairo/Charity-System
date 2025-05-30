<?php

namespace Database\Seeders;

use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feddback;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create(); // Use Faker instance

        $volunteers = Volunteer::factory()->count(50)->create();
        $events = Event::factory()->count(20)->create();

        foreach ($events as $event) {
            // Assign 5–15 random volunteers to each event
            $selectedVolunteers = $volunteers->random(rand(5, 15));

            // Attach volunteers with pivot data
            $attachData = [];
            foreach ($selectedVolunteers as $volunteer) {
                $attachData[$volunteer->id] = ['status' => 'confirmed'];
            }

            // Must use the correct relationship name as defined in the Event model
            $event->volunteer()->attach($attachData);

            // Update volunteer count
            $event->NumOfVolunteer = count($attachData);
            $event->save();

            // Generate feedback
            foreach ($selectedVolunteers->take(rand(3, $selectedVolunteers->count())) as $volunteer) {
                Volunteer_feddback::create([
                    'volunteer_id' => $volunteer->id,
                    'event_id' => $event->id,
                    'title' => $faker->sentence,
                    'description' => $faker->paragraph,
                ]);
            }
        }
    }
}
