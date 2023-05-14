import { UserInfoErrProps } from '@/types/joinFormTypes';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import styled from 'styled-components';

// 해당부분 숨기기 기능 추가해서 하는걸로
// 아직 작업중

interface CategorySelector {
  handleUserInfo: Function;
}

const CategorySelector = (props: CategorySelector) => {
  const { handleUserInfo } = props;
  const [categoriesState, setCategoriesState] = useRecoilState(categoriesAtom);

  const [selectList, setSelectList] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item)
    );
  };

  useEffect(() => {
    handleUserInfo((prev: UserInfoErrProps) => ({
      ...prev,
      favorites: selectedItems,
    }));
  }, [selectedItems]);

  useEffect(() => {
    const ss: string[] = categoriesState.map((category) => category.name);
    setSelectList(ss);
  }, [categoriesState]);

  return (
    <>
      <h2>선택한 항목</h2>
      <ul>
        {selectedItems.map((selectedItem) => (
          <li key={selectedItem}>
            {selectedItem}
            <button onClick={() => handleRemoveItem(selectedItem)}>X</button>
          </li>
        ))}
      </ul>

      <h2>항목 리스트</h2>
      <ul>
        {selectList.length > 0 &&
          selectList.map((item) => (
            // 디지털이 2개임 이거는 찬휘님이랑, 태현님께 한번 여쭤보는걸로
            <CategoryItem key={item}>
              <label htmlFor={item}>{item}</label>
              <button
                id={item}
                disabled={selectedItems.includes(item)}
                onClick={() => handleSelectItem(item)}
              >
                선택
              </button>
            </CategoryItem>
          ))}
      </ul>
    </>
  );
};
// 여기 부분 displaynone을 넣는데  selectedItems.includes(item) 이거이용햐소
const CategoryItem = styled.li`
  display: inline-flex;
  align-items: center;
  margin: 8px 8px 0 0;
  padding: 4px 2px 4px 10px;
  background-color: ${({ theme }) => theme.color.LIGHT_GRAY};
  /* background-color: #f4f4f4; */
  border-radius: 6px;

  > button {
    display: none;
  }
`;

export default CategorySelector;
