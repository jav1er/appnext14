/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Inter } from "next/font/google"
import { SearchForm } from "@/components/searchForm"
import { ResultsSection } from "@/components/resultsSection"
import { EmptySearch } from "@/components/emptySearch"
import { useEffect } from "react"
import { useQueryClient, QueryClient } from "@tanstack/react-query"
import { useSearchStore } from "@/lib/store"
import { CustomResponse } from "@/interfaces/interfaces"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const queryClient: QueryClient = useQueryClient()
  const currentValue: string = useSearchStore(state => state.valueToFind)
  const response: CustomResponse = useSearchStore(state => state.resultFound)

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["movies"] })
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <SearchForm />
      {currentValue && response.total_results ? <ResultsSection /> : <EmptySearch />}
    </main>
  )
}
