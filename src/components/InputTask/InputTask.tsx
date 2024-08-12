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
import { useRouter } from 'next/navigation'

interface Department {
  id: number
  name: string
}

interface InputTaskProps {
  departments: Department[]
  mutate: () => void
}

interface FormValues {
  description: string
  department: string
}

export default function InputTask({
  departments = [],
  mutate,
}: InputTaskProps) {
  const router = useRouter()
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
      return
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentId: Number(departmentValue),
          description: data.description,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erro na resposta da API:', errorData)
        throw new Error('Erro New Task')
      }
      reset()
      router.refresh()
      mutate()
    } catch (error) {
      console.error('Erro ao submeter o formulário:')
    }
  }
  const handleDepartmentChange = (value: string) => {
    setValue('department', value)
    clearErrors('department')
  }

  const departmentValue = watch('department')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-1">
      <div className="flex justify-center gap-3">
        <div className="w-[640px]">
          {errors.description ? (
            <p className="mb-1 text-sm text-red-200">
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
            <p className="mb-1 text-sm text-red-200">
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
          <Button
            type="submit"
            className="rounded bg-muted hover:bg-muted-foreground"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  )
}
