export type TApi_Params_Payments = {
  payments: {
    generateOrderPayment: { orderId: string; shippingCost: number }
  }
}
