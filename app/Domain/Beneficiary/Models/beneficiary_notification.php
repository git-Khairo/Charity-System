<?php

namespace App\Domain\Beneficiary\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class beneficiary_notification extends Model
{
    /** @use HasFactory<\Database\Factories\BeneficiaryNotificationFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'beneficiary_id',
        'message'
    ];

    public function beneficiary(){
        return $this->belongsTo(Beneficiary::class);
    }
    protected static function newFactory()
    {
        return \Database\Factories\BeneficiaryNotificationFactory::new();
    }

}
