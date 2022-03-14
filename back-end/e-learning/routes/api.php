<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WordController;
use App\Http\Controllers\UserCategoryController;
use App\Http\Controllers\UserAnswerController;

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

  Route::post('save-answer/{category_id}/{word_id}/{choice_id}', [UserAnswerController::class, 'saveAnswer']);
});

Route::post('login', [UserController::class, 'login']);
Route::post('signup', [UserController::class, 'signup']);
