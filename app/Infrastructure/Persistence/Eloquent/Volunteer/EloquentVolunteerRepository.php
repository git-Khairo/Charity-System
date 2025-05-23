<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\volunteer\Models\Volunteer;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class EloquentVolunteerRepository implements VolunteerRepositoryInterface
{
    public function all() { return Volunteer::all(); }

    public function find($id) { return Volunteer::findOrFail($id); }

    public function create(array $data) { return Volunteer::create($data); }

    public function update($id, array $data) {
        $volunteer = Volunteer::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Volunteer::findOrFail($id);
        return $volunteer->delete();
    }

    public function Register(array $data){

        $data['skills'] = json_encode($data['skills']);

        $volunteer = Volunteer::create($data);

        $volunteer['skills']=json_decode( $volunteer['skills'],true);

        $token=$volunteer->createToken($volunteer->email)->plainTextToken;

        $response=[
            'user'=>$volunteer,
            'token'=>$token
            ];

        return $response;
    }

    public function login(array $data){


        $volunteer=Volunteer::where('email',$data['email'])->first();
        if(!$volunteer){
            $volunteer=Volunteer::where('phoneNumber',$data['email'])->first();
        }
        if(!$volunteer||!Hash::check($data['password'],$volunteer->password)){
            return [
                'message'=>'wrong password or Email'
            ];
        }

        $volunteer['skills']=json_decode( $volunteer['skills'],true);

        $token=$volunteer->createToken($volunteer->email)->plainTextToken;

        $response=[
            'user' =>$volunteer,
            'token' =>$token
        ];

        return $response;
    }

}
