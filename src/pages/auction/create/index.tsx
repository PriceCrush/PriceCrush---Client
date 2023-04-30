import React, { useState, useRef, useEffect } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import produce from 'immer';
import { Api } from '@/utils/commonApi';
import { useSetRecoilState } from 'recoil';
import { categoriesState } from '@/atoms/categoriesState';
import { productCategoriesType } from '@/types/productsTypes';
import CreateFormLeftSection from '@/components/createPage/CreateFormLeftSection';
import CreateFormRightSection from '@/components/createPage/CreateFormRightSection';
import {
  Dates,
  ImageFiles,
  PriceState,
} from '@/components/createPage/createPage.interface';

const Create = () => {
  const minPriceRef = useRef<HTMLInputElement>(null);
  const setCategories = useSetRecoilState(categoriesState);

  const [date, setDate] = useState<Dates>({
    start_date: '',
    end_date: '',
  });

  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    main: null,
    sub: [],
    mainPreviewUrl: null,
    subPreviewUrl: [],
  });
  const [priceState, setPriceState] = useState<PriceState>({
    initialPrice: {
      value: 0,
      isValid: true,
    },
    minPrice: {
      value: 0,
      isValid: true,
    },
    minPricePer: {
      value: '0.05',
    },
  });

  const formattingISODate = (date: string) => {
    return new Date(date).toISOString();
  };

  useEffect(() => {
    (async () => {
      const categories = await Api.get<productCategoriesType>(
        '/product-category'
      );
      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    let newMinPrice = 0;
    let isDisabled = true;
    if (priceState.initialPrice.value === undefined) return;

    if (priceState.minPricePer.value === '직접 입력') {
      isDisabled = false;
    } else {
      newMinPrice =
        priceState.initialPrice.value *
        parseFloat(priceState.minPricePer.value);
    }

    const input = minPriceRef.current;
    if (input) {
      input.disabled = isDisabled;
    }

    setPriceState(
      produce((draft) => {
        draft.minPrice.value = newMinPrice;
      })
    );
  }, [priceState.initialPrice.value, priceState.minPricePer.value]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    minPriceRef.current!.disabled = false;
    const formData = new FormData(event.currentTarget);
    formData.append('mainImg', imageFiles.main as File);
    imageFiles.sub.forEach((file) => {
      formData.append('subImg', file);
    });
    formData.append('start_date', formattingISODate(date.start_date));
    formData.append('end_date', formattingISODate(date.end_date));

    const data = Object.fromEntries(formData);

    try {
      const res = await Api.post('/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log('error: ', error);
    }

    minPriceRef.current!.disabled = true;
  };

  return (
    <S.CreateFormContainer>
      <h2>상품 등록</h2>
      <S.Form onSubmit={onSubmit}>
        <CreateFormLeftSection
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
        <CreateFormRightSection
          priceState={priceState}
          setPriceState={setPriceState}
          date={date}
          minPriceRef={minPriceRef}
          setDate={setDate}
        />
      </S.Form>
    </S.CreateFormContainer>
  );
};

export default Create;
