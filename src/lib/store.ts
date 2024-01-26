import { CustomResponse } from "@/interfaces/interfaces"
import { type StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  valueToFind: string
  resultFound: CustomResponse
}

type Action = {
  updateValueToFind: (valueToFind: State["valueToFind"]) => void
  updateResultFound: (resultFound: State["resultFound"]) => void
}

const storeApi: StateCreator<State & Action> = (set, get) => ({
  valueToFind: "",
  resultFound: { page: 0, results: [], total_pages: 0, total_results: 0 },
  updateValueToFind: valueToFind => set(() => ({ valueToFind: valueToFind })),
  updateResultFound: resultFound => set(() => ({ resultFound: resultFound })),
})

export const useSearchStore = create<State & Action>()(
  persist(storeApi, { name: "store" }),
)
