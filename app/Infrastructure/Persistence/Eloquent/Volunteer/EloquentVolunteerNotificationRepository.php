<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\participation;
use App\Domain\Volunteer\Models\Volunteer_notification;

class EloquentVolunteerNotificationRepository implements BaseRepositoryInterface
{

    public function all() { return Volunteer_notification::orderBy('created_at', 'desc')->get(); }

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
