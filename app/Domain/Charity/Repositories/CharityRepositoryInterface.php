<?php

namespace App\Domain\Charity\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface CharityRepositoryInterface extends BaseRepositoryInterface
{
    public function all();
    public function find($id);
    public function byCategory($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id); 
}
