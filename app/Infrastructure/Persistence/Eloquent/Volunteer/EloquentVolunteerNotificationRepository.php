<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\volunteer\Models\participation;
use App\Domain\volunteer\Models\Volunteer_notification;

class EloquentVolunteerNotificationRepository implements BaseRepositoryInterface
{

    public function all() { return Volunteer_notification::all(); }

    public function find($id) { return Volunteer_notification::findOrFail($id); }

    public function create(array $data) { return Volunteer_notification::create($data); }

    public function update($id, array $data) {
        $volunteer = Volunteer_notification::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = participation::findOrFail($id);
        return $volunteer->delete();
    }



}
