<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Word;
use App\Models\UserCategory;

class Category extends Model
{
	use HasFactory, SoftDeletes;

	protected $fillable = [
		'title',
		'description',
	];
	
	protected $dates = [
		'deleted_at',
	];

	public function words()
	{
		return $this->hasMany(Word::class);
	}

	public function userCategories()
	{
		return $this->hasMany(UserCategory::class);
	}

	public function getUserCategory($id)
	{
		return $this->userCategories()->where('user_id', $id)->first();
	}
}
