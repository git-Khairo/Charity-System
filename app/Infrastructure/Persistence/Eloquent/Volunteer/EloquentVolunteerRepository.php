<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;


use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feddback;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            return null;
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
            'volunteer_id' => Auth::id(), // Volunteer
            'event_id' => $data['event_id'],
            'title' => $data['title'],
            'description'=>$data['description']
        ]);

        return $feedback;
    }

    public function findEvent($id) { return Event::findOrFail($id); }
    public function apply(array $data){

        $volunteer=$data['volunteer'];

        $volunteer->participation()->create([
            'event_id' => $data['event_id'],
            'full_name' => $data['full_name'],
            'phone_number' => $data['phone_number'],
            'address' => $data['address'],
            'email' => $data['email'],
            'study' => $data['study'],
            'national_number' => $data['national_number'],
            'gender' => $data['gender'],
            'why_charity' => $data['why_charity'],
            'availability_for_volunteering' => $data['availability_for_volunteering'],
            'preferred_time' => $data['preferred_time'],

            'Developmental' => $data['Developmental'] ?? false,
            'Child_care' => $data['Child_care'] ?? false,
            'Training' => $data['Training'] ?? false,
            'Shelter_and_relief' => $data['Shelter_and_relief'] ?? false,
            'Events_and_conferences' => $data['Events_and_conferences'] ?? false,
            'Awareness_campaigns' => $data['Awareness_campaigns'] ?? false,
            'Elderly_care' => $data['Elderly_care'] ?? false,
            'Supporting_women' => $data['Supporting_women'] ?? false,
            'Maintenance_technician' => $data['Maintenance_technician'] ?? false,
            'field_media_photography' => $data['field_media_photography'] ?? false,
            'Administrative_field' => $data['Administrative_field'] ?? false,

            'status' => $data['status'],
        ]);

        return ['message' =>'applied done successfully'];

    }

    public function charityVolunteer($data){

        $charityId=$data['charity_id'];

        $distinctAcceptedVolunteers = DB::table('participations')
            ->join('events', 'participations.event_id', '=', 'events.id')
            ->where('events.charity_id', $charityId)
            ->where('participations.status', 'Accepted')
            ->distinct('participations.volunteer_id')
            ->count('participations.volunteer_id');

        return $distinctAcceptedVolunteers;


    }

    public function allCharitiesVolunteerCounts()
    {
        $results = DB::table('participations')
            ->join('events', 'participations.event_id', '=', 'events.id')
            ->where('participations.status', 'Accepted')
            ->select('events.charity_id', DB::raw('COUNT(DISTINCT participations.volunteer_id) as volunteer_count'))
            ->groupBy('events.charity_id')
            ->get();

        return $results;
    }


}
