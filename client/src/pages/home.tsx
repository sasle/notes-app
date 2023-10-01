import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/axios';
import { Note } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function HomePage() {
    const [notes, setNotes] = useState<Note[]>([])


    const loadNotes = useCallback(async () => {
        const userId = localStorage.getItem("userId")
        const { data } = await api.get(`/user/${userId}/notes`)
        setNotes(data);
    }, [])

    useEffect(() => {
        loadNotes();
    }, [loadNotes])

    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-3'>
            {notes.map(note => {
                return <p>{note.content}</p>
            })}
            <Button className='flex gap-2' variant={"secondary"}><PlusCircle />Add a new Note.</Button>
        </div>
    )
}