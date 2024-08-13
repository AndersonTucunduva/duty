'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DepProps {
  id: number
  name: string
}

export function DrawerMenu() {
  const [departments, setDepartments] = useState<DepProps[]>([])

  useEffect(() => {
    async function fetchDepartments() {
      const res = await fetch('/api/departments')
      if (res.ok) {
        const data = await res.json()
        setDepartments(data)
      } else {
        console.error('Failed to fetch departments')
      }
    }

    fetchDepartments()
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild className="flex">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="p-2 hover:bg-muted-foreground">
            <LayoutGrid />
          </Button>
          <p className="ml-3 text-xl font-bold">Duty Maker</p>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-muted">
        <SheetHeader>
          <SheetTitle className="mt-8 text-2xl">Departamentos</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-4">
          {departments.map((department) => (
            <SheetClose asChild key={department.id}>
              <Link
                href={`/departments/${department.id}`}
                className="text-foreground hover:text-muted-foreground"
              >
                {department.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
