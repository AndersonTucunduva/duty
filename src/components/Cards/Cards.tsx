import { Play } from 'lucide-react'
import { Button } from '../ui/button'

interface TaskProps {
  description: string
  createdAt: Date
}

export default function Cards({ description, createdAt }: TaskProps) {
  const formattedDate = createdAt.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="my-2 flex max-w-xl items-center justify-between gap-5 rounded-[10px] border bg-foreground p-3 shadow-lg">
      <div>
        <h1 className="text-xl font-semibold text-background">{description}</h1>
        <p className="mt-2 font-extralight text-background">
          Lançado: {formattedDate}
        </p>
      </div>
      <Button className="rounded">
        <div className="text-foreground">
          <Play />
        </div>
      </Button>
    </div>
  )
}
