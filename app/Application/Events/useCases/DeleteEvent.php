<?php

namespace App\Application\Events\useCases;

use App\Domain\Events\Repositories\EventRepositoryInterface;

class DeleteEvent
{
    protected EventRepositoryInterface $repo;
    public function __construct(EventRepositoryInterface $repo)
    {
        $this->repo=$repo;
    }

    public function deleteEvent($id){
        return $this->repo->delete($id);
    }

}
