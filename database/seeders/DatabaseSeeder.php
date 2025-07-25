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

       // DB::table('admins')->truncate();
        // Ensure the 'admin' role exists
        $adminRole=Role::firstOrCreate(['name' => 'Admin','guard_name' => 'api']);

        $admin=Admin::factory()->create();

        // Assign the 'admin' role
        $admin->assignRole($adminRole);

        Volunteer::factory()->count(10)->create();
        $categories = ['Health', 'Education', 'Food', 'Shelter', 'Disaster Relief'];
        foreach ($categories as $name) {
            DB::table('categories')->insert([
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        Charity::factory()->create([
            'admin_id' => $admin->id,  // <-- Use the actual ID here
        ]);
        Event::factory()->count(5)->create();
        Beneficiary::factory()->count(5)->create();
    }
}
