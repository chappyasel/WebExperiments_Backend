export enum DOSE_TYPE {
  COFFEE = 'COFFEE',
  TEA = 'TEA',
  SODA = 'SODA',
  ENERGY_DRINK = 'ENERGY_DRINK',
  PREWORKOUT = 'PREWORKOUT',
  PILL = 'PILL',
  OTHER = 'OTHER',
}

export interface ICreateDose {
  email?: string
  timestamp?: number
  consumedInterval?: number
  name?: string
  type?: DOSE_TYPE
}
