<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Laravel\Sanctum\HasApiTokens;

use App\Models\UserCategory;
use App\Models\User;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userCategories()
    {
        return $this->hasMany(UserCategory::class);
    }

    public function getUserCategory($id)
    {
        return $this->userCategories()->where('category_id', $id)->first();
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'user_following_id');
    }
    
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_following_id', 'user_id');
    }

    public function isFollowing($id)
    {
        $following = $this->followings()->where('user_following_id', $id)->first();
        
        return !is_null($following);
    }

    public function getFollower($id)
    {
        return $this->followers()->where('user_id', $id)->first();
    }
}
