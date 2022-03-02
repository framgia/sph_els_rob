<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
	public function create(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'title' => 'required',
			'description' => 'required'
		]);
		
		if ($validator->fails())
		{
			return response([
				'message'=> 'Data is required.'
			], 400);
		}
		
		$category = new Category();
		$category->fill([
			'title' => $request->title,
			'description' => $request->description
		]);
		
		if ($category->save()) return response($category, 201);
		else return response([
			'message' => 'Error in adding the lesson.'
		], 500); 
	}

	public function list()
	{
		return response(Category::all(), 201);
	}

	public function update(Request $request, $id)
	{
		if (is_null($request->title) || is_null($request->description))
		{
			return response([
				'message'=> 'Data is required.'
			], 400);
		}

		$category = Category::find($id);
		if ($category){
			$category->fill([
				'title' => $request->title,
				'description' => $request->description
			]);
			$category->save();
			return response($category, 201);
		}
		else return response([
			'message' => 'ID not found!'
		], 404); 
	}
}
