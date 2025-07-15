<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;

class UpdateInfo
{
    protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function updateInfo($id, $data){
        return $this->repo->update($id, $data);
    }
}
