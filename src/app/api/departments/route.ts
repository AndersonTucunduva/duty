import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const departments = await prisma.department.findMany({
    include: {
      tasks: {
        where: { status: 'NOT_STARTED' },
      },
    },
  })

  if (!departments) {
    return NextResponse.json(
      { message: 'No departments found' },
      { status: 404 },
    )
  }
  return NextResponse.json(departments)
}
