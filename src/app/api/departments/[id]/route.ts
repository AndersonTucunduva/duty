import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log('Params:', params)
  const { id } = params

  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
    include: { tasks: true },
  })

  if (!department) {
    console.log('Department not found')
    return NextResponse.json(
      { message: 'Department not found' },
      { status: 404 },
    )
  }

  console.log('Department found:', department)
  return NextResponse.json(department)
}
