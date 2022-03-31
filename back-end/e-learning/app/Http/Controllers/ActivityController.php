<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Carbon\Carbon;

use App\Models\Activity;
use App\Models\User;
use App\Models\Follower;
use App\Models\UserCategory;
use App\Models\Category;
use App\Models\UserAnswer;
use App\Models\Word;

class ActivityController extends Controller
{
    public function list($id)
    {
        $current_user = User::find($id);
        $collection = new Collection();

        $activities = $current_user->activities()->get();
        foreach ($activities as $activity)
        {
            $now = Carbon::now();
            $date = $activity->updated_at->longAbsoluteDiffForHumans($now);
            
            if (Str::contains($activity->activitable_type, 'Follower'))
            {
                $following = Follower::find($activity->activitable_id);
                
                $user = User::find($following->user_following_id);

                if ($following)
                {
                    $collection->push([
                        'id' => $activity->id,
                        'type' => 'Follower',
                        'user_id' => $activity->user_id,
                        'user_name' => $current_user->first_name,
                        'last_name' => $current_user->last_name,
                        'avatar' => $current_user->avatar,
                        'user_following_id' => $user->id,
                        'following_name' => $user->first_name,
                        'category_id' => null,
                        'category_title' => null,
                        'items' => null,
                        'score' => null,
                        'created_at' => $activity->created_at,
                        'updated_at' => $date
                    ]);
                }
                else
                {
                    $activity->forceDelete();
                }
            }
            else if (Str::contains($activity->activitable_type, 'UserCategory'))
            {
                $user_category = UserCategory::find($activity->activitable_id);

                $category = Category::find($user_category->category_id);

                $items = $category->words()->count();

                $score = $user_category->countCorrectAnswers();

                if ($user_category)
                {
                    $collection->push([
                        'id' => $activity->id,
                        'type' => 'UserCategory',
                        'user_id' => $activity->user_id,
                        'user_name' => $current_user->first_name,
                        'last_name' => $current_user->last_name,
                        'avatar' => $current_user->avatar,
                        'user_following_id' => null,
                        'following_name' => null,
                        'category_id' => $category->id,
                        'category_title' => $category->title,
                        'items' => $items,
                        'score' => $score,
                        'created_at' => $activity->created_at,
                        'updated_at' => $date
                    ]);
                }
                else
                {
                    $activity->forceDelete();
                }
            }
        }

        return response($collection->sortByDesc('id'));
    }

    public function allList()
    {
        $collection = new Collection();
        
        $user_ids = new Collection();
        
        $users = auth()->user()->followings()->get();
        
        $user_ids->push(auth()->user()->id);

        foreach ($users as $user)
        {
            $user_ids->push($user->id);
        }

        foreach ($user_ids as $user_id)
        {
            $current_user = User::find($user_id);

            $activities = $current_user->activities()->get();
            foreach ($activities as $activity)
            {
                $now = Carbon::now();
                $date = $activity->updated_at->longAbsoluteDiffForHumans($now);
                
                if (Str::contains($activity->activitable_type, 'Follower'))
                {
                    $following = Follower::find($activity->activitable_id);
                    
                    $user = User::find($following->user_following_id);

                    if ($following)
                    {
                        $collection->push([
                            'id' => $activity->id,
                            'type' => 'Follower',
                            'user_id' => $activity->user_id,
                            'user_name' => $current_user->first_name,
                            'last_name' => $current_user->last_name,
                            'avatar' => $current_user->avatar,
                            'user_following_id' => $user->id,
                            'following_name' => $user->first_name,
                            'category_id' => null,
                            'category_title' => null,
                            'items' => null,
                            'score' => null,
                            'created_at' => $activity->created_at,
                            'updated_at' => $date
                        ]);
                    }
                    else
                    {
                        $activity->forceDelete();
                    }
                }
                else if (Str::contains($activity->activitable_type, 'UserCategory'))
                {
                    $user_category = UserCategory::find($activity->activitable_id);

                    $category = Category::find($user_category->category_id);

                    $items = $category->words()->count();

                    $score = $user_category->countCorrectAnswers();

                    if ($user_category)
                    {
                        $collection->push([
                            'id' => $activity->id,
                            'type' => 'UserCategory',
                            'user_id' => $activity->user_id,
                            'user_name' => $current_user->first_name,
                            'last_name' => $current_user->last_name,
                            'avatar' => $current_user->avatar,
                            'user_following_id' => null,
                            'following_name' => null,
                            'category_id' => $category->id,
                            'category_title' => $category->title,
                            'items' => $items,
                            'score' => $score,
                            'created_at' => $activity->created_at,
                            'updated_at' => $date
                        ]);
                    }
                    else
                    {
                        $activity->forceDelete();
                    }
                }
            }
        }
        return response($collection->sortByDesc('id'));
    }
}
