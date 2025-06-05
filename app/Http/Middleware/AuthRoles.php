<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Staff;

class AuthRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!sso()->check()) {
            return redirect(config('openid.redirect_uri'));
        }

        $user = sso()->user();
        $userRole = $user->getActiveRole()->getName();
        $userId = $user->getId();

        $isAllowed = false;

        foreach ($roles as $allowedRole) {
            if ($allowedRole === 'Administrator') {
                if ($userRole === 'Administrator') {
                    $isAllowed = true;
                    break;
                }

                if ($userRole === 'Tendik') {
                    $staff = Staff::where('user_id', $userId)->first();
                    if ($staff && $staff->is_admin) {
                        $isAllowed = true;
                        break;
                    }
                }
            } elseif ($userRole === $allowedRole) {
                $isAllowed = true;
                break;
            }
        }

        if (!$isAllowed) {
            return redirect('/access-denied')->with('error', 'Anda tidak punya akses');
        }

        return $next($request);
    }
}
