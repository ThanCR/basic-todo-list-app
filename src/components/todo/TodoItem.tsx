import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Todo } from "@/models/Todo"
import { formatDateToShow } from "./helpers/formatDeadline"
import { cn } from "@/lib/utils"
import { CheckLine, CircleMinus, Minus, Square, X } from "lucide-react"
import { useCountDown } from "./hook/useCountdown"
import { formatMMSS } from "./helpers/formatMMSS"

interface Props {
  todo: Todo,
  setCompleted: (id: number) => void,
  removeTodo: (id: number) => void
}

export const TodoItem = ({ todo, setCompleted, removeTodo }: Props) => {

  const { title, description, created, deadline, completed } = todo

  const remaining = useCountDown(deadline)

  return (
    <Card
      className={cn("w-full max-w-sm relative border-3 ", {
        'border-green-600 text-green-600': completed
      })}

    >
      <CardHeader className="h-full">
        <div className="flex justify-center items-center h-6 w-6 bg-black rounded-4xl cursor-pointer absolute -right-2 -top-2">
          <Minus className="text-white " onClick={() => { removeTodo(todo.id) }} />
        </div>
        <CardTitle className="pb-2">{title}</CardTitle>
        <CardDescription className={cn({
          'text-green-600': completed
        })}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs sm:text-sm">
        <p>Remaining Time: {!completed
          ? (!formatMMSS(remaining).includes('00:00:00')) ? formatMMSS(remaining) : (<span className="text-red-500">Expired</span>)
          : 'Completed'}</p>
        <p>Created: {formatDateToShow(created)}</p>
        <p>Deadline: {formatDateToShow(deadline)}</p>
      </CardContent>
      <CardFooter className="flex-row justify-center gap-10">
        {completed
          ? <div
            className=" text-green-700 cursor-pointer"
            onClick={() => { setCompleted(todo.id) }}><CheckLine /></div>
          : <div
            className="cursor-pointer"
            onClick={() => { setCompleted(todo.id) }}><Square /></div>}
      </CardFooter>
    </Card>
  )
}
