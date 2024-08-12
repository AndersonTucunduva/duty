'use client'

import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface TaskProps {
  id: string
  description: string
  createdAt: Date
}

export default function Cards({ id, description, createdAt }: TaskProps) {
  const formattedDate = createdAt.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const router = useRouter()
  const completeTask = async (id: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'COMPLETED' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erro na resposta da API:', errorData)
        throw new Error('Erro ao concluir a task')
      }

      // Refresh para atualizar a UI
      router.refresh()
    } catch (error) {
      console.error('Erro ao concluir a task:', error)
    }
  }

  return (
    <div className="my-1 flex max-w-4xl items-center justify-between gap-5 rounded-[10px] border bg-foreground p-3 shadow-lg">
      <div>
        <h1 className="text-xl font-semibold text-background">{description}</h1>
        <p className="mt-1 font-extralight text-background">
          Lançado: {formattedDate}
        </p>
      </div>
      <Button className="rounded" variant="default">
        <div className="text-foreground">
          <Play onClick={() => completeTask(id)} />
        </div>
      </Button>
    </div>
  )
}
