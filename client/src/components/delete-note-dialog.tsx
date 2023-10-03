import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface DeleteNoteDialogProps {
    onSuccess: () => void
    onError: (error: AxiosError) => void
    noteId: string
}

export function DeleteNoteDialog(props: DeleteNoteDialogProps) {
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        const userId = localStorage.getItem("userId");
        await api.delete(`/user/${userId}/notes/${props.noteId}`).then(() => {
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Trash className='w-4 h-4 cursor-pointer' color='red' onClick={() => setOpen(true)} />
                        </TooltipTrigger>
                        <TooltipContent>
                            Delete
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you wish to delete this note?
                </DialogDescription>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}