<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Word;
use App\Models\UserAnswer;

class Choice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
		'value',
        'is_correct_answer'
	];

    protected $dates = [
		'deleted_at',
	];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }

    public function userAnswers()
    {
        return $this->hasMany(UserAnswer::class);
    }
}
