<?php

namespace Database\Seeders;


use App\Domain\Events\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::factory()->count(20)->create(); // creates 20 fake events
    }
}
