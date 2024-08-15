// src/app/api/reports/tasks/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { date } = await req.json()

    // Converte a data para o formato YYYY-MM-DD para comparar com o campo `finishedAt`
    const startOfDay = new Date(date)
    startOfDay.setUTCHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setUTCHours(23, 59, 59, 999)

    // Consulta no Prisma para buscar as tarefas com `finishedAt` no dia selecionado
    const tasks = await prisma.task.findMany({
      where: {
        finishedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        Department: true, // Inclui informações do departamento relacionado à tarefa
        RequestedByDepartment: {
          // Inclui informações do departamento que fez o pedido
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.error()
  }
}
