import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { departmentId, description } = req.body

      // Verifica se o departamento existe
      const department = await prisma.department.findUnique({
        where: { id: Number(departmentId) },
      })

      if (!department) {
        return res.status(404).json({ message: 'Department not found' })
      }

      // Cria uma nova task associada ao departamento
      const newTask = await prisma.task.create({
        data: {
          description,
          Department: {
            connect: { id: Number(departmentId) },
          },
        },
      })

      return res.status(201).json(newTask)
    } catch (error) {
      console.error('Erro ao criar a task:', error)
      return res.status(500).json({ message: 'Erro ao criar a task' })
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' })
  }
}
