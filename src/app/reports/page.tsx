'use client'

import { useState, useEffect } from 'react'
import CalendarForm from './Calendar'
import { format, parseISO } from 'date-fns'

export default function ReportsAll() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    if (selectedDate) {
      const fetchTasks = async () => {
        const res = await fetch('/api/reports/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: selectedDate.toISOString() }),
        })

        if (!res.ok) {
          throw new Error('Failed to fetch tasks')
        }

        const data = await res.json()
        console.log('Fetched tasks:', data)
        setTasks(data)
      }

      fetchTasks()
    }
  }, [selectedDate])

  return (
    <div className="min-h-screen bg-muted-foreground">
      <div className="p-3">
        <div className="flex justify-center gap-2">
          <div className="flex items-center">
            <p>Relatórios de Tarefas</p>
          </div>
          <div>
            <CalendarForm onDateSelect={setSelectedDate} />
          </div>
        </div>
        <div>
          {!tasks.length && (
            <p>Nenhuma tarefa encontrada para a data selecionada.</p>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="mt-2 grid grid-cols-7 gap-4 border p-4"
            >
              <div className="col-span-1">
                <p className="text-lg font-semibold">
                  Departamento:{' '}
                  {task.Department
                    ? task.Department.name
                    : 'Nome do departamento não disponível'}
                </p>
              </div>
              <div className="col-span-3">
                <p className="font-semibold">Descrição:</p>
                <p>{task.description}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Pedido por:</p>
                <p>
                  {task.RequestedByDepartment
                    ? task.RequestedByDepartment.name
                    : 'Não informado'}
                </p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Data de Criação:</p>
                <p>
                  {task.createdAt
                    ? format(parseISO(task.createdAt), 'dd/MM/yyyy HH:mm')
                    : 'Data não disponível'}
                </p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Data de Conclusão:</p>
                <p>
                  {task.finishedAt
                    ? format(parseISO(task.finishedAt), 'dd/MM/yyyy HH:mm')
                    : 'Data não disponível'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
