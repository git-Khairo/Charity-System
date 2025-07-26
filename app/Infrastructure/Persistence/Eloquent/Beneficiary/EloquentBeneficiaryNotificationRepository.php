<?php

namespace App\Infrastructure\Persistence\Eloquent\Beneficiary;

use App\Domain\Beneficiary\Models\beneficiary_notification;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\Volunteer;

class EloquentBeneficiaryNotificationRepository implements BaseRepositoryInterface
{
    public function all() { return beneficiary_notification::orderBy('created_at', 'desc')->get(); }

    public function find($id) { return beneficiary_notification::findOrFail($id); }

    public function create(array $data) { return beneficiary_notification::create($data); }

    public function update($id, array $data) {
        $volunteer = beneficiary_notification::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Volunteer::findOrFail($id);
        return $volunteer->delete();
    }


}
