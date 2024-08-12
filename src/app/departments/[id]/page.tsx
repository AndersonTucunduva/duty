import Cards from '@/components/Cards/Cards'
import InputTask from '@/components/InputTask/InputTask'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export async function generateStaticParams() {
  const departments = await prisma.department.findMany()
  return departments.map((department) => ({ id: department.id.toString() }))
}

export default async function DepartmentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Filtro de tasks com status "NOT_STARTED"
  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
    include: {
      tasks: {
        where: { status: 'NOT_STARTED' }, // Filtro aplicado aqui
      },
    },
  })

  const departments = await prisma.department.findMany()

  if (!department) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-custom-gradient p-3">
      <div className="flex justify-center border-b-4 border-foreground py-2 shadow-lg">
        <h1 className="text-3xl font-bold">Departamento: {department.name}</h1>
      </div>
      <div className="mb-3 flex border-b-4 border-foreground py-2 shadow-lg">
        <InputTask departments={departments} />
      </div>
      <div className="flex justify-center">
        {department.tasks.length > 0 ? (
          <ul className="flex flex-col">
            {department.tasks.map((task) => (
              <li key={task.id}>
                <Cards
                  id={task.id}
                  description={task.description}
                  createdAt={task.createdAt}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há tarefas associadas a este departamento.</p>
        )}
      </div>
    </div>
  )
}
