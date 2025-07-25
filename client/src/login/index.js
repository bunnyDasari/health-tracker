import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "./index.css";

const Login = () => {
    return (
        <header className="app-header">
            <div className="logo">🩺 Health Tracker</div>
            <div className="auth-section">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="btn login-btn">
                            <span className="login-btn-icon"></span> Login
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
};

export default Login;
