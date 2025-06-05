<?php

namespace App\Http\Controllers;

use App\Models\User;
use Dptsi\Sso\Facade\Sso;
use Dptsi\Sso\Models\User as SsoUser;
use Dptsi\Sso\Requests\OidcLoginRequest;
use Dptsi\Sso\Requests\OidcLogoutRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Its\Sso\OpenIDConnectClientException;

class AuthController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function auth()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request): RedirectResponse
    {

        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        DB::beginTransaction();

        try {
            $user = User::where('email', $request->email)
                ->first();
            \Log::info($user);
            if (!$user || !Hash::check($request->password, $user->password)) {
                return back()->withErrors([
                    'message' => 'Email atau password salah',
                ]);
            }

            $role = null;

            switch ($user->role) {
                case 'Mahasiswa':
                    $role = 'student';
                    break;
                case 'Tendik':
                    $staff = \App\Models\Staff::where('user_id', $user->id)->first();
                    $staff->is_admin ? $role = 'admin' : $role = 'staff';
                    break;
                case 'Administrator':
                    $staff = \App\Models\Staff::where('user_id', $user->id)->first();
                    $staff->is_admin ? $role = 'admin' : $role = 'staff';
                    break;
                default:
                    break;
            }

            $datas = [
                'id' => $user->id,
                'name' => $user->name ? $user->name : 'name',
                'username' => $user->username ? $user->username : 'username',
                'picture' => $user->picture ? $user->picture : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                'email' => $user->email,
                'role' => $role,
            ];

            Auth::login($user);

            Session::put('user', $datas);
            $request->session()->regenerate();

            DB::commit();

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::info($e->getMessage());
            return back()->withErrors([
                'message' => 'Terjadi kesalahan sistem, silakan coba lagi.',
            ]);
        }
    }


    // public function login()
    // {
    //     try {
    //         $redirectUri = config('openid.redirect_uri');

    //         $request = new OidcLoginRequest(
    //             config('openid.provider'),
    //             config('openid.client_id'),
    //             config('openid.client_secret'),
    //             $redirectUri,
    //             config('openid.scope'),
    //             config('openid.allowed_roles')
    //         );

    //         Sso::login($request);
    //         $user = Sso::user();

    //         $this->updateOrInsertUser($user);
    //         $role = null;

    //         switch ($user->getActiveRole()->getName()) {
    //             case 'Mahasiswa':
    //                 $role = 'student';
    //                 break;
    //             case 'Tendik':
    //                 $staff = \App\Models\Staff::where('user_id', $user->getId())->first();
    //                 $staff->is_admin ? $role = 'admin' : $role = 'staff';
    //                 break;
    //             case 'Administrator':
    //                 $staff = \App\Models\Staff::where('user_id', $user->getId())->first();
    //                 $staff->is_admin ? $role = 'admin' : $role = 'staff';
    //                 break;
    //             default:
    //                 break;
    //         }

    //         $datas = [
    //             'id' => $user->getId(),
    //             'name' => $user->getName(),
    //             'username' => $user->getUsername(),
    //             'picture' => $user->getPicture(),
    //             'email' => $user->getEmail(),
    //             'role' => $role,
    //         ];

    //         Session::put('user', $datas);
    //         return redirect()->to('/dashboard')->with('success', 'Successfully logged in');
    //     } catch (OpenIDConnectClientException $e) {
    //         Session::remove('auth');
    //         Session::save();

    //         Log::error($e->getMessage());
    //     }
    // }

    // public function logout()
    // {
    //     try {
    //         $request = new OidcLogoutRequest(
    //             config('openid.provider'),
    //             config('openid.client_id'),
    //             config('openid.client_secret'),
    //             config('openid.post_logout_redirect_uri')
    //         );
    //         Log::info(config('openid.post_logout_redirect_uri'));
    //         Sso::logout($request);
    //         return redirect()->to('/');
    //     } catch (OpenIDConnectClientException $e) {
    //         Log::error($e->getMessage());
    //     }
    // }

    public function logout()
    {
        Auth::logout();
        Session::flush();
        return redirect('/');
    }

    // private function updateOrInsertUser(SsoUser $user)
    // {
    //     try {
    //         DB::beginTransaction();
    //         $role = $user->getActiveRole()->getName();

    //         \App\Models\User::updateOrInsert(
    //             ['id' => $user->getId()],
    //             [
    //                 'name' => $user->getName(),
    //                 'username' => $user->getUsername(),
    //                 'gender' => $user->getGender(),
    //                 'birthdate' => $user->getBirthdate(),
    //                 'email' => $user->getEmail(),
    //                 'email_verified' => $user->getEmailVerified(),
    //                 'alternate_email' => $user->getAlternateEmail(),
    //                 'alternate_email_verified' => $user->getAlternateEmailVerified(),
    //                 'phone' => $user->getPhone(),
    //                 'phone_verified' => $user->getPhoneVerified(),
    //                 'zoneinfo' => $user->getZoneinfo(),
    //                 'locale' => $user->getLocale(),
    //                 'picture' => $user->getPicture(),
    //                 'sso_role' => $role,
    //                 'updated_at' => now(),
    //                 'updater' => Str::uuid(),
    //             ]
    //         );

    //         if (in_array($role, ['Administrator', 'Tendik'])) {
    //             $staffExist = \App\Models\Staff::where('user_id', $user->getId())->exists();
    //             \App\Models\Staff::updateOrCreate(
    //                 ['user_id' => $user->getId()],
    //                 array_merge(
    //                     $staffExist ? [] : ['id' => Str::uuid()],
    //                     $staffExist ? [] : ['is_admin' => $role == 'Administrator'],
    //                     $staffExist ? [] : ['authority' => $role == 'Administrator' ? json_encode([1, 2, 3, 4, 5, 6]) : json_encode([])]
    //                 )
    //             );
    //         }

    //         DB::commit();
    //     } catch (\Throwable $th) {
    //         DB::rollBack();
    //         Log::error('Error in updateOrInsertUser: ' . $th->getMessage());
    //         throw $th;
    //     }
    // }
}
