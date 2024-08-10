'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useForm } from 'react-hook-form'

interface Department {
  id: number
  name: string
}

interface InputTaskProps {
  departments: Department[]
}

interface FormValues {
  description: string
  department: string
}

export default function InputTask({ departments = [] }: InputTaskProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      description: '',
      department: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data)
  }

  const departmentValue = watch('department')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
      <div className="flex gap-3">
        <div className="w-[405px]">
          <Input
            placeholder="Descrição da tarefa"
            {...register('description')}
          />
        </div>
        <div>
          <Select
            onValueChange={(value) => setValue('department', value)}
            value={departmentValue}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit" className="rounded">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  )
}
