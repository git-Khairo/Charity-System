<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;

class GetEvents
{
    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getEvents(){
        return $this->repo->all();
    }
}
