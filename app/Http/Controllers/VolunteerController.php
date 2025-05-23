<?php

namespace App\Http\Controllers;

use App\Application\Volunteer\UseCases\LoginOrRegister;
use App\Application\Volunteer\UseCases\UpdateInfo;
use App\Interfaces\Http\Requests\Volunteer\LoginVolunteerRequest;
use App\Interfaces\Http\Requests\Volunteer\StoreVolunteerRequest;
use App\Interfaces\Http\Requests\Volunteer\UpdateVolunteerRequest;
use App\Volunteer;


class VolunteerController extends Controller
{
    /*
     *
     * Register a user
     * */
    public function Register(StoreVolunteerRequest $request,LoginOrRegister $useCase){

        $Volunteer=$useCase->Register($request->validated());

        return response()->json(['message' => 'Volunteer registered successfully', 'user' => $Volunteer],201);
    }
    /*
    *
    * Register a user
    * */
    public function login(LoginVolunteerRequest $request,LoginOrRegister $useCase){
        $Volunteer=$useCase->login($request->validated());

        return response()->json(['message' => 'Volunteer registered successfully', 'user' => $Volunteer],201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Volunteer $volunteer)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function updateVolunteer(UpdateVolunteerRequest $request, UpdateInfo $useCase)
    {
        $Volunteer=$useCase->Update($request->validated());

        return response()->json(['message' => 'Data Updated successfully', 'user' => $Volunteer],201);

    }
    /*
     * Apply for an charity
     *
     * */
    public function Apply(Volunteer $volunteer){

    }
}
