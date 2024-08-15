'use client'

import Cards from '@/components/Cards/Cards'
import InputTask from '@/components/InputTask/InputTask'
import { Task } from '@prisma/client'
import { notFound } from 'next/navigation'
import { useDepartmentData } from '@/app/Hooks/useDepartmentData'
import { useEffect } from 'react'

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { department, departments, error, mutate, hasUnreadTask } =
    useDepartmentData(id)

  // novo

  useEffect(() => {
    const markTasksAsRead = async () => {
      if (document.visibilityState === 'visible' && department?.tasks) {
        try {
          const unreadTasks = department.tasks.filter(
            (task: Task) => task.isRead === false,
          )

          for (const task of unreadTasks) {
            await fetch(`/api/tasks`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ taskId: task.id, isRead: true }), // Envia o ID da task e o valor de isRead
            })
          }

          // Atualiza os dados locais
          mutate()
        } catch (error) {
          console.error('Erro ao marcar tasks como lidas:', error)
        }
      }
    }

    document.addEventListener('visibilitychange', markTasksAsRead)

    return () => {
      document.removeEventListener('visibilitychange', markTasksAsRead)
    }
  }, [department, mutate])

  // fim

  useEffect(() => {
    const originalTitle = document.title
    let interval: NodeJS.Timeout | undefined

    if (hasUnreadTask) {
      interval = setInterval(() => {
        document.title =
          document.title === originalTitle ? '⚠️ Nova Tarefa!' : originalTitle
      }, 1000)
    } else {
      clearInterval(interval)
      document.title = originalTitle
    }

    return () => clearInterval(interval)
  }, [hasUnreadTask])

  if (error) return <div>Failed to load</div>
  if (!department || !departments) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  if (!department) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-muted-foreground">
      <div className="flex justify-center border-b-4 border-foreground bg-muted py-1 shadow-lg">
        <h1 className="text-3xl font-bold">Departamento: {department.name}</h1>
      </div>
      <div className="mb-3 flex border-b-4 border-foreground py-2 shadow-lg">
        <InputTask departments={departments} mutate={mutate} depId={id} />
      </div>
      <div className="flex justify-center">
        {department.tasks.length > 0 ? (
          <ul className="flex flex-col rounded-xl bg-muted p-3">
            {department.tasks.map((task: Task) => (
              <li
                key={task.id}
                className="w-[400px] sm:w-[600px] md:w-[700px] lg:w-[900px]"
              >
                <Cards task={task} mutate={mutate} />
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
