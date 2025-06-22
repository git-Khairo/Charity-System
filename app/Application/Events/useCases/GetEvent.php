<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;

class GetEvent
{
    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getEvent($id){
        return $this->repo->find($id);
    }
}
