<?php

namespace App\Application\Charity\UseCases;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;

class UpdateCharity
{
    protected CharityRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(CharityRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function updateCharity($id, $data){
        return $this->repo->update($id, $data);
    }
}
