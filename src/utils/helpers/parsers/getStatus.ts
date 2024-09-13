import { statusRelations } from "../../sys/status"

type TFrom = keyof typeof statusRelations
type TSts = any

// @ts-ignore
export const getStatus = (from: TFrom, sts: TSts) => statusRelations[from][sts]
