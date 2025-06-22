<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;

class GetEventByCharity
{
    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getEventsByCharity($id){
        return $this->repo->byCharity($id);
    }
}
