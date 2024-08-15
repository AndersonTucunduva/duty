'use client'

import { Task } from '@/components/Cards/Cards'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const departmentsFetcher = async () => {
  const res = await fetch('/api/departments')
  return res.json()
}

export function useDepartmentData(id: string) {
  const {
    data: department,
    error,
    mutate,
  } = useSWR(`/api/departments/${id}`, fetcher, {
    refreshInterval: 15000, // Intervalo de atualização
    revalidateOnFocus: false, // Não revalida ao focar a aba
    revalidateOnReconnect: true, // Revalida ao reconectar
    isPaused: () => false, // Nunca pausa a validação
    refreshWhenHidden: true,
  })
  const { data: departments } = useSWR('/api/departments', departmentsFetcher)

  const hasUnreadTask = department?.tasks.some((task: Task) => !task.isRead)

  return {
    department,
    departments,
    error,
    mutate,
    hasUnreadTask,
  }
}
