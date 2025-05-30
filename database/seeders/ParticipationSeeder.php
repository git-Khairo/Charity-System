<?php
namespace Database\Seeders;

use App\Domain\volunteer\Models;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParticipationSeeder extends Seeder
{
    public function run(): void
    {
        $volunteers = Models\Volunteer::all();
        $events = \App\Domain\Events\Models\Event::all();

        foreach ($volunteers as $volunteer) {
            // Each volunteer will participate in 1 to 10 random events
            $randomEvents = $events->random(rand(1, 10));
            foreach ($randomEvents as $event) {
                DB::table('participations')->insert([
                    'volunteer_id' => $volunteer->id,
                    'event_id' => $event->id,
                    'status'=> 'pending'
                ]);
            }
        }
    }
}
