import type { Todo } from "@/models/Todo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { DatePicker } from "./DatePicker"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Form, FormField } from "../ui/form"
import { buildFromDateTime } from "./helpers/buildFromDateTime"
import { cn } from "@/lib/utils"
import type { MouseEvent } from "react"

interface Props {
  addTodo: (todo: Todo) => void
}

export interface FormInputs {
  title: string | undefined;
  description: string | undefined;
  dateTime: {
    date: Date;
    time: string;
  }
}

export const TodoAddForm = ({ addTodo }: Props) => {

  const form = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      dateTime: {
        date: new Date(),
        time: new Date().toTimeString().slice(0, 8),
      }
    },
  })

  const { errors } = form.formState

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { date, time } = data.dateTime
    if (!date || !time) return

    const deadline: Date = buildFromDateTime(date, time)
    const { title, description } = form.getValues()
    const newTodo: Todo = {
      id: new Date().getTime(),
      title: title || '',
      description: description || '',
      created: new Date().toISOString(),
      deadline: deadline.toISOString(),
      completed: false
    }
    addTodo(newTodo)
    form.reset()
  }

  const handleReset = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <Form {...form}>
      <form className="
        flex 
        flex-col 
        gap-5 
        h-full 
        border 
        border-gray-200 
        self-center 
        sm:self-baseline 
        p-5 
        rounded-2xl 
        w-full 
        max-w-96
        " onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            placeholder="What are you going to do today?"
            className={cn("bg-secondary border-border", {
              'border-red-400': errors.title
            })}
            {...form.register("title", {
              required: true,
              minLength: 6
            })}
          />
          {errors.title ? <p className="text-xs text-red-500">Title should be 6 characters at least</p> : ''}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            placeholder="Write a brief description..."
            className={cn("bg-secondary border-border min-h-28 resize-none", {
              'border-red-400': errors.description
            })}
            {...form.register("description", {
              required: true,
            })}
          />
          {errors.description ? <p className="text-xs text-red-500">Description is required</p> : ''}
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            name="dateTime"
            control={form.control}
            render={({ field }) => (<DatePicker field={field} />)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Create task
          </Button>
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset fields
          </Button>
        </div>
      </form>
    </Form>
  )
}
