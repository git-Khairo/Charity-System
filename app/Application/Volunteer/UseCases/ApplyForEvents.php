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

    public function myEvent()
    {
        $volunteer = Auth::user();

        $participations = $volunteer->participation; // assuming this is a relationship

        if ($participations->isEmpty()) {
            return response()->json(['message' => 'No participation found'], 404);
        }

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

        $response = [];

        foreach ($participations as $participation) {
            $event = $this->eventRepo->find($participation->event_id);

            $selectedFields = collect($participation->only($fields))
                ->filter(fn($value) => $value == 1)
                ->keys()
                ->toArray();

            $response[] = [
                'title' => $event ? $event->title : null,
                'location' => $event ? $event->location : null,
                'whyVolunteer' => $participation->why_charity,
                'preferredTime' => $participation->preferred_time,
                'availability' => $participation->availability_for_volunteering,
                'interests' => $selectedFields,
                'status' => $participation->status,
            ];
        }

        return $response;
    }



    public function eventStatus($data){

        return $this->volunteerRepo->eventStat($data);

    }

    public function report($id,$data){

        $data['id']=$id;

        return $this->volunteerRepo->getMonthlyAcceptedEvents($data);
    }


    public function volunteerEvents(){

        $volunteer=Auth::user();

        $response=$this->volunteerRepo->getMyEvent($volunteer->id);


        return $response->pluck('event')->unique('id')->values();

    }


}
