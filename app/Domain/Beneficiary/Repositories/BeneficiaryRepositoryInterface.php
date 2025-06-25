<?php

namespace App\Domain\Beneficiary\Repositories;

interface BeneficiaryRepositoryInterface
{
    public function all();
    public function find($id);
    public function register(array $data);
    public function login(array $data);
    public function logout($request);
    public function update($id, array $data);
    public function apply($id, array $data);
    public function createFeedback($id, array $data);
}
