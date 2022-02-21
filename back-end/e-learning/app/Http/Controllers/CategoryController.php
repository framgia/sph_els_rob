<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
	public function create(Request $request){
		$validator = Validator::make($request->all(), [
			'title' => 'required',
			'description' => 'required'
		]);
		
		if($validator->fails())
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
		if($category->save()) return response($category, 201);
		else return response([
			'message' => 'Error in adding the lesson.'
		], 500); 
	}
}
