import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Edit } from 'lucide-react'
import { Task } from '../Cards/Cards'

interface TaskProps {
  task: Task
  mutate: () => void
}

export default function ModalTask({ task, mutate }: TaskProps) {
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [isOpen, setIsOpen] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value)
  }

  const editTaskDescription = async (id: string, description: string) => {
    const response = await fetch('/api/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        description,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro na resposta da API:', errorData)
      throw new Error('Erro ao atualizar a descrição da task')
    }
  }

  const handleSave = async () => {
    await editTaskDescription(task.id, taskDescription)
    console.log('MUTATE', mutate)
    mutate()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-muted-foreground">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 bg-muted sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex items-center py-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Label htmlFor="name">Tarefa</Label>
            <Input
              id="name"
              value={taskDescription}
              onChange={handleInputChange}
              className="min-w-[270px] sm:min-w-80 md:min-w-[570px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="flex gap-2 rounded bg-muted-foreground hover:bg-gray-400"
            type="submit"
            variant="outline"
            onClick={handleSave}
          >
            Salvar
            <Check width={20} height={20} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
