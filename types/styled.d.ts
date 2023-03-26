import { themeProp } from '@/components/stylecomponents/theme';

/**
 * styled-components 가 theme 의 type을 추론할 수 없어서
 * 해당 코드를 추가하여 타입 추론을 할 수 있게 해줌
 */
declare module 'styled-components' {
  export interface DefaultTheme extends themeProp {}
}
