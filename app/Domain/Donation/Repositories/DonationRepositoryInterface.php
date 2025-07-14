<?php

namespace App\Domain\Donation\Repositories;

interface DonationRepositoryInterface
{
    public function all();
    public function find($id);
    public function byCharity($id);
    public function createCard($id, array $data);
    public function createImage($id, array $data);
}
