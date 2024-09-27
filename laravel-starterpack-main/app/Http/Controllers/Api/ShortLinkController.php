<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShortLinkRequest;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShortLinkController extends Controller
{
    public function store(ShortLinkRequest $request)
    {
        try {
            Link::create(
                [
                    'id' => Str::uuid(),
                    'url' => $request->url,
                    'slug' => $request->slug,
                ]
            );
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
        return response()->json([
            'message' => 'Short link created successfully',
            'url' => url('/', $request->slug),
        ], 200);
    }

    public function show($slug){
        $link = Link::where('slug', $slug)->first();

        if(!$link){
            abort(404);
        }
        return redirect($link->url);
    }
}
