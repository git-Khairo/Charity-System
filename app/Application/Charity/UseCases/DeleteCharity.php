<?php

namespace App\Application\Charity\UseCases;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;

class DeleteCharity
{
    protected CharityRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(CharityRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function deleteCharity($id){
        return $this->repo->delete($id);
    }
}
