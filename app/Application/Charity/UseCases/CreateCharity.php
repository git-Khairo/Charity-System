<?php

namespace App\Application\Charity\UseCases;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;

class CreateCharity
{
    protected CharityRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(CharityRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function createCharity($data){
        return $this->repo->create($data);
    }

}
