"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import {type ControllerRenderProps } from "react-hook-form"
import type { FormInputs } from "./TodoAddForm"

interface Props {
  field: ControllerRenderProps<FormInputs, "dateTime">;
}

export const DatePicker = ({ field: dateTime }: Props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <FieldGroup className="flex flex-col  md:flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional" className="text-white">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {dateTime.value ? format(dateTime.value.date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden" align="start">
            <Calendar
              mode="single"
              selected={dateTime.value.date}
              captionLayout="dropdown"
              defaultMonth={dateTime.value.date}
              onSelect={(date) => {
                dateTime.onChange({
                  ...dateTime.value,
                  date
                })
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional" className="text-white">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          onChange={(e) => {
            dateTime.onChange({
              ...dateTime.value,
              time: e.target.value
            })
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>

  )
}
