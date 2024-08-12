'use client'

import useSWR from 'swr'
import Cards from '@/components/Cards/Cards'
import InputTask from '@/components/InputTask/InputTask'
import { Task } from '@prisma/client'
import { notFound } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Simulação de dados de departamentos para o InputTask
const departmentsFetcher = async () => {
  const res = await fetch('/api/departments')
  return res.json()
}

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const {
    data: department,
    error,
    mutate,
  } = useSWR(`/api/departments/${id}`, fetcher, { refreshInterval: 10000 })

  const { data: departments } = useSWR('/api/departments', departmentsFetcher)

  if (error) return <div>Failed to load</div>
  if (!department || !departments) return <div>Loading...</div>

  if (!department) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-custom-gradient p-3">
      <div className="flex justify-center border-b-4 border-foreground py-2 shadow-lg">
        <h1 className="text-3xl font-bold">Departamento: {department.name}</h1>
      </div>
      <div className="mb-3 flex border-b-4 border-foreground py-2 shadow-lg">
        <InputTask departments={departments} />
      </div>
      <div className="flex justify-center">
        {department.tasks.length > 0 ? (
          <ul className="flex flex-col">
            {department.tasks.map((task: Task) => (
              <li
                key={task.id}
                className="w-[380px] sm:w-[600px] md:w-[700px] lg:w-[900px]"
              >
                <Cards
                  id={task.id}
                  description={task.description}
                  createdAt={task.createdAt}
                  mutate={mutate}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há tarefas associadas a este departamento.</p>
        )}
      </div>
    </div>
  )
}
