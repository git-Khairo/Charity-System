<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use Spatie\Permission\Models\Role;

class Register
{
    protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

     public function register($data){
        $beneficiary = $this->repo->register($data->toArray());

         $beneficiaryRole=Role::firstOrCreate(['name' => 'Beneficiary','guard_name' => 'api']);

         $beneficiary->assignRole($beneficiaryRole);

         return $beneficiary;

     }
}
