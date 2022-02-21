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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
  Route::get('me', [UserController::class, 'me']);
  Route::post('logout', [UserController::class, 'logout']);

  Route::group(['middleware' => 'role'], function(){
    Route::post('create-category', [CategoryController::class, 'create']);
  });
});

Route::post('login', [UserController::class, 'login']);
Route::post('signup', [UserController::class, 'signup']);
