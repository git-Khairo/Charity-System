<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
use Illuminate\Support\Facades\Auth;

class ApplyForEvents
{

    protected VolunteerRepositoryInterface $volunteerRepo ;
    protected BaseRepositoryInterface $eventRepo;
    public function __construct(VolunteerRepositoryInterface $volunteerRepo,EloquentEventRepository $eventRepo)
    {
        $this-> volunteerRepo = $volunteerRepo;
        $this->eventRepo=$eventRepo;
    }

    public function applyForEvent(array $data,$id){

      $volunteer=Auth::user();
      $event=$this->eventRepo->find($id);

        // Check for duplicate application
        if ($volunteer->event()->where('participations.event_id', $event->id)->exists()) {
            return ['message' => 'You have already applied to this event.'];
        }
        // Check event status and capacity
        if ($event->status !== 'open' || $event->NumOfVolunteer >= $event->capacity) {
            return ['message' => 'Cannot apply: Event is closed or full.'];
        }

        $data['volunteer']=$volunteer;
        $data['event_id']=$id;

      return $this->volunteerRepo->apply($data);

    }

    public function myEvent(){

        $volunteer = Auth::user();

        $volunteer->event;

        return $volunteer ;
    }



}
