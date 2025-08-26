<?php

namespace Database\Seeders;

use App\Domain\Admins\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
                'name' => 'Super Admin',
                'email' => 'superadmin@example.com',
                'password' => Hash::make('password123'),
                'phonenumber' => '0951456811',
                'created_at' => now(),
                'updated_at' => now(),
        ]);
        $superAdmin = Admin::firstOrFail();
        $superadminRole = Role::firstOrCreate(['name' => 'SuperAdmin','guard_name' => 'api']);

        $superAdmin->assignRole($superadminRole);
        
    }
}
