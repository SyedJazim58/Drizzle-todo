"use client"
import { error } from 'console';
import { useRouter } from 'next/navigation';
import React from 'react'

interface DeleteTodoProps {
    id: number;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ id }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/todo?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (res.ok) {
                // console.log("task delete successfully")
                router.refresh();
            } else {
                const errorData = await res.json();
                console.error("Error deleting Task", errorData.message)
            }
        } catch (error) {
console.error("error deleting task", error);
        }
    };


    return (
        <button 
        onClick={handleDelete}
        className='text-red-500 hover:bg-red-700 hover:text-white p-3 py-1 rounded-md items-stretch'>
            Delete
        </button>
    );
};

export default DeleteTodo