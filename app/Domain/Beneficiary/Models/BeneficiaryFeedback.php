<?php

namespace App\Domain\Beneficiary\Models;

use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Eloquent\Model;

class BeneficiaryFeedback extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'beneficiary_id',
        'description',
        'charity_id'
    ];

     public function beneficiary(){
        return $this->belongsTo(Beneficiary::class);
    }

    public function charity(){
        return $this->belongsTo(Charity::class);
    }
}
