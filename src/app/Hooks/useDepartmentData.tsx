'use client'

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
  } = useSWR(`/api/departments/${id}`, fetcher, { refreshInterval: 10000 })
  const { data: departments } = useSWR('/api/departments', departmentsFetcher)

  return {
    department,
    departments,
    error,
    mutate,
  }
}
