export interface IDose {
  id?: string
  email?: string
  timestamp?: number
  consumedInterval?: number
  name?: string
  type?: DOSE_TYPE
  createdAt?: Date
  updatedAt?: Date
}

export enum DOSE_TYPE {
  COFFEE = 'COFFEE',
  TEA = 'TEA',
  SODA = 'SODA',
  ENERGY_DRINK = 'ENERGY_DRINK',
  PREWORKOUT = 'PREWORKOUT',
  PILL = 'PILL',
  OTHER = 'OTHER',
}

// MARK: Operation-specific types

export interface IDoseCreate extends IDose {
  timestamp: number
  consumedInterval: number
  name: string
  type: DOSE_TYPE
}

export interface IDoseDelete extends IDose {
  id: string
  timestamp: number
}
