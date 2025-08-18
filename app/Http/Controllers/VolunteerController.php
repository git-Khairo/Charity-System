<?php

namespace App\Http\Controllers;

use App\Application\Beneficiary\UseCases\ApplyForCharity;
use App\Application\Volunteer\UseCases\AllNotification;
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
use App\Interfaces\Http\Requests\Volunteer\VolunteerReport;
use App\Interfaces\Http\Resources\Charity\CharityResource;
use App\Interfaces\Http\Resources\Events\EventResource;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        try {
            $volunteer = $useCase->login($request->validated());

            if (!$volunteer) {
                return response()->json([
                    'message' => 'Authentication failed',
                    'errors' => ['credentials' => ['Invalid email or password']],
                ], 401);
            }

            return response()->json([
                'message' => 'Volunteer logged in successfully',
                'user' => $volunteer['user'],
                'token' => $volunteer['token'],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ], 500);
        }
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

    public function report($id,VolunteerReport $request,ApplyForEvents $useCase){

        $eventStat=$useCase->eventStatus($id);
        $report=$useCase->report($id,$request->validated());

        $data=[
            'eventStat'=>$eventStat,
            'report'=>$report
        ];
        return response()->json(['message' => 'Volunteer report', 'user events' => $data],201);
    }

    public function myNotification(AllNotification $useCase){

        $notification=$useCase->all();


        return response()->json(['message' => 'all the user notification', 'user notification' => $notification],200);

    }

    public function acceptedEvent(ApplyForEvents $useCase){

        $myEvent=$useCase->volunteerEvents();

        return response()->json(['message' => 'User events', 'events' =>  EventResource::collection($myEvent)],201);
    }
}
