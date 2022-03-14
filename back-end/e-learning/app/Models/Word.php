<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Category;
use App\Models\Choice;
use App\Models\UserAnswer;

class Word extends Model
{
	use HasFactory, SoftDeletes;

  	protected $fillable = [
		'value',
	];

    protected $dates = [
		'deleted_at',
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function choices()
	{
		return $this->hasMany(Choice::class);
	}

	function getCorrectChoice()
	{
    	return $this->choices()->where('is_correct_answer', 1)->first();
	}

	function userAnswer()
	{
		return $this->hasMany(UserAnswer::class);
	}

	function getUserAnswer($id)
	{
		return $this->userAnswer()->where('user_category_id', $id)->first();
	}
}
