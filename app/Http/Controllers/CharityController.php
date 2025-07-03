<?php

namespace App\Http\Controllers;

use App\Application\Charity\UseCases\CreateCharity;
use App\Application\Charity\UseCases\DeleteCharity;
use App\Application\Charity\UseCases\GetByCategory;
use App\Application\Charity\UseCases\GetCharities;
use App\Application\Charity\UseCases\GetCharity;
use App\Application\Charity\UseCases\UpdateCharity;
use App\Interfaces\Http\Requests\Charity\CreateCharityRequest;
use App\Interfaces\Http\Requests\Charity\UpdateCharityRequest;
use App\Interfaces\Http\Resources\Charity\CharityResource;

class CharityController extends Controller
{
    public function getAllCharities(GetCharities $usecase){
        $charities = $usecase->getCharites();
        return response()->json(['message' => 'allCharities', 'charities' => CharityResource::collection($charities)], 201);
    }

    public function getCharity($id, GetCharity $usecase){
        $charity = $usecase->getCharity($id);
        return response()->json(['message' => 'charity', 'charity' => new CharityResource($charity)], 201);
    }

    public function getCharityByCategory($id, GetByCategory $usecase){
        $charities = $usecase->getByCategory($id);
        return response()->json(['message' => 'charity', 'charity' => CharityResource::collection($charities)], 201);
    }


}
