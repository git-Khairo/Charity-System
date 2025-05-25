<?php

namespace App\Infrastructure\Persistence\Eloquent\Events;

use App\Domain\Events\Models\Event;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\volunteer\Models\Volunteer;

class EloquentEventRepository implements BaseRepositoryInterface
{
    public function all() { return Event::all(); }

    public function find($id) { return Event::findOrFail($id); }

    public function create(array $data) { return Event::create($data); }

    public function update($id, array $data) {
        $volunteer = Event::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Event::findOrFail($id);
        return $volunteer->delete();
    }


}
