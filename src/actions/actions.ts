"use server"

import {
  SearchParameters,
  CustomResponse,
  RequestOptions,
  SearchParamsFormat,
} from "@/interfaces/interfaces"

export async function getPosts(params: SearchParameters) {
  const searchParams: Record<string, string> = {
    query: params.query,
    include_adult: String(params.include_adult),
    language: params.language,
    page: String(params.page),
  }

  const searchParamsFormat: SearchParamsFormat = new URLSearchParams(
    searchParams,
  )
  const options: RequestOptions = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRhOTY0ZWIxNjc0ZTljY2RkMWY4NDA2NjI2ZDM0NSIsInN1YiI6IjY1YjA1NjFiYTE0YmVmMDEwYmZhOTM3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vReJPAL4OUoqzRBRcHolsCd7TrO99b3JJ8gEe_9-fC0",
    },
  }
  const url: string = "https://api.themoviedb.org/3/search/movie"

  try {
    const response: Response = await fetch(
      `${url}?${searchParamsFormat}`,
      options,
    )
    const postsObject: CustomResponse = await response.json()
    return postsObject
  } catch (error) {
    //console.log(error);
  }
}
