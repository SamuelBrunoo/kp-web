import { TDefaultRes } from "../../types/responses"

export type TApi_Responses_PDF = {
  pdfs: {
    getOrderPdf: Promise<TDefaultRes<any>>
    getSlipPdf: Promise<TDefaultRes<any>>
  }
}
