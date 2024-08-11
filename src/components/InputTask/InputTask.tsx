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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
      department: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    if (!departmentValue) {
      setError('department', {
        type: 'manual',
        message: 'Escolha um',
      })
    } else {
      const response = await fetch('/api/tasks/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentId: Number(data.department),
          description: data.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar a task')
      }

      console.log('Task criada com sucesso:')
      reset()
    }
  }

  const handleDepartmentChange = (value: string) => {
    setValue('department', value)
    clearErrors('department')
  }

  const departmentValue = watch('department')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
      <div className="flex gap-3">
        <div className="w-[405px]">
          {errors.description ? (
            <p className="mb-1 text-sm text-red-300">
              {errors.description.message}
            </p>
          ) : (
            <p className="mb-1 text-sm font-semibold text-foreground">Tarefa</p>
          )}
          <Input
            placeholder="Descrição da tarefa"
            {...register('description', {
              required: 'Descrição obrigatória',
            })}
          />
        </div>
        <div>
          {errors.department ? (
            <p className="mb-1 text-sm text-red-300">
              {errors.department.message}
            </p>
          ) : (
            <p className="mb-1 text-sm text-foreground">Departamento</p>
          )}
          <Select
            onValueChange={handleDepartmentChange}
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
        <div className="mt-6">
          <Button type="submit" className="rounded">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  )
}
