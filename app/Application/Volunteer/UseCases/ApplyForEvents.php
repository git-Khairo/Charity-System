<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
use Illuminate\Support\Facades\Auth;

class ApplyForEvents
{

    protected VolunteerRepositoryInterface $volunteerRepo ;
    protected EventRepositoryInterface $eventRepo;
    public function __construct(VolunteerRepositoryInterface $volunteerRepo,EventRepositoryInterface $eventRepo)
    {
        $this-> volunteerRepo = $volunteerRepo;
        $this->eventRepo=$eventRepo;
    }

    public function applyForEvent(array $data,$id){

      $volunteer=Auth::user();
      $event=$this->eventRepo->find($id);

        // Check for duplicate application
        if ($volunteer->participation()->where('event_id', $event->id)->exists()) {
            return ['message' => 'You have already applied to this event.'];
        }
        // Check event status and capacity
        if ($event->status !== 'upcoming' || $event->NumOfVolunteer >= $event->capacity) {
            return ['message' => 'Cannot apply: Event is closed or full.'];
        }

        $data['volunteer']=$volunteer;
        $data['full_name']= $volunteer->name;
        $data['phone_number']= $volunteer->phoneNumber;
        $data['study']= $volunteer->study;
        $data['address']= $volunteer->address;
        $data['email']= $volunteer->email;
        $data['event_id']=$id;

      return $this->volunteerRepo->apply($data);

    }

    public function myEvent(){

        $volunteer = Auth::user();

        $volunteer->participation;

        $participation=$volunteer['participation'];


        if(!$participation->first()){

            return response()->json(['message' => 'No participation found'], 404);
        }
        $participation = $participation->first(); // or directly if you have one instance

        $event=$this->eventRepo->find($participation->first()->event_id);

        $fields = [
            "Developmental",
            "Child_care",
            "Training",
            "Shelter_and_relief",
            "Events_and_conferences",
            "Awareness_campaigns",
            "Elderly_care",
            "Supporting_women",
            "Maintenance_technician",
            "field_media_photography",
            "Administrative_field",
        ];



        $selectedFields = collect($participation->only($fields))
            ->filter(fn($value) => $value == 1)
            ->keys()
            ->toArray();

        $eventId = $participation->event_id;

       // dd($event);

        $response=[
            'title'=>$event->title,
            'location'=>$event->location,
            'whyVolunteer'=>$participation->why_charity,
            'preferredTime'=> $participation->preferred_time,
            'availability'=> $participation->availability_for_volunteering,
            'interests'=>$selectedFields,
            'status'=> $participation->status,
        ];

        //$participation->event;

        return $response ;
    }


    public function eventStatus($data){

        return $this->volunteerRepo->eventStat($data);

    }

    public function report($id,$data){

        $data['id']=$id;

        return $this->volunteerRepo->getMonthlyAcceptedEvents($data);
    }



}
