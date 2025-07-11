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

        $participation=$volunteer->participation;

        return $participation ;
    }



}
