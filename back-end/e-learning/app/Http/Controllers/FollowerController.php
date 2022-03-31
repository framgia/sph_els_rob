<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Activity;
use App\Models\Follower;

class FollowerController extends Controller
{
    public function follow($id)
    {
        $user = User::find($id);

        auth()->user()->followings()->attach($user->id);
        
        $follower = $user->getFollower(auth()->user()->id);

        $follow = Follower::find($follower->pivot->id);

        $activity = new Activity(['user_id' => auth()->user()->id]);
        $follow->activities()->save($activity);
        
        return response($follower, 201);
    }

    public function unfollow($id)
    {
        $user = User::find($id);
        $follower = $user->getFollower(auth()->user()->id);

        if (auth()->user()->followings()->detach($id))
        {
            return response($follower, 201);
        }
    }

    public function following($id)
    {
        return response(User::find($id)->followings()->get(), 201);
    }
    
    public function follower($id)
    {
        return response(User::find($id)->followers()->get(), 201);
    }
}
