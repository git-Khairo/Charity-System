<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Events\Models\Event;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\Volunteer_feedback;

class EloquentVolunteerFeedbackRepository implements BaseRepositoryInterface
{
    public function all() { return Volunteer_feedback::all(); }

    public function find($id) { return Volunteer_feedback::findOrFail($id); }

    public function create(array $data) { return Volunteer_feedback::create($data); }

    public function update($id, array $data) {
        $volunteer = Volunteer_feedback::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Volunteer_feedback::findOrFail($id);
        return $volunteer->delete();
    }



}
