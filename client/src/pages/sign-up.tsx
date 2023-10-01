import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { SignUpForm } from "@/components/sign-up-form";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export function SignUp() {
    const { toast } = useToast();
    const navigate = useNavigate();

    function onError(error: AxiosError) {
        console.log(error)
        toast({
            title: 'Error on login',
            description: error.response?.data?.error,
            variant: "destructive"
        })
    }

    function onFinished() {
        toast({
            title: 'User created successfully.'
        })
        navigate('/')
    }
    return (
        <div className="flex min-h-screen justify-center items-center ">
            <div className="bg-purple-950 bg-opacity-40 p-8 text-center space-y-5 w-1/3">
                <h1 className="text-5xl font-semibold">Sign Up</h1>
                <SignUpForm onFinished={onFinished} onError={onError} />
                <p>Already have an account? <Link className="underline cursor-pointer" to="/">Log in!</Link></p>
            </div>
        </div>
    )
}