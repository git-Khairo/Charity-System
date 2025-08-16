<?php

namespace App\Application\Admin\Jobs;
use App\Domain\Beneficiary\Models\beneficiary_notification;
use App\Domain\volunteer\Models\Volunteer_notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationJob implements ShouldQueue
{
    use  Dispatchable,Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $userIds;
    protected $title;
    protected $message;
    protected $beneficiaryId;

    public function __construct($beneficiaryId,$userIds,$message,$title)
    {

        $this->userIds=$userIds;
        $this->message=$message;
        $this->title=$title;
        $this->beneficiaryId=$beneficiaryId;
      //  dd($this->userIds);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $users=$this->userIds;

        foreach ($this->beneficiaryId as $beneficiaryId) {
            beneficiary_notification::create([
                'beneficiary_id' => $beneficiaryId,
                'title' => $this->title,
                'message' => $this->message,
            ]);
        }

        foreach ($users as $volunteerId) {
            Volunteer_notification::create([
                'volunteer_id' => $volunteerId,
                'title'        => $this->title,
                'message'      => $this->message,
            ]);
        }
    }
}
