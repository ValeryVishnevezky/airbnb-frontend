import { Outlet } from 'react-router'
import { useLocation } from "react-router-dom";

export default function LoginSignup() {

  const isSignup = location.pathname.startsWith("/login/signup");

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="title">{isSignup ? 'Signup' : 'Login'}</h1>
                <Outlet />
            </div>
        </div>
    )
}