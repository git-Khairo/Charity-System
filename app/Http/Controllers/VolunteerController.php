<?php

namespace App\Http\Controllers;

use App\Application\Volunteer\UseCases\ApplyForEvents;
use App\Application\Volunteer\UseCases\Feedback;
use App\Application\Volunteer\UseCases\GetVolunteer;
use App\Application\Volunteer\UseCases\LoginOrRegister;
use App\Application\Volunteer\UseCases\UpdateInfo;
use App\Interfaces\Http\Requests\Volunteer\ApplyEventRequest;
use App\Interfaces\Http\Requests\Volunteer\FeedbackRequest;
use App\Interfaces\Http\Requests\Volunteer\LoginVolunteerRequest;
use App\Interfaces\Http\Requests\Volunteer\StoreVolunteerRequest;
use App\Interfaces\Http\Requests\Volunteer\UpdateVolunteerRequest;
use Illuminate\Http\Request;


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

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return [
            'message'=>'You are logged out'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show($id,GetVolunteer $useCase)
    {
        $Volunteer=$useCase->getUser($id);

        return response()->json(['message' => 'Data Updated successfully', 'user' => $Volunteer],201);
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
     * make a feedback
     *
     * */

    public function makeFeedback(FeedbackRequest $request,Feedback $useCase){

        $Feedback=$useCase->makeFeedback($request->validated());

        return response()->json(['message' => 'Feedback has been made successfully', 'Feedback' => $Feedback],201);

    }

    /*
    * see all the feedbacks
    *
    * */

    public function myFeedbacks(Feedback $useCase){

        $myFeedback=$useCase->myFeedback();

        return response()->json(['message' => 'User Feedback', 'user Feedbacks' => $myFeedback],201);

    }

    /*
     *
     * apply for an event
     *
     * */
    public function applyForEvent(ApplyEventRequest $request,ApplyForEvents $useCase,$id){

        $response=$useCase->applyForEvent($request->validated(),$id);

        return response()->json(['message' => 'apply done successfully', 'response' => $response],201);

    }

    /*
     *
     * see all the applied events
     *
     * */

    public function myEvents(ApplyForEvents $useCase){

        $event=$useCase->myEvent();

        return response()->json(['message' => 'all the user events', 'user events' => $event],201);
    }
}
