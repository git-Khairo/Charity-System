<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class UpdateEvent
{

    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo=$repo;
    }


    public function updateEvent($id,$data){
        return $this->repo->update($id,$data);
    }

}
