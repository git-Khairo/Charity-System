<?php

namespace App\Infrastructure\Persistence\Eloquent\Beneficiary;

use App\Domain\Beneficiary\Models\Beneficiary;
use App\Domain\Beneficiary\Models\BeneficiaryFeedback;
use App\Domain\Beneficiary\Models\Request;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentBeneficiaryRepository implements BeneficiaryRepositoryInterface
{
    public function all(){
        return Beneficiary::all();
    }

    public function find($id){
        return Beneficiary::findOrFail($id);
    }

    public function register(array $data){
        $beneficiary = Beneficiary::create($data);

        $token=$beneficiary->createToken($beneficiary->email)->plainTextToken;

        $response=[
            'user'=>$beneficiary,
            'token'=>$token
        ];

        return $response;
    }

    public function login(array $data){
            // Attempt to find the beneficiary by email
        $beneficiary = Beneficiary::where('email', $data['email'])->first();

        if (!$beneficiary || !Hash::check($data['password'], $beneficiary->password)) {
            return null;
        }

        // Create a personal access token
        $token = $beneficiary->createToken($beneficiary->email)->plainTextToken;

        return [
            'user'  => $beneficiary,
            'token' => $token
        ];
    }

    public function logout($request){
        $request->user()->tokens()->delete();
        return;
    }

    public function update($id, array $data){
        $beneficiary = Beneficiary::findOrFail($id);
        $beneficiary->update($data);
        return $beneficiary;
    }

    public function apply($id, array $data){
        $beneficiary = Auth::user();

        // Create the request
        $request = Request::create([
            'charity_id'     => $id,
            'beneficiary_id' => $beneficiary->id,
            'details'        => $data['details'] ?? null,
            'priority'       => $data['priority'] ?? 'normal', // default if not provided
            'status'         => $data['status'] ?? 'pending',  // default if not provided
        ]);

        return $request;
    }

    public function createFeedback($id, array $data){
        $beneficiary = Auth::user();

        // Create the feedback
        $feedback = BeneficiaryFeedback::create([
            'charity_id'     => $id,
            'beneficiary_id' => $beneficiary->id,
            'title'          => $data['title'] ?? null,
            'description'    => $data['description'] ?? null,
        ]);

        return $feedback;
    }

    public function charityBeneficiary(){

        $results = DB::table('requests')
            ->select('charity_id', DB::raw('COUNT(*) as accepted_count'))
            ->where('status', 'Accepted')
            ->groupBy('charity_id')
            ->get();

        return $results;

    }
}
