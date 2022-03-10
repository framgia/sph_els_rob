<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\UserCategory;
use App\Models\Choice;

class UserAnswer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
		'user_category_id',
        'word_id',
		'choice_id',
        'is_correct',
	];
	
	protected $dates = [
		'deleted_at',
	];

    public function userCategory()
    {
        return $this->belongsTo(UserCategory::class);
    }

    public function choice()
    {
        return $this->belongsTo(Choice::class);
    }
}
