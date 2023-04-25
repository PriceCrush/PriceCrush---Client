import { UserInfoErrProps } from '@/types/joinFormTypes';
import React, { useEffect, useState } from 'react';

// 해당부분 숨기기 기능 추가해서 하는걸로
// 아직 작업중
const CategorySelector = (props: any) => {
  const { handleUserInfo } = props;
  const selectList = ['신발', '시계', '가구'];
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

  return (
    <>
      <h2>선택한 항목</h2>
      <ul>
        {selectedItems.map((selectedItem) => (
          <li key={selectedItem}>
            {selectedItem}{' '}
            <button onClick={() => handleRemoveItem(selectedItem)}>X</button>
          </li>
        ))}
      </ul>

      <h2>항목 리스트</h2>
      <ul>
        {selectList.map((item) => (
          <li key={item}>
            {item}{' '}
            <button
              disabled={selectedItems.includes(item)}
              onClick={() => handleSelectItem(item)}
            >
              선택
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategorySelector;
