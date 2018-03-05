<?php

namespace App\Http\Controllers\Auth;

use App\FacebookUser;
use App\User;
use \GuzzleHttp\Client;
use App\Http\Controllers\Controller;
//use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

//    use AuthenticatesUsers;
    use ThrottlesLogins;

    public function login(Request $request)
    {
        $this->validateLogin($request);
        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }
        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }
        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);
        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        return $this->guard()->attempt(
            $this->credentials($request), $request->filled('remember')
        );
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'password');
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();
        $this->clearLoginAttempts($request);
        return $this->authenticated($request, $this->guard()->user());
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  mixed $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        return Response::make([
            'data' => $user,
            'success' => true,
            'message' => 'You have successfuly logged in!'
        ], 200);
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();
        return Response::make([
            'data' => null,
            'success' => true,
            'message' => 'You have successfuly logged out!'
        ], 200);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function inSession()
    {

        $user = Auth::user();

        if ($user) {
            return Response::make([
                'data' => $user,
                'success' => true,
                'message' => 'You have successfuly logged in!'
            ], 200);
        }

        return Response::make([
            'data' => null,
            'success' => true,
            'message' => 'No session'
        ], 401);

    }

    public function facebookLogin(Request $request)
    {
        $client = new Client();
        $res = $client->get('https://graph.facebook.com/debug_token', ['query' => ['input_token' => $request['user_token'],
            'access_token' => '169331733711181|fb21eae1dca3ba7533ee35643e7df7a2']]);

        if($res->getStatusCode() == 200){

            $fb_user = json_decode($res->getBody()->getContents())->data;

            $facebook_user = FacebookUser::where('facebook_id', $fb_user->user_id)->first();

            if($facebook_user != null){
                $user = $facebook_user->user;
            } else {
                $user = User::create(['email' => $request['email'], 'name' => $request['name'], 'password' => Hash::make("ppqoa")]);
                FacebookUser::create(['user_id' => $user->id, 'facebook_id' => $fb_user->user_id]);
            }

            if(Auth::attempt(['email' => $user->email, 'password' => "ppqoa"])){
                return Response::make([
                    'data' => $user,
                    'success' => true,
                    'message' => 'You have successfully logged in!'
                ], 200);
            }

        }

        return Response::make([
            'data' => null,
            'success' => true,
            'message' => 'Invalid fb token'
        ], 401);

    }

}
