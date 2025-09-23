export type TApi_Params_PDF = {
  pdfs: {
    getOrderPdf: { orderId: string; forAdmin: boolean }
    getSlipPdf: {
      slipCode: string
      slipInstallment: number
      totalInstallments: number
      clientName: string
    }
  }
}
