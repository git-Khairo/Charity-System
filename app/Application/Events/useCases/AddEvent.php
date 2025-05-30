<?php

namespace App\Application\Events\useCases;

use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class AddEvent
{

    protected BaseRepositoryInterface $eventRepo;
    public function __construct(EloquentEventRepository $eventRepo)
    {
        $this->eventRepo=$eventRepo;
    }


    public function creatEvent(array $data){

        $data['NumOfVolunteer']=0;

        return $this->eventRepo->create($data);

    }

}
