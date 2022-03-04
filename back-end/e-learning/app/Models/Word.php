<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Category;
use App\Models\Choice;

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

	public function choice()
	{
		return $this->hasMany(Choice::class);
	}
}
