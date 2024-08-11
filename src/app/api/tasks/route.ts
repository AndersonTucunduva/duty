import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { departmentId, description } = await req.json()

    const department = await prisma.department.findUnique({
      where: { id: Number(departmentId) },
    })
    console.log('Department:', department, 'DATA:', req)
    if (!department) {
      return NextResponse.json(
        { message: 'Department not found' },
        { status: 404 },
      )
    }

    const newTask = await prisma.task.create({
      data: {
        description,
        Department: {
          connect: { id: Number(departmentId) },
        },
      },
    })

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar a task:', error)
    return NextResponse.json(
      { message: 'Erro ao criar a task' },
      { status: 500 },
    )
  }
}
