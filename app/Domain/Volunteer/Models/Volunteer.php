<?php

namespace App\Domain\volunteer\Models;



use App\Domain\Beneficiary\Models\beneficiary_notification;
use App\Domain\Events\Models\Event;
use Database\Factories\VolunteerNotificationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Volunteer extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\VolunteerFactory> */
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
        'phoneNumber',
        'study',
        'address',
        'qr_code_path',
        'skills',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
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

    public function feedback(){
        return $this->hasMany(Volunteer_feddback::class);
    }

    public function participation(){
        return $this->hasMany(participation::class);
    }

    public function notification(){
        return $this->hasMany(VolunteerNotificationFactory::class);
    }


    protected static function newFactory()
    {
        return \Database\Factories\VolunteerFactory::new();
    }
}
