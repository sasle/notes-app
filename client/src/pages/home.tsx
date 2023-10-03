import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/axios';
import { Note } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { CreateNoteDialog } from '@/components/create-note-dialog';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

export function HomePage() {
    const { toast } = useToast();
    const [notes, setNotes] = useState<Note[]>([])

    const loadNotes = useCallback(async () => {
        const userId = localStorage.getItem("userId")
        const { data } = await api.get(`/user/${userId}/notes`)
        setNotes(data);
    }, [])

    useEffect(() => {
        loadNotes();
    }, [loadNotes])

    function onError(error: AxiosError) {
        toast({
            title: 'Not able to create note.',
            description: error.response?.data?.error,
            variant: "destructive"
        })
    }

    function onSuccessfulNoteCreation() {
        toast({
            title: 'Success',
            description: "Note created successfully.",
        })
        loadNotes();
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-3'>
            <div className='flex gap-4 w-4/5'>
                {notes.map(note => {
                    return (
                        <Card className='p-4 w-fit'>
                            <CardHeader>
                                <div className='flex justify-between items-center'>
                                    <CardTitle>{note.title}</CardTitle>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Trash className='w-4 h-4 cursor-pointer' color='red' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Delete
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent>{note.content}</CardContent>
                            <Separator />
                            <CardFooter>
                                <div className='flex gap-3'>
                                    <span className='text-muted-foreground text-xs'>Created: {note.createdAt.toLocaleString()}</span>
                                    <p className='text-muted-foreground text-xs'>•</p>
                                    <span className='text-muted-foreground text-xs'>Updated: {note.updatedAt?.toLocaleString()}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            <CreateNoteDialog onError={onError} onSuccess={onSuccessfulNoteCreation} />
        </div>
    )
}