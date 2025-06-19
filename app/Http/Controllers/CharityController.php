<?php

namespace App\Http\Controllers;

use App\Application\Charity\UseCases\CreateCharity;
use App\Application\Charity\UseCases\DeleteCharity;
use App\Application\Charity\UseCases\GetCharities;
use App\Application\Charity\UseCases\GetCharity;
use App\Application\Charity\UseCases\UpdateCharity;
use App\Interfaces\Http\Requests\Charity\CreateCharityRequest;
use App\Interfaces\Http\Requests\Charity\UpdateCharityRequest;

class CharityController extends Controller
{
    public function getAllCharities(GetCharities $usecase){
        $charities = $usecase->getCharites();
        return response()->json(['message' => 'allCharities', 'charities' => $charities], 201);
    }

    public function getCharity($id, GetCharity $usecase){
        $charity = $usecase->getCharity($id);
        return response()->json(['message' => 'charity', 'charity' => $charity], 201);
    }

    public function updateCharity($id, UpdateCharityRequest $request, UpdateCharity $usecase){
        $charity = $usecase->updateCharity($id, $request);
        return response()->json(['message' => 'updated charity', 'charity' => $charity], 201);
    }

    public function createCharity(CreateCharityRequest $request, CreateCharity $usecase){
        $charity = $usecase->createCharity($request);
        return response()->json(['message' => 'created charity', 'charity' => $charity], 201);
    }

    public function deleteCharity($id, DeleteCharity $usecase){
        $charity = $usecase->deleteCharity($id);
        return response()->json(['message' => 'deleted charity', 'charity' => $charity], 201);
    }
}
