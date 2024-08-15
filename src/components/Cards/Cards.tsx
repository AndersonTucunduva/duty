'use client'

import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import ModalTask from '../Modal/ModalTask'

interface DepProps {
  id: number
  name: string
}

export interface Task {
  id: string
  description: string
  createdAt: Date
  RequestedByDepartment?: DepProps
  isRead: boolean
}

interface TaskProps {
  task: Task
  mutate: () => void
}

export default function Cards({ task, mutate }: TaskProps) {
  const date = new Date(task.createdAt)
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
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
      <div className="flex flex-col justify-end gap-1">
        <p className="text-muted">
          <p>Pedido por: {task.RequestedByDepartment?.name || 'N/A'}</p>
        </p>
        <div className="flex items-end justify-end gap-2">
          <ModalTask task={task} mutate={mutate} />
          <Button
            className="h-7 w-8 rounded hover:bg-muted-foreground md:h-10 md:w-10"
            variant="outline"
            onClick={() => completeTask(task.id)}
          >
            <div className="text-foreground">
              <Play />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
