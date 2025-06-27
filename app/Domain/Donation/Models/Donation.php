<?php

namespace App\Domain\Donation\Models;

use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    /** @use HasFactory<\Database\Factories\DonationFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'charity_id',
        'name',
        'email',
        'phonenumber',
        'address',
        'amount',
        'payment_intent_id'
    ];

     public function charity(){
        return $this->belongsTo(Charity::class);
    }

    protected static function newFactory()
    {
        return \Database\Factories\DonationFactory::new();
    }
}
