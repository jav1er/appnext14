"use client"

import { useSearchStore } from "@/lib/store"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPosts } from "@/actions/actions"
import { SearchParameters, CustomResponse } from "@/interfaces/interfaces"

export default function useInfiniteQueryCustom() {
  const currentValue: string = useSearchStore(state => state.valueToFind)

  let objectCustomParameters: SearchParameters = {
    query: currentValue,
    include_adult: false,
    language: "en",
    page: 1,
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: async ({ pageParam }) => {
      if (pageParam.query) {
        const data:CustomResponse | any = await getPosts(pageParam)
        return data.results
      } else {
        return []
      }
    },
    initialPageParam: objectCustomParameters,
    getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage, pages) => ({
      ...objectCustomParameters,
      page: pages.length + 1,
    }),
  })

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  }
}
