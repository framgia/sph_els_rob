<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class UserController extends Controller
{
  function login(Request $request)
  {
    $credentials = $request->only("email", "password");
    if (Auth::attempt($credentials)) {
      $token = auth()->user()->createToken("api_token")->plainTextToken;
      $response = [
        'user' => Auth::user(),
        'token' => $token
      ];
      return response($response, 201);
    }
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
    $user->save();

    $token = $user->createToken($user->email.'my-app-token')->plainTextToken;
    
    $response = [
      'user' => $user,
      'token' => $token
    ];

    if ($user)
      return response($response, 201);
    else
      return response([
      'message' => 'Unsuccessfully registered user.' 
    ], 500);
  }

  public function user()
  {
    return response(User::all(), 201);
  }

  public function changeRole($id)
  {
    $user = User::find($id);
    if ($user->role == "admin")
      $user->role = "member";
    else
      $user->role = "admin";
    
    if ($user->save())
      return response($user, 201);
  }
}
