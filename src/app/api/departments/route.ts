import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const departments = await prisma.department.findMany({
    include: {
      tasks: {
        where: { status: 'NOT_STARTED' },
        include: {
          RequestedByDepartment: true,
        },
      },
    },
  })

  if (!departments) {
    return NextResponse.json(
      { message: 'No departments found' },
      { status: 404 },
    )
  }

  return NextResponse.json(departments, {
    // Define o tempo de revalidação em segundos
    revalidate: 60, // revalida a cada 60 segundos
  })
}
