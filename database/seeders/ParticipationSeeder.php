<?php
namespace Database\Seeders;

use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParticipationSeeder extends Seeder
{
     public function run(): void
    {
        $volunteers = Volunteer::all();
        $events = Event::all();

        // Sample data for fields
        $genders = ['male', 'female'];
        $availabilities = ['full-time', 'part-time', 'weekends', 'evenings'];
        $preferred_times = ['morning', 'afternoon', 'evening', 'flexible'];
        $studies = ['Computer Science', 'Business Administration', 'Nursing', 'Education', 'Engineering', 'Arts'];
        $why_charity_options = [
            'I want to give back to the community.',
            'Passionate about helping others.',
            'To gain new skills and experiences.',
            'Inspired by personal experiences.'
        ];
        $statuses = ['Accepted', 'Rejected', 'Pending'];

        foreach ($volunteers as $volunteer) {
            // Each volunteer will participate in 1 to 10 random events
            $randomEvents = $events->random(rand(1, 10));
            foreach ($randomEvents as $event) {
                DB::table('participations')->insert([
                    'full_name' => $volunteer->name ?? 'John Doe',
                    'phone_number' => '123-456-' . rand(1000, 9999),
                    'address' => '123 Random St, City ' . rand(1, 100),
                    'email' => 'user' . rand(1, 1000) . '@example.com',
                    'study' => $studies[array_rand($studies)],
                    'national_number' => 'NAT' . rand(100000, 999999),
                    'gender' => $genders[array_rand($genders)],
                    'why_charity' => $why_charity_options[array_rand($why_charity_options)],
                    'availability_for_volunteering' => $availabilities[array_rand($availabilities)],
                    'preferred_time' => $preferred_times[array_rand($preferred_times)],
                    'Developmental' => (bool)rand(0, 1),
                    'Child_care' => (bool)rand(0, 1),
                    'Training' => (bool)rand(0, 1),
                    'Shelter_and_relief' => (bool)rand(0, 1),
                    'Events_and_conferences' => (bool)rand(0, 1),
                    'Awareness_campaigns' => (bool)rand(0, 1),
                    'Elderly_care' => (bool)rand(0, 1),
                    'Supporting_women' => (bool)rand(0, 1),
                    'Maintenance_technician' => (bool)rand(0, 1),
                    'field_media_photography' => (bool)rand(0, 1),
                    'Administrative_field' => (bool)rand(0, 1),
                    'volunteer_id' => $volunteer->id,
                    'event_id' => $event->id,
                    'status' => $statuses[array_rand($statuses)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
