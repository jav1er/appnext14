import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getPosts } from "@/actions/actions"
import { useSearchStore } from "@/lib/store"
import { useQueryClient, QueryClient } from "@tanstack/react-query"
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom"
import { CustomResponse, SearchParameters } from "@/interfaces/interfaces"

const formSchema = z.object({
  value: z
    .string()
    .min(1, {
      message: "Debe colocar mínimo 1 caracteres.",
    })
    .max(10, {
      message: "Debe colocar máximo 10 caracteres.",
    }),
})

export function SearchForm() {
  const queryClient: QueryClient = useQueryClient()
  const { fetchNextPage } = useInfiniteQueryCustom()
  const currentValue = useSearchStore(state => state.valueToFind)
  const updateValueToFind = useSearchStore(state => state.updateValueToFind)
  const updateResultFound = useSearchStore(state => state.updateResultFound)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: currentValue,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    queryClient.removeQueries({ queryKey: ["movies"] })
    updateValueToFind(values.value)

    let objectCustomParameters: SearchParameters = {
      query: values.value,
      include_adult: false,
      language: "en",
      page: 1,
    }

    const data: CustomResponse | any = await getPosts(objectCustomParameters)

    updateResultFound(data)
    fetchNextPage()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{`Busqueda Activa: ${currentValue}`}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese una película"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Buscar</Button>
      </form>
    </Form>
  )
}
