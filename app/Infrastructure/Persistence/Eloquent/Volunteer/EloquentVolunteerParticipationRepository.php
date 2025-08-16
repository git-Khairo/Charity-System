<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\participation;
use App\Domain\Volunteer\Models\Volunteer;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\DB;

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


    public function allParticipation($id)
    {
        $participations = Participation::query()
            ->select('participations.*')
            ->selectSub(function ($query) {
                $query->from('participations as p2')
                    ->selectRaw('COUNT(*)')
                    ->where('p2.status', 'accepted')
                    ->whereColumn('p2.volunteer_id', 'participations.volunteer_id');
            }, 'accepted_count')
            ->where('participations.status', 'pending')
            ->whereHas('event', function ($query) use ($id) {
                $query->where('charity_id', $id);
            })
            ->orderByDesc('accepted_count')
            ->get();


        return $participations;
    }


}
