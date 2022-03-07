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
		$category->words()->save($word);

		foreach ($request->choices as $ch)
		{
			if (!is_null($ch['value']))
			{
				$choice = new Choice();
				$choice->fill([
					'value' => $ch['value'],
					'is_correct_answer' => $ch['is_correct_answer']
				]);
				$word->choices()->save($choice);
				
				$collection->push($choice);
			}
		}

		$response = [
			'word' => $word,
			'choices' => $collection
		];

		return response($response, 201);
	}

	public function list($id)
	{
		$collection = new Collection();

		$words = Word::where('category_id', $id)->get();
		foreach ($words as $word)
		{
			$choices = Choice::where('word_id', $word['id'])->get();
			$collection->push([
				'word' => $word,
				'choices' => $choices
			]);
		}
		
		return response($collection, 201);
	}

	public function update(Request $request, $id)
	{
		$collection = new Collection();

		$word = Word::find($id);
		$word->value = $request->word;
		$word->save();

		$choices = $word->choices()->get();
		for ($x=0; $x < count($request->choices); $x++)
		{
			if (!is_null($request->choices[$x]['value']))
			{
				if ($x < count($choices))
				{
					$choices[$x]['value'] = $request->choices[$x]['value'];
					$choices[$x]['is_correct_answer'] = $request->choices[$x]['is_correct_answer'];
					$choices[$x]->save();

					$collection->push($choices[$x]);
				}
				else
				{
					$choice = new Choice();
					$choice->fill([
						'value' => $request->choices[$x]['value'],
						'is_correct_answer' => $request->choices[$x]['is_correct_answer']
					]);
					$word->choice()->save($choice);

					$collection->push($choice);
				}
			}
			else {
				if (count($choices) > $collection->count())
					$choices[$x]->forceDelete();
			}
		}
		
		$response = [
			'word' => $word,
			'choices' => $collection
		];

		return response($response, 201);
	}
}
