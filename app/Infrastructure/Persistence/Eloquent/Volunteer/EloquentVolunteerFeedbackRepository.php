<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Events\Models\Event;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\Volunteer_feddback;

class EloquentVolunteerFeedbackRepository implements BaseRepositoryInterface
{
    public function all() { return Volunteer_feddback::all(); }

    public function find($id) { return Volunteer_feddback::findOrFail($id); }

    public function create(array $data) { return Volunteer_feddback::create($data); }

    public function update($id, array $data) {
        $volunteer = Volunteer_feddback::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Volunteer_feddback::findOrFail($id);
        return $volunteer->delete();
    }



}
