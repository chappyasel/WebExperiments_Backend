import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
} from '@typedorm/common'

import { IDose, DOSE_TYPE } from '@shared/caffiene'

@Entity({
  name: 'Dose',
  primaryKey: {
    partitionKey: 'EMAIL.{{email}}',
    sortKey: 'TIMESTAMP.{{timestamp}}',
  },
})
export class Dose implements IDose {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id!: string

  @Attribute()
  email!: string

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  timestamp!: number

  @Attribute({
    default: 600, // consumed over 10 minutes
  })
  consumedInterval!: number

  @Attribute({
    default: 'Untitled',
  })
  name!: string

  @Attribute({
    isEnum: true,
    default: DOSE_TYPE.OTHER,
  })
  type!: DOSE_TYPE

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
  })
  createdAt!: Date

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
    autoUpdate: true,
  })
  updatedAt!: Date
}
