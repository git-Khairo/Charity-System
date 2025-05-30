<?php

namespace App\Domain\volunteer\Models;



use App\Domain\Events\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Volunteer extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\VolunteerFactory> */
    use HasFactory,HasApiTokens,Notifiable;
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

    public function event(){
        return $this->belongsToMany(Event::class, 'participations')
            ->withPivot( 'status')
            ->withTimestamps();
    }

    protected static function newFactory()
    {
        return \Database\Factories\VolunteerFactory::new();
    }
}
