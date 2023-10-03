import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { z } from "zod";
import { AxiosError } from "axios";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
})

interface CreateNoteDialogProps {
    onSuccess: () => void
    onError: (error: AxiosError) => void
}

export function CreateNoteDialog(props: CreateNoteDialogProps) {
    const [open, setOpen] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userId = localStorage.getItem("userId");
        await api.post(`/user/${userId}/notes`, {
            values,
        }).then(() => {
            props.onSuccess()
            setOpen(false);
        }).catch((error) => {
            props.onError(error)
            setOpen(false);
        })
    }

    return (
        <Dialog open={open}>
            <DialogTrigger>
                <Button className='flex gap-2' variant={"secondary"} onClick={() => setOpen(true)}><PlusCircle />Add a new Note</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Note</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="title..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="content..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-1/3">Submit</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}