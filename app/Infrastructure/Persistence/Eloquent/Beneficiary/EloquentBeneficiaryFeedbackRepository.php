<?php

namespace App\Infrastructure\Persistence\Eloquent\Beneficiary;

use App\Domain\Beneficiary\Models\BeneficiaryFeedback;
use App\Domain\Repositories\BaseRepositoryInterface;

class EloquentBeneficiaryFeedbackRepository implements BaseRepositoryInterface
{
    public function all() { return BeneficiaryFeedback::all(); }

    public function find($id) { return BeneficiaryFeedback::findOrFail($id); }

    public function create(array $data) { return BeneficiaryFeedback::create($data); }

    public function update($id, array $data) {
        $volunteer = BeneficiaryFeedback::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = BeneficiaryFeedback::findOrFail($id);
        return $volunteer->delete();
    }
}
