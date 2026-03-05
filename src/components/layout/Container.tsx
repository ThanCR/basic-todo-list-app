import { useTodos } from "../todo/hook/useTodos"
import { TodoAddForm } from "../todo/TodoAddForm"
import { TodoList } from "../todo/TodoList"

export const Container = () => {

  const { todos, addTodo, setCompleted, removeTodo } = useTodos()

  return (
    <div className="
      flex
      flex-col-reverse
      items-center
      justify-center
      gap-5
      m-auto
      lg:flex-row
      w-9/10
      border
      border-gray-400
      p-5
      rounded-2xl 
      bg-mist-500/20
      backdrop-blur-sm
      ">
      <TodoList todos={todos} setCompleted={setCompleted} removeTodo={removeTodo} />
      <TodoAddForm addTodo={addTodo} />
    </div>
  )
}
