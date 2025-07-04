<?php

namespace App\Infrastructure\Persistence\Eloquent\Admins;

use App\Domain\Admins\Repositories\SuperAdminRepositoriesInterface;
use App\Domain\Beneficiary\Models\Beneficiary;
use Illuminate\Support\Facades\Hash;

class EloquentSuperAdminRepository implements SuperAdminRepositoriesInterface
{
    public function login(array $data){
        // Attempt to find the beneficiary by email
        $superAdmin = Beneficiary::where('email', $data['email'])->first();

        if (!$superAdmin || !Hash::check($data['password'], $superAdmin->password)) {
            return null;
        }

        // Create a personal access token
        $token = $superAdmin->createToken($superAdmin->email)->plainTextToken;

        return [
            'user'  => $superAdmin,
            'token' => $token
        ];
    }

    public function logout($request){
        $request->user()->tokens()->delete();
        return;
    }

}
