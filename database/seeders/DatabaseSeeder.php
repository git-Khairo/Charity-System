<?php

namespace Database\Seeders;

use App\Domain\Admins\Models\Admin;
use App\Domain\Beneficiary\Models\Beneficiary;
use App\Domain\Charity\Models\Charity;
use App\Domain\Events\Models\Event;
use App\Domain\Volunteer\Models\Volunteer;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CategorySeeder::class);
        $this->call(CharitySeeder::class);
        $this->call(EventSeeder::class);
    }
}
