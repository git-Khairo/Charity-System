<?php

namespace App\Http\Controllers;

use App\Application\Admin\useCases\ActivityReport;
use App\Application\Admin\useCases\Login;
use App\Application\Admin\useCases\Statistics;
use App\Application\Events\useCases\AddEvent;
use App\Application\Events\useCases\DeleteEvent;
use App\Application\Events\useCases\UpdateEvent;
use App\Interfaces\Http\Requests\Admins\ActivityReportRequest;
use App\Interfaces\Http\Requests\Admins\LoginAdminRequest;
use App\Interfaces\Http\Requests\Admins\VolunteerStatRequest;
use App\Interfaces\Http\Requests\Events\StoreEventRequest;
use App\Interfaces\Http\Requests\Events\UpdateEventRequest;
use App\Interfaces\Http\Resources\Events\EventResource;

class AdminController extends Controller
{

    public function login($lang,LoginAdminRequest $request,Login $useCase){
        $admin=$useCase->login($lang,$request->validated());

        return response()->json(['message' => 'Admin registered successfully', 'user' => $admin],201);
    }

    public function volunteerStat(VolunteerStatRequest $request, Statistics $useCase){

        $report = $useCase->allVolunteer($request->validated());
        return response()->json(['message' => 'this year report', 'report' => $report], 201);

    }

    public function activityReport(ActivityReportRequest $request,ActivityReport $useCase){

        $report = $useCase->report($request->validated());
        return response()->json(['message' => 'this year report', 'report' => $report], 201);

    }

    public function createEvent(StoreEventRequest $request, AddEvent $usecase){
        $event = $usecase->createEvent($request->validated());
        return response()->json(['message' => 'Created Event', 'event' => new EventResource($event)], 201);
    }

    public function updateEvent(UpdateEventRequest $request, $id, UpdateEvent $usecase){
        $event = $usecase->updateEvent($id, $request->validated());
        return response()->json(['message' => 'Updated Event', 'event' => new EventResource($event)], 201);
    }

    public function deleteEvent($id, DeleteEvent $usecase){
        $event = $usecase->deleteEvent($id);
        return response()->json(['message' => 'Deleted Event', 'event' => new EventResource($event)], 201);
    }

}
