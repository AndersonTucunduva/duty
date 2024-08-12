'use client'

import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface TaskProps {
  id: string
  description: string
  createdAt: Date
  mutate: () => void
}

export default function Cards({
  id,
  description,
  createdAt,
  mutate,
}: TaskProps) {
  const date = new Date(createdAt)
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
    <div className="my-1 flex w-full items-center justify-between gap-5 rounded-[10px] border bg-foreground p-3 shadow-lg">
      <div>
        <h1 className="text-xl font-semibold text-background">{description}</h1>
        <p className="mt-1 font-extralight text-background">
          Lançado: {formattedDate}
        </p>
      </div>
      <Button className="rounded" variant="ghost">
        <div className="text-foreground">
          <Play onClick={() => completeTask(id)} />
        </div>
      </Button>
    </div>
  )
}
