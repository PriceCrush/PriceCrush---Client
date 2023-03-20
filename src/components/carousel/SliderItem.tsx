import styled from 'styled-components';
import COLOR from '@/colors/color';

const Div = styled.div`
  width: 300px;
  height: 300px;
  text-align: center;
  background-color: ${COLOR.ORANGE};
  display: inline-block;
  margin: 0 auto;
`;

const SliderItem = ({ test }: { test: string }) => {
  return <Div>{test}</Div>;
};
export default SliderItem;
