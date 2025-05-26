<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;


use App\Domain\Admins\Models\Event;
use App\Domain\volunteer\Models\Volunteer;

use App\Domain\Volunteer\Models\Volunteer_feddback;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Auth;
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

        $token=$volunteer->createToken($volunteer->email,['Volunteer'])->plainTextToken;

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

    public function createFeedback(array $data)
    {
        $feedback=Volunteer_feddback::create([
            'volunteer_id' => auth()->id(), // Volunteer
            'event_id' => $data['event_id'],
            'title' => $data['title'],
            'description'=>$data['description']
        ]);

        return $feedback;
    }

    public function findEvent($id) { return Event::findOrFail($id); }
    public function apply(array $data){

        $volunteer=$data['volunteer'];

        // Attach the user to the event
        $volunteer->event()->attach($data['event_id'], [
            'volunteer_id' => $volunteer->id,
            'signup_date' => $data['signup_date'],
            'status' => $data['status'],
        ]);
        return ['message' =>'applied done successfully'];

    }

}
