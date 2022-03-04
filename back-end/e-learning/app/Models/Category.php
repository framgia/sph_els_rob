<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Word;

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

	public function word()
	{
		return $this->hasMany(Word::class);
	}
}
