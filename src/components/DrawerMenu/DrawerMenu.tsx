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

export function DrawerMenu() {
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
          <SheetClose asChild>
            <Link
              href="/departments/1"
              className="text-foreground hover:text-muted-foreground"
            >
              Fritura
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/departments/2"
              className="text-foreground hover:text-muted-foreground"
            >
              Assado
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/departments/3"
              className="text-foreground hover:text-muted-foreground"
            >
              Bolo
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/departments/4"
              className="text-foreground hover:text-muted-foreground"
            >
              Administração
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/departments/5"
              className="text-foreground hover:text-muted-foreground"
            >
              Balcão
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
