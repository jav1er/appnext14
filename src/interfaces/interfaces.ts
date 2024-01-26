export interface CustomResponse {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchParameters {
  query: string
  include_adult: boolean
  language: string
  page: number
}

export interface RequestOptions {
  headers: {
    accept: string
    Authorization: string
  }
}

export interface SearchParamsFormat {
  toString(): string
  append(name: string, value: string): void
  delete(name: string): void
  entries(): IterableIterator<[string, string]>
  forEach(
    callback: (
      value: string,
      name: string,
      searchParams: URLSearchParams,
    ) => void,
  ): void
  get(name: string): string | null
  getAll(name: string): string[]
  has(name: string): boolean
  keys(): IterableIterator<string>
  set(name: string, value: string): void
  sort(): void
  values(): IterableIterator<string>
}


export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
