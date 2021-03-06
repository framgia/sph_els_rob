<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WordController;
use App\Http\Controllers\UserCategoryController;
use App\Http\Controllers\UserAnswerController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\ActivityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function(){
  Route::get('me', [UserController::class, 'me']);
  Route::post('logout', [UserController::class, 'logout']);
  Route::get('users', [UserController::class, 'user']);
  Route::get('profile/{id}', [UserController::class, 'profile']);
  Route::post('update-profile', [UserController::class, 'update']);

  Route::group(['middleware' => 'role'], function(){
    Route::post('create-category', [CategoryController::class, 'create']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('remove-category/{id}', [CategoryController::class, 'remove']);

    Route::post('create-word/{id}', [WordController::class, 'create']);
    Route::put('update-word/{id}', [WordController::class, 'update']);
    Route::delete('remove-word/{id}', [WordController::class, 'remove']);

    Route::get('change-role/{id}', [UserController::class, 'changeRole']);
  });

  Route::get('list-category', [CategoryController::class, 'list']);

  Route::get('list-word/{id}', [WordController::class, 'list']);

  Route::post('add-quiz/{id}', [UserCategoryController::class, 'create']);
  Route::get('user-category', [UserCategoryController::class, 'list']);
  Route::post('submit-lesson/{id}', [UserCategoryController::class, 'submit']);

  Route::post('save-answer/{category_id}/{word_id}/{choice_id}', [UserAnswerController::class, 'saveAnswer']);
  Route::get('result/{id}', [UserAnswerController::class, 'result']);
  Route::get('learned-words/{id}', [UserAnswerController::class, 'learnedWord']);

  Route::post('follow/{id}', [FollowerController::class, 'follow']);
  Route::post('unfollow/{id}', [FollowerController::class, 'unfollow']);
  Route::get('followings/{id}', [FollowerController::class, 'following']);
  Route::get('followers/{id}', [FollowerController::class, 'follower']);

  Route::get('activities/{id}', [ActivityController::class, 'list']);
  Route::get('activities', [ActivityController::class, 'allList']);
});

Route::post('login', [UserController::class, 'login']);
Route::post('signup', [UserController::class, 'signup']);
