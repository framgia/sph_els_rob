<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Models\UserAnswer;
use App\Models\UserCategory;
use App\Models\Choice;
use App\Models\Word;
use App\Models\Category;

class UserAnswerController extends Controller
{
    public function saveAnswer($category_id, $word_id, $choice_id)
    {

        $user_category = auth()->user()->getUserCategory($category_id);

        if (!is_null($user_category))
        {
            $word = Word::find($word_id);

            $correct_answer = $word->getCorrectChoice();

            if ($correct_answer->id == $choice_id) $is_correct = true;
            else $is_correct = false;

            $user_answer = $word->getUserAnswer($user_category->id);

            if (!is_null($user_answer))
            {
                $user_answer->choice_id = $choice_id;
                $user_answer->is_correct = $is_correct;
                $user_answer->save();
                return response(['message' => 'success'], 201);
            }
            else
            {
                $user_answer = new UserAnswer();
                $user_answer->fill([
                    'user_category_id' => $user_category->id,
                    'word_id' => $word_id,
                    'choice_id' => $choice_id,
                    'is_correct' => $is_correct
                ]);
                if ($user_answer->save())
                    return response(['message' => 'success'], 201);
            }
        }
    }

    public function result($id)
    {
        $collection = new Collection();

        $category = Category::find($id);

        $user_category = auth()->user()->getUserCategory($id);

        $words = $category->words()->get();
        
        if (!is_null($user_category))
        {
            foreach ($words as $word)
            {
                $user_answer = $word->getUserAnswer($user_category->id);
                
                if ($user_answer)
                {
                    $choice = Choice::find($user_answer->choice_id);
                    $collection->push([
                        'id' => $word->id,
                        'user_category_id' => $user_answer->user_category_id,
                        'word' => $word->value,
                        'choice_id' => $user_answer->choice_id,
                        'choice' => $choice->value,
                        'is_correct' => $user_answer->is_correct,
                    ]);
                }
                else
                {
                    $collection->push([
                        'id' => $word->id,
                        'user_category_id' => null,
                        'word' => $word->value,
                        'choice_id' => null,
                        'choice' => null,
                        'is_correct' => null,
                    ]);
                }
            }
        }

        return response($collection, 201);
    }
}
