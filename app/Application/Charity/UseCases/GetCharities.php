<?php

namespace App\Application\Charity\UseCases;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;

class GetCharities
{
    protected CharityRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(CharityRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getCharites(){
        return $this->repo->all();
    }
}
