import 'styled-components'
import { Theme } from './portfolio/util/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
