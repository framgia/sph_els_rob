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
    return response(['message' => 'Unauthorized!'], 401);
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

    $credentials = $request->only("email", "password");
    if (Auth::attempt($credentials)) {
      $token = auth()->user()->createToken("api_token")->plainTextToken;
      $response = [
        'user' => Auth::user(),
        'token' => $token
      ];
      return response($response, 201);
    }
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

  public function profile($id)
  {
    $user = User::find($id);
    
    $user_categories = $user->userCategories()->get();

    $count = 0;
    foreach ($user_categories as $user_category)
    {
      $correct_counts = $user_category->countCorrectAnswers();
      $count += $correct_counts;
    }
    return response(['profile' => $user, 'words_learned' => $count, 'is_following' => auth()->user()->isFollowing($id)], 201);
  }
}
