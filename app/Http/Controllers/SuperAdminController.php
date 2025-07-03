<?php

namespace App\Http\Controllers;

use App\Application\Charity\UseCases\CreateCharity;
use App\Application\Charity\UseCases\DeleteCharity;
use App\Application\Charity\UseCases\UpdateCharity;
use App\Application\SuperAdmin\useCases\CreateAdmin;
use App\Interfaces\Http\Requests\Admins\RegisterAdminRequest;
use App\Interfaces\Http\Requests\Charity\CreateCharityRequest;
use App\Interfaces\Http\Requests\Charity\UpdateCharityRequest;
use App\Interfaces\Http\Resources\Charity\CharityResource;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    public function CreateAdmin(RegisterAdminRequest $request,CreateAdmin $useCase){

        $Admin = $useCase->register($request->validated());
        return response()->json(['message' => 'beneficiary added', 'beneficiaries' => $Admin],201);

    }


    public function updateCharity($id, UpdateCharityRequest $request, UpdateCharity $usecase){
        $charity = $usecase->updateCharity($id, $request->validated());
        return response()->json(['message' => 'updated charity', 'charity' => new CharityResource($charity)], 201);
    }

    public function createCharity(CreateCharityRequest $request, CreateCharity $usecase){
        $charity = $usecase->createCharity($request->validated());
        return response()->json(['message' => 'created charity', 'charity' => new CharityResource($charity)], 201);
    }

    public function deleteCharity($id, DeleteCharity $usecase){
        $charity = $usecase->deleteCharity($id);
        return response()->json(['message' => 'deleted charity', 'charity' => new CharityResource($charity)], 201);
    }
}
