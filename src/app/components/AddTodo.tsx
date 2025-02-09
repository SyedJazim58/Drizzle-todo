"use client"
import { NewTodo } from '@/lib/drizzle';
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    try {

      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            task: task.task
          }),
        })

        if (res.ok) {
          setTask(null); // Reset input field

          // Wrap router.refresh() inside startTransition
          startTransition(() => {
            router.refresh()

          });
        }

        // console.log(res.ok)
      }
    } catch (error) {
      console.log("error")
    }
  }
  return (
    <div>
      <form className='w-full flex items-center space-x-4 justify-around px-5'>
        <input
          value={task?.task || ""}
          onChange={(e) => setTask(prev => ({...prev, task: e.target.value }))}
          className='rounded-full w-full px-5 py-4 border focus:outline-secondary' type="text" />
        <button
          type='button'
          onClick={handleSubmit}
          className='h-12 w-36 bg-secondary bg-gradient-to-b from-primary to-secondary  rounded-full text-white'
          disabled={isPending}>
          {isPending ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  )
}

export default AddTodo