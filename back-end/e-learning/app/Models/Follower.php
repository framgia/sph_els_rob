<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Activity;

class Follower extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
		'user_id',
      	'user_following_id'
	];

    protected $dates = [
		'deleted_at',
	];

	public function activities()
	{
		return $this->morphMany(Activity::class, 'activitable');
	}
}
