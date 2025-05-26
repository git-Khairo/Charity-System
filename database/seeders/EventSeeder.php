<?php

namespace Database\Seeders;


use App\Domain\Admins\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Community Park Cleanup',
                'description' => 'Join us to clean up City Park, removing litter and enhancing the environment. Gloves and tools provided.',
                'location' => 'City Park, Downtown',
                'status' => 'open',
                'capacity' => 50,
                'NumOfVolunteer' => 10,
            ],
            [
                'title' => 'Charity Run 2025',
                'description' => 'Participate in our annual 5K charity run to raise funds for local shelters. All fitness levels welcome!',
                'location' => 'Central Stadium',
                'status' => 'open',
                'capacity' => 200,
                'NumOfVolunteer' => 50,
            ],
            [
                'title' => 'Tree Planting Day',
                'description' => 'Help us plant 100 trees in the Green Valley area to promote sustainability and combat climate change.',
                'location' => 'Green Valley Forest',
                'status' => 'open',
                'capacity' => 30,
                'NumOfVolunteer' => 15,
            ],
            [
                'title' => 'Food Bank Volunteer Drive',
                'description' => 'Assist in sorting and distributing food to families in need at the local food bank.',
                'location' => 'Community Food Bank',
                'status' => 'open',
                'capacity' => 20,
                'NumOfVolunteer' => 8,
            ],
            [
                'title' => 'Beach Cleanup Initiative',
                'description' => 'Join us to clean up the coastline and protect marine life. Bring sunscreen and enthusiasm!',
                'location' => 'Sunny Beach',
                'status' => 'open',
                'capacity' => 40,
                'NumOfVolunteer' => 25,
            ],
            [
                'title' => 'Youth Mentorship Workshop',
                'description' => 'Volunteer to mentor local youth in career skills and personal development activities.',
                'location' => 'Community Center',
                'status' => 'open',
                'capacity' => 15,
                'NumOfVolunteer' => 5,
            ],
            [
                'title' => 'Animal Shelter Support Day',
                'description' => 'Help care for animals at the shelter by feeding, walking, and cleaning their spaces.',
                'location' => 'City Animal Shelter',
                'status' => 'closed',
                'capacity' => 10,
                'NumOfVolunteer' => 10,
            ],
            [
                'title' => 'Library Book Sorting',
                'description' => 'Assist in organizing and sorting books at the public library to support literacy programs.',
                'location' => 'Downtown Library',
                'status' => 'open',
                'capacity' => 25,
                'NumOfVolunteer' => 12,
            ],
            [
                'title' => 'Senior Citizen Tech Training',
                'description' => 'Teach seniors how to use smartphones and computers in this community outreach program.',
                'location' => 'Senior Community Center',
                'status' => 'open',
                'capacity' => 15,
                'NumOfVolunteer' => 3,
            ],
            [
                'title' => 'River Restoration Project',
                'description' => 'Work together to restore the local river by removing debris and planting native plants.',
                'location' => 'Riverfront Park',
                'status' => 'cancelled',
                'capacity' => 60,
                'NumOfVolunteer' => 0,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
