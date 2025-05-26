<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryRepository;
use Illuminate\Support\Facades\Auth;

class ApplyForEvents
{

    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo,EloquentBeneficiaryRepository $repo2)
    {
        $this->repo = $repo;
    }

    public function applyForEvent(array $data,$id){

      $volunteer=Auth::user();
      $event=$this->repo->findEvent($id);

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

      return $this->repo->apply($data);

    }

    public function myEvent(){

        $volunteer = Auth::user();

        $volunteer->event;

        return $volunteer ;
    }



}
