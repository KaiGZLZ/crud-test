
interface Data {
    name: string
    value: number
    items: Data[]
  }

declare interface ListData {
    name: string
    value: number
  }

interface DataToSend {
    uuid: string
    sector: ListData
    sector2: ListData | undefined
    sector3: ListData | undefined
    sector4: ListData | undefined
  }


declare interface FormData  {
    name: string
    sectors: DataToSend[]
    aggee: boolean
  }

declare interface DataFinal {
    id: string
    data: FormData
}
