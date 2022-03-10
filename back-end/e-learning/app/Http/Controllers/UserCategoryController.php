<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Models\UserCategory;
use App\Models\Category;

class UserCategoryController extends Controller
{
    public function create($id)
    {
        $user_category = UserCategory::where([
            ['user_id', auth()->user()->id], ['category_id', $id]
        ])->first();

        if($user_category)
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
}
