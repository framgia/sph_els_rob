<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'activitable_type',
        'activitable_id',
	];

    protected $dates = [
		'deleted_at',
	];

    public function activitable()
    {
        return $this->morphTo();
    }
}
