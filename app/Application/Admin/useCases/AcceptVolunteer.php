<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerNotificationRepository;

class AcceptVolunteer
{
    protected AdminRepositoriesInterface $adminRepo;
    protected VolunteerRepositoryInterface $volunteerRepo;
    protected VolunteerParticipationRepositoryInterface $participationRepo;
    protected EventRepositoryInterface $eventRepo;
    protected BaseRepositoryInterface $notificationRepo;

    public function __construct(AdminRepositoriesInterface $adminRepo,
                                VolunteerRepositoryInterface $volunteerRepo,
                                VolunteerParticipationRepositoryInterface $participationRepo,
                                EventRepositoryInterface $eventRepo,
                                EloquentVolunteerNotificationRepository $notificationRepo
    )
    {
        $this->adminRepo = $adminRepo;
        $this->volunteerRepo = $volunteerRepo;
        $this->participationRepo = $participationRepo;
        $this->eventRepo = $eventRepo;
        $this->notificationRepo = $notificationRepo;
    }


    public function accept($data)
    {
        $volunteer = $this->volunteerRepo->find($data['volunteer_id']);
        $participation = $this->participationRepo->find($data['participation_id']);
        $event = $this->eventRepo->find($data['event_id']);

        // Check if the event has room for more volunteers
        if ($event->NumOfVolunteer < $event->capacity) {

            // Increment number of volunteers safely
            $event->NumOfVolunteer += 1;
            $event->save();

            // Update participation status
            $participation->status = $data['status'];
            $participation->save();

            // Prepare notification
            $title = "You're Registered for: {$event->title}";
            $message = "
        Dear {$volunteer->name},

        Thank you for signing up to volunteer with us!

        Here are the event details:

        Event: {$event->title}
        Location: {$event->location}
        Your status: {$participation->status}

        Please arrive on time and bring any necessary materials.
        If you have any questions, feel free to contact us.

        We appreciate your commitment to making a difference!

        Warm regards,
        The Volunteer Coordination Team
        ";

            $notification = [
                'volunteer_id' => $data['volunteer_id'],
                'title' => $title,
                'message' => $message
            ];

            return $this->notificationRepo->create($notification);

        } else {
            // Event is full
            throw new \Exception("Cannot accept volunteer: event is full.");
        }
    }


    public function getPartici($id){


        return $this->participationRepo->allParticipation($id);
    }

}
