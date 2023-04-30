import React, { useRef } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import CommonInput from '@/components/inputs/CommonInput';
import produce from 'immer';
import { useRecoilValue } from 'recoil';
import { categoriesState } from '@/atoms/categoriesState';
import { Dates, PriceState } from './createPage.interface';

interface CreateFormRightSectionProps {
  date: Dates;
  setDate: React.Dispatch<React.SetStateAction<Dates>>;
  priceState: PriceState;
  setPriceState: React.Dispatch<React.SetStateAction<PriceState>>;
  minPriceRef: React.RefObject<HTMLInputElement>;
}

const CreateFormRightSection = ({
  date,
  setDate,
  priceState,
  setPriceState,
  minPriceRef,
}: CreateFormRightSectionProps) => {
  const categories = useRecoilValue(categoriesState);

  const numCheck = (str: string) => {
    let check = /^\d*$/;
    return check.test(str);
  };

  const onChangeInitialPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numCheck(e.target.value) === false) {
      setPriceState(
        produce((draft) => {
          draft.initialPrice.isValid = false;
        })
      );
      return;
    }
    setPriceState(
      produce((draft) => {
        draft.initialPrice.value = Number(e.target.value);
        draft.initialPrice.isValid = true;
      })
    );
  };

  const onChangeMinPricePer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceState(
      produce((draft) => {
        draft.minPricePer.value = e.target.value;
      })
    );
  };

  const onChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numCheck(e.target.value) === false) {
      setPriceState(
        produce((draft) => {
          draft.minPrice.isValid = false;
        })
      );
      return;
    }
    setPriceState(
      produce((draft) => {
        draft.minPrice.value = Number(e.target.value);
        draft.minPrice.isValid = true;
      })
    );
  };

  return (
    <S.RightSide>
      <CommonInput type="text" id="name" name="name" label="상품명" />
      <label htmlFor="category">카테고리</label>
      <select name="category" id="category">
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <S.InputBox>
        <CommonInput
          type="date"
          label="시작날짜"
          value={date.start_date}
          onChange={(event) => {
            setDate(
              produce((draft) => {
                draft.start_date = event.target.value;
              })
            );
          }}
        />
        <CommonInput
          type="date"
          label="종료날짜"
          value={date.end_date}
          onChange={(event) => {
            setDate(
              produce((draft) => {
                draft.end_date = event.target.value;
              })
            );
          }}
        />
      </S.InputBox>
      <CommonInput
        type="text"
        id="start_price"
        name="start_price"
        value={priceState.initialPrice.value}
        placeholder="ex) 10000"
        onChange={onChangeInitialPrice}
        isValid={priceState.initialPrice.isValid}
        feedback="숫자만 입력 가능합니다."
        label="시작 가격"
      />
      <label htmlFor="minPricePer">최소 입찰 단위</label>
      <S.InputBox>
        <select
          // name="minPricePer"
          // id="minPricePer"
          value={priceState.minPricePer.value}
          onChange={onChangeMinPricePer}
        >
          <option value="0.05">5%</option>
          <option value="0.1">10%</option>
          <option value="0.15">15%</option>
          <option value="0.2">20%</option>
          <option value="직접 입력">직접 입력</option>
        </select>
        <CommonInput
          type="text"
          name="minPrice"
          id="minPrice"
          value={priceState.minPrice.value}
          onChange={onChangeMinPrice}
          ref={minPriceRef}
          disabled
        />
      </S.InputBox>
      <label htmlFor="product-description">상품 설명</label>
      <textarea
        name="product-description"
        id="product-description"
        cols={30}
        rows={10}
      ></textarea>
      <button>상품 등록</button>
    </S.RightSide>
  );
};
export default CreateFormRightSection;
