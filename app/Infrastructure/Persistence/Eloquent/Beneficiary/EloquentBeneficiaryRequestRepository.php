<?php

namespace App\Infrastructure\Persistence\Eloquent\Beneficiary;

use App\Domain\Beneficiary\Models\Request;
use App\Domain\Beneficiary\Repositories\BeneficiaryRequestRepositoryInterface;
use App\Domain\Volunteer\Models\Volunteer;

class EloquentBeneficiaryRequestRepository implements BeneficiaryRequestRepositoryInterface
{
    public function all() { return Request::all(); }

    public function find($id) { return Request::findOrFail($id); }

    public function create(array $data) { return Request::create($data); }

    public function update($id, array $data) {
        $volunteer = Request::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Request::findOrFail($id);
        return $volunteer->delete();
    }

    public function getRequests($id)
    {

        $charityId=$id;

        $requests = Request::with('beneficiary')
            ->where('charity_id', $charityId)
            ->withCount([
                'beneficiary as accepted_count' => function ($q) use ($charityId) {
                    $q->join('requests', 'beneficiaries.id', '=', 'requests.beneficiary_id')
                        ->where('requests.charity_id', $charityId)
                        ->where('requests.status', 'Accepted');
                }
            ])
            ->where('requests.status', 'pending')
            ->orderByDesc('accepted_count')
            ->get();

        return $requests;

    }

}
