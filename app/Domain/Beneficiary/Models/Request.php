<?php

namespace App\Domain\Beneficiary\Models;

use App\Domain\Beneficiary\Models\Beneficiary;
use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phonenumber',
        'address',
        'charity_id',
        'beneficiary_id',
        'details',
        'maritalStatus',
        'workStatus',
        'needs',
        'numOfMembers',
        'status'
    ];

    public function beneficiary(){
        return $this->belongsTo(Beneficiary::class);
    }

    public function charity(){
        return $this->belongsTo(Charity::class);
    }
}
