import { Table } from '@typedorm/common'
import { createConnection, getEntityManager } from '@typedorm/core'

import { Dose } from './entities/Dose'
import { ICreateDose } from '@shared/caffiene'

export { Dose } from './entities/Dose'
export { ICreateDose, DOSE_TYPE } from '@shared/caffiene'

const doseTable = new Table({
  name: 'webexperiments-caffiene',
  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {},
})

createConnection({
  table: doseTable,
  entities: [Dose],
})

const entityManager = getEntityManager()

export class DB {
  static async get(email: string) {
    return await entityManager.find<Dose>(Dose, `EMAIL.${email}`).then(res => res.items)
  }

  static async create(dose: ICreateDose) {
    const doseEntity = new Dose()
    if (dose.email) {
      doseEntity.email = dose.email
    }
    if (dose.timestamp) {
      doseEntity.timestamp = dose.timestamp
    }
    if (dose.consumedInterval) {
      doseEntity.consumedInterval = dose.consumedInterval
    }
    if (dose.name) {
      doseEntity.name = dose.name
    }
    if (dose.type) {
      doseEntity.type = dose.type
    }
    return await entityManager.create<Dose>(doseEntity)
  }
}
