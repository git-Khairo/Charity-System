<?php

namespace App\Application\Events\useCases;

use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class UpdateEvent
{

    protected BaseRepositoryInterface $eventRepo;
    public function __construct(EloquentEventRepository $eventRepo)
    {
        $this->eventRepo=$eventRepo;
    }


    public function updateEvent($id,array $data){

        return $this->eventRepo->update($id,$data);

    }

}
