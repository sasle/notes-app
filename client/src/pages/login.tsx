import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <div className="flex min-h-screen justify-center items-center ">
            <div className="bg-purple-950 bg-opacity-40 p-8 text-center space-y-5 w-1/3">
                <h1 className="text-5xl font-semibold">Welcome!</h1>
                <LoginForm />
                <p>Don't have an account? <Link className="underline cursor-pointer" to="/sign-up">Sign up!</Link></p>
            </div>
        </div>
    )
}