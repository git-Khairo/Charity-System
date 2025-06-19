<?php

namespace Database\Seeders;

use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CharitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Charity::factory()->count(10)->create();
    }
}
