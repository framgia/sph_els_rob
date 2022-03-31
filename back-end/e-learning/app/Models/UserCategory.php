<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\User;
use App\Models\Category;
use App\Models\UserAnswer;
use App\Models\Activity;

class UserCategory extends Model
{
    use HasFactory,  SoftDeletes;

    protected $fillable = [
		'category_id',
		'user_id',
	];
	
	protected $dates = [
		'deleted_at',
	];

	public function user()
    {
        return $this->belongsTo(User::class);
    }

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function userAnswers()
	{
		return $this->hasMany(UserAnswer::class);
	}

	public function countCorrectAnswers()
	{
		return $this->userAnswers()->where('is_correct', 1)->count();
	}

	public function activities()
	{
		return $this->morphMany(Activity::class, 'activitable');
	}

	public function userCorrectAnswers()
	{
		return $this->userAnswers()->where('is_correct', 1)->get();
	}
}
