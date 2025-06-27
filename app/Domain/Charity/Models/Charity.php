<?php

namespace App\Domain\Charity\Models;

use App\Domain\Admins\Models\Admin;
use App\Domain\Beneficiary\Models\BeneficiaryFeedback;
use App\Domain\Beneficiary\Models\Request;
use App\Domain\Donation\Models\Donation;
use App\Domain\Events\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Charity extends Model
{
     /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'admin_id',
        'name',
        'address',
        'description',
        'images',
        'phonenumber',
        'email',
        'category_id'
    ];

    public function events(){
        return $this->hasMany(Event::class);
    }

    public function donation(){
        return $this->hasMany(Donation::class);
    }

    public function admin(){
        return $this->belongsTo(Admin::class);
    }

    public function request(){
        return $this->belongsTo(Request::class);
    }

    public function beneficiary_feedback(){
        return $this->belongsTo(BeneficiaryFeedback::class);
    }
    protected static function newFactory()
    {
        return \Database\Factories\CharityFactory::new();
    }
}
