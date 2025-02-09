import { Todo } from "@/lib/drizzle";
import DeleteTodo from "./DeleteTodo";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      next: { revalidate: 10 }
    });
    if (!res.ok) {
      throw new Error("failed to fetch Data")
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