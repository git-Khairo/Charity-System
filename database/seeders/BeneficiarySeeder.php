<?php

namespace Database\Seeders;

use App\Domain\Beneficiary\Models\Beneficiary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BeneficiarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Beneficiary::factory()->count(10)->create();

        $beneficiaries = \App\Domain\Beneficiary\Models\Beneficiary::all();
        $charities = \App\Domain\Charity\Models\Charity::all();

        foreach ($beneficiaries as $beneficiary) {
            // Each volunteer will participate in 1 to 10 random events
            $randomCharities = $charities->random(rand(1, 7));
            foreach ($randomCharities as $charity) {
                DB::table('requests')->insert([
                    'beneficiary_id' => $beneficiary->id,
                    'charity_id' => $charity->id,
                    'status'=> 'pending',
                    'priority' => '1',
                    'details' => 'once a upon a time there was someone aokoka skdkd fkodks odkooksd akoskd saoskdokosoakkod',
                    'full_name' => $beneficiary->name,
                    'email' => $beneficiary->email,
                    'phonenumber' => $beneficiary->phonenumber,
                    'address' => $beneficiary->address,
                ]);
            }
        }
    }
}
