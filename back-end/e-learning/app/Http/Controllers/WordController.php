<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Word;
use App\Models\Category;
use App\Models\Choice;

class WordController extends Controller
{
	public function create(Request $request, $id)
	{
		$collection = new Collection();
		$word = new Word();
		$word->value = $request->word;

		$category = Category::find($id);
		$category->word()->save($word);

		foreach ($request->choices as $ch)
		{
			if (!is_null($ch['value']))
			{
				$choice = new Choice();
				$choice->fill([
					'value' => $ch['value'],
					'is_correct_answer' => $ch['is_correct_answer']
				]);
				$word->choice()->save($choice);
				
				$collection->push($choice);
			}
		}

		$response = [
			'word' => $word,
			'choices' => $collection
		];

		return response($response, 201);
	}
}
