import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/axios';
import { Note } from '@/lib/utils';
import { LogOut, Trash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { CreateNoteDialog } from '@/components/create-note-dialog';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DeleteNoteDialog } from '@/components/delete-note-dialog';

export function HomePage() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([])

    const loadNotes = useCallback(async () => {
        const userId = localStorage.getItem("userId")
        const { data } = await api.get(`/user/${userId}/notes`)
        setNotes(data);
    }, [])

    useEffect(() => {
        loadNotes();
    }, [loadNotes])

    function onErrorCreateNote(error: AxiosError) {
        toast({
            title: 'Not able to create note.',
            description: error.response?.data?.error,
            variant: "destructive"
        })
    }

    function onErrorDeleteNote(error: AxiosError) {
        toast({
            title: 'Not able to delete note.',
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

    function onSuccessfulNoteDeletion() {
        toast({
            title: 'Success',
            description: "Note deleted successfully.",
        })
        loadNotes();
    }

    return (
        <div className='flex flex-col items-center min-h-screen space-y-3 p-3'>
            <Button className='flex gap-3 self-end' onClick={() => navigate('/')}><LogOut />Logout</Button>

            <div className='flex flex-col items-center space-y-3'>
                <div className='flex flex-col gap-4 items-center'>
                    {notes.map(note => {
                        return (
                            <Card className='p-4 max-w-lg'>
                                <CardHeader>
                                    <div className='flex justify-between items-center'>
                                        <CardTitle className='font-semibold'>{note.title}</CardTitle>
                                        <DeleteNoteDialog onSuccess={onSuccessfulNoteDeletion} onError={onErrorDeleteNote} noteId={note.id} />
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className='mt-2 text-sm break-words h-24'>{note.content}</CardContent>
                                <Separator />
                                <CardFooter>
                                    <div className='flex gap-3 mt-3'>
                                        <span className='text-muted-foreground text-xs'>Created: {note.createdAt.toLocaleString()}</span>
                                        <p className='text-muted-foreground text-xs'>•</p>
                                        <span className='text-muted-foreground text-xs'>Updated: {note.updatedAt?.toLocaleString()}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
                <CreateNoteDialog onError={onErrorCreateNote} onSuccess={onSuccessfulNoteCreation} />
            </div>

        </div>
    )
}