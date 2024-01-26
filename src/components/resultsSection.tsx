"use client"
import Image from "next/image"
import * as React from "react"
import { useInView } from "react-intersection-observer"
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom"
import { Movie } from "@/interfaces/interfaces"
export function ResultsSection() {
  const { ref, inView } = useInView()
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQueryCustom()

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <>
      <div className="p-4 grid gap-10 grid-cols-4">
        {status === "pending" ? (
          <p>Cargando...</p>
        ) : status === "error" ? (
          <span>Error: {error?.message}</span>
        ) : (
          <>
            {data?.pages.map(page => (
              <React.Fragment key={page.nextId}>
                {page?.map((movie: Movie) => (
                  <div key={movie.id}>
                    <div className="text-sm text-center font-semibold">
                      <Image
                        src={
                          "https://media.themoviedb.org/t/p/w220_and_h330_face" +
                          movie.backdrop_path
                        }
                        className="h-64 w-40 rounded-lg mx-auto"
                        alt="No se pudo cargar"
                        width={500}
                        height={500}
                      />
                      <div className="text-sm text-center font-semibold mt-3">
                        {movie.title}
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      <div>
        {data && (
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Cargando..."
              : hasNextPage
              ? "Cargar nuevos"
              : "No hay resultados"}
          </button>
        )}
      </div>
    </>
  )
}
