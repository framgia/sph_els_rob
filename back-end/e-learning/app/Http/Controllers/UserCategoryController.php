<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Models\UserCategory;
use App\Models\Category;
use App\Models\UserAnswer;

class UserCategoryController extends Controller
{
    public function create($id)
    {
        $user_category = UserCategory::where([
            ['user_id', auth()->user()->id], ['category_id', $id]
        ])->first();

        if ($user_category)
            return response([ 'message' => 'Already enrolled to this lesson!' ], 201); 
        else
        {
            $user_category = new UserCategory();
            $user_category->fill([
                'user_id' => auth()->user()->id,
                'category_id' => $id
            ]);
            if ($user_category->save())
                return response([ 'message' => 'Success!' ], 201);
            else
                return response([ 'message' => 'Error in adding lesson!' ], 404); 
        }
    }

    public function list()
    {
        $collection = new Collection();

        $categories = Category::all();
        foreach ($categories as $category)
        {
            $words = $category->words()->count();

            $user_category = UserCategory::where([
                ['user_id', auth()->user()->id], ['category_id', $category->id]
            ])->first();
            
            if ($user_category)
            {
                $learned = UserAnswer::where([
                    ['user_category_id', $user_category->id], ['is_correct', 1]
                ])->count();
                
                $collection->push([
                    'id' => $category->id,
                    'title' => $category->title,
                    'description' => $category->description,
                    'words_learned' => $learned,
                    'words_count' => $words,
                    'status' => 1,
                ]);
            }
            else
            {
                $collection->push([
                    'id' => $category->id,
                    'title' => $category->title,
                    'description' => $category->description,
                    'words_learned' => null,
                    'words_count' => $words,
                    'status' => 0,
                ]);
            }
        }
        return response($collection, 201);
    }
}
