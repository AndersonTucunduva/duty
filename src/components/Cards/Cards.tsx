'use client'

import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import ModalTask from '../Modal/ModalTask'

export interface Task {
  id: string
  description: string
  createdAt: Date
}

interface TaskProps {
  task: Task
  mutate: () => void
}

export default function Cards({ task, mutate }: TaskProps) {
  const date = new Date(task.createdAt)
  const formattedDate = date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const router = useRouter()

  const completeTask = async (id: string) => {
    const response = await fetch('/api/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        status: 'COMPLETED',
        finishedAt: new Date(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro na resposta da API:', errorData)
      throw new Error('Erro ao concluir a task')
    }

    router.refresh()
    mutate()
  }

  return (
    <div className="my-1 flex w-full items-center justify-between gap-5 rounded-[10px] border bg-foreground p-2 shadow-lg">
      <div>
        <h1 className="text-xl font-semibold text-background">
          {task.description}
        </h1>
        <p className="mt-1 font-extralight text-background">
          Lançado: {formattedDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ModalTask task={task} mutate={mutate} />
        <Button
          className="rounded hover:bg-muted-foreground"
          variant="outline"
          onClick={() => completeTask(task.id)}
        >
          <div className="text-foreground">
            <Play />
          </div>
        </Button>
      </div>
    </div>
  )
}
