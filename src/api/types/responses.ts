export type TDefaultRes<T> =
  | {
      ok: false
      instructions?: TReqResponseInstructions
      error: {
        message: string
      }
    }
  | {
      ok: true
      data: T
    }

type TReqResponseInstructions = {
  loginRedirect?: boolean
}

export type TDefaultList<T> = {
  totalElements: number
  totalPages: number
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  first: boolean
  last: boolean
  size: number
  content: T[]
  number: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  numberOfElements: number
  empty: boolean
}
