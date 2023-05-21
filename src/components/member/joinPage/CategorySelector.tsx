import { UserInfoErrProps } from '@/types/joinFormTypes';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import * as S from '@/components/stylecomponents/categorySelector.styles';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
// 해당부분 숨기기 기능 추가해서 하는걸로
// 아직 작업중

interface CategorySelector {
  handleUserInfo: Function;
}

const CategorySelector = (props: CategorySelector) => {
  const { handleUserInfo } = props;

  const [Checked, setChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { checked } = e.target;
    setSelectedItems([]);
    setChecked(checked);
  };

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
    // const ss: string[] = categoriesState.map((category) => category.name);
    setSelectList(categoriesState.map((category) => category.name));
  }, [categoriesState]);

  return (
    <S.CategorySelectorLayOut>
      <CheckBox>
        <FavoritesCheckBox
          type="checkbox"
          name="fovorites_Checked"
          id="fovorites_Checked"
          checked={Checked}
          onChange={handleCheckboxChange}
        />
        <CheckLabel htmlFor="fovorites_Checked">
          <span>[선택] 선호 카테고리</span>
        </CheckLabel>
      </CheckBox>
      {Checked ? (
        <S.SelectWraaper>
          {' '}
          <S.SelectBox>
            <h3>선택한 항목</h3>
            <S.CategoryList>
              {selectedItems.map((selectedItem) => (
                <S.CategoryItem key={selectedItem}>
                  <label htmlFor={selectedItem}>
                    <span>{selectedItem}</span>
                  </label>

                  <input
                    type="button"
                    id={selectedItem}
                    onClick={() => handleRemoveItem(selectedItem)}
                  />
                </S.CategoryItem>
              ))}
            </S.CategoryList>
          </S.SelectBox>
          <S.SelectBox>
            <h3>항목 리스트</h3>
            <S.CategoryList>
              {selectList.length > 0 &&
                selectList.map((item) => (
                  // 디지털이 2개임 이거는 찬휘님이랑, 태현님께 한번 여쭤보는걸로
                  <S.CategoryItem
                    key={item}
                    selected={selectedItems.includes(item)}
                  >
                    <label htmlFor={item}>
                      <span>
                        {item}
                        <AiOutlineClose />
                      </span>
                    </label>
                    <input
                      type="button"
                      id={item}
                      onClick={() => handleSelectItem(item)}
                    />
                  </S.CategoryItem>
                ))}
            </S.CategoryList>
          </S.SelectBox>{' '}
        </S.SelectWraaper>
      ) : (
        ''
      )}
    </S.CategorySelectorLayOut>
  );
};
// 여기 부분 displaynone을 넣는데  selectedItems.includes(item) 이거이용햐소

const CheckLabel = styled.label`
  display: flex;
  justify-content: space-between;
  > span {
    line-height: 2.5rem;
  }
`;

const FavoritesCheckBox = styled.input`
  zoom: 1.5;
  accent-color: ${({ theme }) => theme.color.BLACK};
`;

const CheckBox = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
`;

export default CategorySelector;
