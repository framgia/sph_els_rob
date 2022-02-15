<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  function login(Request $request)
  {
    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
      return response([
        'message' => ['These credentials do not match our records.']
      ], 404);
    }

    $token = $user->createToken($user->email.'my-app-token')->plainTextToken;
    
    $response = [
      'user' => $user,
      'token' => $token
    ];
        
  	return response($response, 201);
  }

  public function me()
  {
    return response(auth()->user(), 201);
  }

  public function logout()
  {
    auth()->user()->tokens()->delete();
    return response([
      'message' => 'Logout'
    ], 201);
  }

  public function signup(Request $request)
  {
    $user = new User();
    $user->fill([
      'first_name' => $request->first_name,
      'last_name' => $request->last_name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'role' => 'member'
    ]);
    if($user->save()) return response([
      'message' => 'Successfully registered user.'
    ], 201);
    else return response([
      'message' => 'Unsuccessfully registered user.' 
    ], 500);
  }
}
