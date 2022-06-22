import { Table } from '@typedorm/common'
import { createConnection, getEntityManager } from '@typedorm/core'

import { Dose } from './entities/Dose'
import { IDose, IDoseCreate, IDoseDelete } from '@shared/caffiene'

export { Dose } from './entities/Dose'
export { IDose, DOSE_TYPE } from '@shared/caffiene'

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

  static async create(email: string, dose: IDoseCreate) {
    const doseEntity = new Dose()
    doseEntity.email = email
    doseEntity.timestamp = dose.timestamp
    doseEntity.consumedInterval = dose.consumedInterval
    doseEntity.name = dose.name
    doseEntity.type = dose.type
    return await entityManager.create<Dose>(doseEntity)
  }

  static async delete(email: string, dose: IDoseDelete) {
    return await entityManager.delete<Dose>(Dose, { email, ...dose })
  }
}
