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

  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
    include: { tasks: true },
  })

  const departments = await prisma.department.findMany()

  if (!department) {
    return notFound()
  }
  console.log(departments)
  return (
    <div className="min-h-screen bg-custom-gradient p-3">
      <div className="flex justify-center border-b-4 border-foreground py-2 shadow-lg">
        <h1 className="text-3xl font-bold">Departamento: {department.name}</h1>
      </div>
      <div className="mb-3 flex justify-start border-b-4 border-foreground py-2 shadow-lg">
        <InputTask departments={departments} />
      </div>
      <div>
        {department.tasks.length > 0 ? (
          <ul className="grid auto-rows-max grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {department.tasks.map((task) => (
              <li key={task.id}>
                <Cards
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
