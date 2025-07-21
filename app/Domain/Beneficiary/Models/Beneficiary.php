<?php

namespace App\Domain\Beneficiary\Models;

use App\Domain\Beneficiary\Models\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Beneficiary extends Model
{
    /** @use HasFactory<\Database\Factories\BeneficiaryFactory> */
    use HasFactory,HasApiTokens,Notifiable,HasRoles;

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phonenumber',
        'address',
        'details',
        'needs',
        'familyMember'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $guard_name = 'api';
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function request(){
        return $this->hasMany(Request::class);
    }

    public function feedback(){
        return $this->hasMany(BeneficiaryFeedback::class);
    }

    public function notification(){
        return $this->hasMany(beneficiary_notification::class);
    }


    protected static function newFactory()
    {
        return \Database\Factories\BeneficiaryFactory::new();
    }
}
