<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserRoleIsAllowedToAccess
{
	public function handle(Request $request, Closure $next)
	{
		if (auth()->user()->role == "admin") {
			return $next($request);
		}
		abort(403, "Cannot access to restricted page");
	}
}
