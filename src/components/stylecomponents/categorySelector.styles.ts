import styled from 'styled-components';
interface CategoryItemProps {
  selected?: boolean | undefined;
}
export const CategoryItem = styled.li<CategoryItemProps>`
  display: ${({ selected }) => (selected ? 'none' : 'inline-flex')};
  align-items: center;
  margin: 8px 8px 0 0;
  padding: 4px 6px;
  background-color: ${({ theme }) => theme.color.LIGHT_GRAY};
  /* background-color: #f4f4f4; */
  border-radius: 6px;

  span {
    display: flex;
    color: ${({ theme }) => theme.color.BLACK};
    font-size: ${({ theme }) => theme.fontSize.sm};
    align-items: center;
    text-align: center;
  }

  > input {
    display: none;
  }
`;

export const SelectBox = styled.div`
  min-height: 100px;
`;

export const SelectWraaper = styled.div`
  margin: 10px 10px 20px 10px;
`;

export const CategorySelectorLayOut = styled.div`
  /* margin: 10px 10px 5px 10px; */
  padding-left: 15px;
  h3 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 450;
  }
`;

export const CategoryList = styled.ul`
  padding: 10px;
`;
