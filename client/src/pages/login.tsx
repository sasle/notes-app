import { api } from "@/lib/axios"
import { useEffect } from "react"

export function LoginPage() {
    async function test() {
        await api.get('/');
    }
    useEffect(() => {
        test()
    }, [test])
    return <p className="text-muted-foreground text-5xl font-bold">Welcome!</p>
}