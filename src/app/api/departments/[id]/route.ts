import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
    include: {
      tasks: {
        where: { status: 'NOT_STARTED' }, // Filtra apenas tasks com status "NOT_STARTED"
      },
    },
  })

  if (!department) {
    return NextResponse.json(
      { message: 'Department not found' },
      { status: 404 },
    )
  }

  return NextResponse.json(department)
}
