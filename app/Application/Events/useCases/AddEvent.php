<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class AddEvent
{

    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo=$repo;
    }


    public function createEvent($data){
        $data['NumOfVolunteer'] = 0;
    //    $data = $data->toArray();
        return $this->repo->create($data);
    }

}
