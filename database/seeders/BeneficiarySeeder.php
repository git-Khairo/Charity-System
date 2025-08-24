<?php

namespace Database\Seeders;

use App\Domain\Beneficiary\Models\Beneficiary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BeneficiarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        Beneficiary::factory()->count(10)->create();

        $beneficiaries = \App\Domain\Beneficiary\Models\Beneficiary::all();
        $charities = \App\Domain\Charity\Models\Charity::all();

        $maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
        $workStatuses = ["Retired", "Employeed", "Unemployeed", "Student"];
        $needsOptions = ["Housing Support", "Food Assistance", "Medical Aid", "Education Grants"];

        foreach ($beneficiaries as $beneficiary) {
            // Each volunteer will participate in 1 to 10 random events
            $randomCharities = $charities->random(rand(1, 7));
            foreach ($randomCharities as $charity) {
                DB::table('requests')->insert([
                    'beneficiary_id' => $beneficiary->id,
                    'charity_id' => $charity->id,
                    'maritalStatus'=> $maritalStatuses[array_rand($maritalStatuses)],
                    'workStatus'=> $workStatuses[array_rand($workStatuses)],
                    'needs'=> $needsOptions[array_rand($needsOptions)],
                    'numOfMembers'=> rand(1, 8),
                    'details' => $faker->sentence(12),
                    'full_name' => $beneficiary->name,
                    'email' => $beneficiary->email,
                    'phonenumber' => $beneficiary->phonenumber,
                    'address' => $beneficiary->address,
                ]);
            }
        }
    }
}
