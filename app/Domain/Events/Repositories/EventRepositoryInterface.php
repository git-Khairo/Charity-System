<?php

namespace App\Domain\Events\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface EventRepositoryInterface extends BaseRepositoryInterface
{
    public function all();
    public function find($id);
    public function byCharity($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
