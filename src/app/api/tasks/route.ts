import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { departmentId, description, requestedByDepartmentId } =
      await req.json()

    const department = await prisma.department.findUnique({
      where: { id: Number(departmentId) },
    })
    if (!department) {
      return NextResponse.json(
        { message: 'Department not found' },
        { status: 404 },
      )
    }

    const newTask = await prisma.task.create({
      data: {
        description,
        departmentId: Number(departmentId),
        requestedByDepartmentId: Number(requestedByDepartmentId),
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

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, finishedAt, description } = await req.json()

    if (status && finishedAt) {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          status,
          finishedAt: new Date(finishedAt),
        },
      })

      return NextResponse.json(updatedTask)
    }

    if (description) {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          description,
        },
      })

      return NextResponse.json(updatedTask)
    }

    return NextResponse.json(
      { message: 'No valid fields provided for update' },
      { status: 400 },
    )
  } catch (error) {
    console.error('Erro ao atualizar a task:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar a task' },
      { status: 500 },
    )
  }
}

// Nova função para atualizar o campo isRead
export async function PUT(req: NextRequest) {
  try {
    const { taskId, isRead } = await req.json()

    // Valida se o ID foi passado
    if (!taskId) {
      return NextResponse.json(
        { message: 'Task ID is required' },
        { status: 400 },
      )
    }

    // Atualiza a task com base no ID
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { isRead: isRead ?? true },
    })

    return NextResponse.json(updatedTask, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar a task:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar a task' },
      { status: 500 },
    )
  }
}
