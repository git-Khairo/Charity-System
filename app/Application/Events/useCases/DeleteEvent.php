<?php

namespace App\Application\Events\useCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class DeleteEvent
{
    protected BaseRepositoryInterface $eventRepo;
    public function __construct(EloquentEventRepository $eventRepo)
    {
        $this->eventRepo=$eventRepo;
    }

    public function deleteEvent($id){

        return $this->eventRepo->delete($id);

    }

}
