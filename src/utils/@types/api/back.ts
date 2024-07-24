export type TBackResponse =
  | {
      success: true
      data: any
    }
  | {
      success: false
      error: {
        message: string
      }
    }
