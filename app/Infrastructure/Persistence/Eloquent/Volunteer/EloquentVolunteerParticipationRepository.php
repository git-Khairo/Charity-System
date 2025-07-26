<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\participation;
use App\Domain\Volunteer\Models\Volunteer;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;

class EloquentVolunteerParticipationRepository implements VolunteerParticipationRepositoryInterface
{

    public function all() { return participation::all(); }

    public function find($id) { return participation::findOrFail($id); }

    public function create(array $data) { return participation::create($data); }

    public function update($id, array $data) {
        $volunteer = participation::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = participation::findOrFail($id);
        return $volunteer->delete();
    }


}
