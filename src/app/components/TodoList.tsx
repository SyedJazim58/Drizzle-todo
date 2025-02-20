import { Todo } from "@/lib/drizzle";
import DeleteTodo from "./DeleteTodo";

const getData = async () => {
  try {
    console.log("Fetching from:", process.env.NEXT_PUBLIC_API_URL);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${apiUrl}/api/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error(`failed to fetch Data ${res.status} ${res.statusText}`)
    };
    const result = await res.json()
    return result
  } catch (err) {
    console.log(err)
    return { data: [] }
  };

}




const TodoList = async () => {

  const res: { data: Todo[] } = await getData();
  return (
    <div className="max-h-[340px] overflow-auto mb-4 ">
      {
        res.data.map((item) => {
          return (

            <div key={item.id} className='bg-gray-100 py-4 px-4 flex justify-between items-center gap-x-6 shadow rounded-lg my-5 mx-3'>
              <div className='h-3 w-3 bg-secondary rounded-full'></div>
              <p className='text-lg font-semibold bg-transparent backdrop-blur-3xl flex-1'>{item.task}</p>
              <DeleteTodo id={item.id} />

            </div>

          )

        })
      }
    </div>
  )
}

export default TodoList