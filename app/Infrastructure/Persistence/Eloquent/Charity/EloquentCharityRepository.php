<?php

namespace App\Infrastructure\Persistence\Eloquent\Charity;

use App\Domain\Charity\Models\Charity;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EloquentCharityRepository implements CharityRepositoryInterface
{
    public function all(){
        return Charity::with('category')->get();
    }

    public function find($id){
        return Charity::with('category')->findOrFail($id);
    }

    public function byCategory($id){
        return Charity::with('category')->where('category_id', $id)->get();
    }

    public function update($id , array $data){
        try {
        $charity = Charity::findOrFail($id);

        $charity->update($data);

        return $charity;
        } catch (ModelNotFoundException $e) {
            // Handle the case where the charity isn't found
            throw new \Exception("Charity with ID $id not found.");
        } catch (\Exception $e) {
            // Handle other possible exceptions
            throw new \Exception("Failed to update charity: " . $e->getMessage());
        }
    }

    public function create(array $data){
        try {
        $charity = Charity::create($data);

        return $charity;
        } catch (\Exception $e) {
            // Handle exception or log the error
            throw new \Exception("Failed to create charity: " . $e->getMessage());
        }
    }

    public function delete($id){
        try {
        $charity = Charity::findOrFail($id);
        
        $charity->delete();
        return true;
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Charity with ID $id not found.");
        } catch (\Exception $e) {
            throw new \Exception("Failed to delete charity: " . $e->getMessage());
        }
    }
}
