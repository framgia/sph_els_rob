<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WordController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
  Route::get('me', [UserController::class, 'me']);
  Route::post('logout', [UserController::class, 'logout']);

  Route::group(['middleware' => 'role'], function(){
    Route::post('create-category', [CategoryController::class, 'create']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('remove-category/{id}', [CategoryController::class, 'remove']);

    Route::post('create-word/{id}', [WordController::class, 'create']);
  });

  Route::get('list-category', [CategoryController::class, 'list']);

  Route::get('list-word/{id}', [WordController::class, 'list']);
});

Route::post('login', [UserController::class, 'login']);
Route::post('signup', [UserController::class, 'signup']);
