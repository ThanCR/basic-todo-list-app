import type { Todo } from "@/models/Todo"
import { FilterBar } from "./FilterBar"
import { TodoItem } from "./TodoItem"
import { useMemo, useState } from "react"

interface Props {
  todos: Todo[],
  removeTodo: (id: number) => void,
  setCompleted: (id: number) => void,
}

export const TodoList = ({ todos, setCompleted, removeTodo }: Props) => {

  const [searchText, setSearchText] = useState('')

  const filterTodos = useMemo<Todo[]>(() => {
    return todos.filter(todo => todo.title.toLowerCase().includes(searchText.toLowerCase()))
  }, [todos, searchText])

  return (
    <div className="p-5 max-w-96 w-full lg:max-w-full min-h-120">
      <div className="w-full max-w-96 m-auto mb-5">
        <FilterBar 
          searchText={searchText} 
          setSearchText={setSearchText} 
          amount={filterTodos.length}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-2 xl:gap-5 ">
        {searchText.length > 0
        ?filterTodos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            setCompleted={setCompleted}
            removeTodo={removeTodo} />
        ))
        :todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            setCompleted={setCompleted}
            removeTodo={removeTodo} />
        ))}
      </div>
    </div>
  )
}
