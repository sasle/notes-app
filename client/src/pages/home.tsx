import { LoginForm } from "@/components/login-form";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export function HomePage() {
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

    function onSuccessfulLogin() {
        navigate('/home')
    }
    return (
        <div className="flex min-h-screen justify-center items-center ">
            <div className="bg-purple-950 bg-opacity-40 p-8 text-center space-y-5 w-1/3">
                <h1 className="text-5xl font-semibold">Welcome!</h1>
            </div>
        </div>
    )
}