<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
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

    Route::get('change-role/{id}', [UserController::class, 'changeRole']);
  });

  Route::get('list-category', [CategoryController::class, 'list']);  
});

Route::post('login', [UserController::class, 'login']);
Route::post('signup', [UserController::class, 'signup']);
