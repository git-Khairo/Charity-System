<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|max:2048',
                'filename' => 'required|string',
                'directory' => 'nullable|string', // New: optional folder
            ]);

            $file = $request->file('image');
            $filename = $request->input('filename');
            $directory = $request->input('directory', 'uploads'); // default to 'uploads'

            // Sanitize filename and directory
            $filename = preg_replace('/[^A-Za-z0-9_\-]/', '_', $filename);
            $directory = preg_replace('/[^A-Za-z0-9_\-\/]/', '_', $directory); // allow slashes for subfolders

            // Add extension if missing
            $extension = $file->getClientOriginalExtension();
            if (!str_ends_with($filename, '.' . $extension)) {
                $filename .= '.' . $extension;
            }

            // Ensure the folder exists
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }

            // Store the file
            $path = $file->storeAs($directory, $filename, 'public');

            return response()->json([
                'url' => asset('storage/' . $path),
                'filename' => $filename,
                'directory' => $directory,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
