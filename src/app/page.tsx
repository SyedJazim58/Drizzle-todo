import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"
function Home() {
  return (
    <main className="bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center">
      <div className="px-6 py-8 rounded-xl  w-full bg-gradient-to-bl from-white/30 to-white/30  max-w-[500px] backdrop-blur-3xl">

        <TodoList />
        <AddTodo />

        <div className="w-1/2 h-1.5 bg-black/65 rounded-full mx-auto my-6"></div>
      </div>
    </main>
  )
}


export default Home
