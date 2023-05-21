import React, { useState, useRef, useEffect } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import { FaCamera } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import CommonInput from '../../../components/inputs/CommonInput';
import produce from 'immer';
import { Api } from '@/utils/commonApi';
import axios from 'axios';
import { FormDataApi } from '@/utils/formDataApi';
import { useRecoilState } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import { productCategoryType } from '@/types/productsTypes';
import ButtonBase from '@/components/buttons/ButtonBase';
import ImageUploadForm from '@/components/auctionPage/create/ImageUploadForm';
import styled from 'styled-components';
import RegistrationConfirmation from '@/components/auctionPage/create/RegistrationConfirmation';

interface State {
  initialPrice: {
    value: number | undefined;
    isValid: boolean;
  };
  minPrice: {
    value: number | undefined;
    isValid: boolean;
  };
  minPricePer: {
    value: string;
  };
}

interface imageFilesProps {
  main: File | null;
  sub: File[];
  mainPreviewUrl: string | null;
  subPreviewUrl: string[];
}

const startAndCloseTime = () => {
  // 현재 시간
  const startTime = new Date();

  // 현재 시간으로부터 3일 후의 시간 계산
  const closeTime = new Date(startTime);
  closeTime.setDate(startTime.getDate() + 3);

  // 24시로 설정
  startTime.setHours(0, 0, 0, 0);
  closeTime.setHours(24, 0, 0, 0);
  const formattedCurrentTime = startTime.toISOString().slice(0, 10);
  const formattedThreeDaysLater = closeTime.toISOString().slice(0, 10);
  return {
    startTime: formattedCurrentTime,
    closeTime: formattedThreeDaysLater,
  };
};

const numCheck = (str: string) => {
  let check = /^\d*$/;
  return check.test(str);
};

const Create = () => {
  const [priceState, setPriceState] = useState<State>({
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

  /**
   * @description categoryList
   */
  const [categoriesState, setCategoriesState] = useRecoilState(categoriesAtom);
  const [categoriesList, setCategoriesList] = useState<productCategoryType[]>(
    []
  );

  useEffect(() => {
    setCategoriesList(categoriesState);
  }, [categoriesState]);

  const [imageFiles, setImageFiles] = useState<imageFilesProps>({
    main: null,
    sub: [],
    mainPreviewUrl: null,
    subPreviewUrl: [],
  });

  const minPriceRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { openModal } = useModal();

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

  const onClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files as FileList);
    if (fileList.length > 5) {
      alert('최대 5개의 파일까지 등록 가능합니다.');
      return;
    }

    const imgArr = fileList.map((file) => {
      return URL.createObjectURL(file);
    });

    setImageFiles((prev) => ({
      ...prev,
      main: fileList[0],
      sub: fileList.slice(1),
      mainPreviewUrl: imgArr[0],
      subPreviewUrl: imgArr.slice(1),
    }));
  };

  const onClickImg = (index: number) => {
    setImageFiles((prev) => ({
      ...prev,
      main: prev.sub[index],
      sub: [...prev.sub.filter((_, i) => i !== index), prev.main] as File[],
      mainPreviewUrl: prev.subPreviewUrl[index],
      subPreviewUrl: [
        ...prev.subPreviewUrl.filter((_, i) => i !== index),
        prev.mainPreviewUrl as string,
      ],
    }));
  };

  const showCurrentPictureNum = () => {
    let cnt = 0;
    if (imageFiles.main) {
      cnt = 1 + imageFiles.sub.length;
    }
    return cnt;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name, desc, minBidPrice, productCategory, start_price } =
      Object.fromEntries(formData);
    const { startTime, closeTime } = startAndCloseTime();

    const productData = new FormData();
    const createproductRequest = JSON.stringify({
      name: name,
      start_price: start_price,
      desc: desc,
      start_date: startTime,
      end_date: closeTime,
      minBidPrice: minBidPrice,
      productCategory: productCategory,
    });

    const mainFile = imageFiles.main ? [imageFiles.main] : [];
    const subFiles = imageFiles.sub ? imageFiles.sub : [];
    const newTempImageFiles = [...mainFile, ...subFiles];

    // // useEffect에서 Files 관리

    productData.append('createproductRequest', createproductRequest);
    productData.append('files', newTempImageFiles as any);
    openModal({
      content: <RegistrationConfirmation productData={productData} />,
    });
  };

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

  return (
    <S.CreateFormContainer>
      <h2>상품 등록</h2>
      <S.Form onSubmit={onSubmit} encType="multipart/form-data" method="post">
        <S.LeftSide>
          <S.ContentBox>
            <S.ImageUpload onClick={onClickFileUpload}>
              {!imageFiles.mainPreviewUrl ? (
                <>
                  <FaCamera />
                  <div>
                    <p>이미지를 등록해주세요</p>
                  </div>
                </>
              ) : (
                <img src={imageFiles.mainPreviewUrl} alt="" />
              )}
            </S.ImageUpload>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onChangeFileInput}
              ref={fileInputRef}
            />
            <S.SubImageBox>
              {imageFiles.subPreviewUrl.length >= 1 &&
                imageFiles.subPreviewUrl.map((img, index) => (
                  <S.SubImageItem key={img} isOdd={index % 2 === 0}>
                    <img src={img} onClick={() => onClickImg(index)} />
                  </S.SubImageItem>
                ))}
            </S.SubImageBox>
          </S.ContentBox>

          <S.UploadPictureButtonBox onClick={onClickFileUpload}>
            <S.UploadPictureButton
              type="button"
              value={
                imageFiles.subPreviewUrl.length >= 1
                  ? `등록된 사진수 ${showCurrentPictureNum()}/5`
                  : '사진올리기'
              }
            />
          </S.UploadPictureButtonBox>
        </S.LeftSide>
        <S.RightSide>
          <S.ContentBox>
            <CommonInput type="text" id="name" name="name" label="상품명" />
            <label htmlFor="category">카테고리</label>
            <select name="productCategory" id="category">
              {categoriesList &&
                categoriesList.map((categoryObject) => (
                  <option key={categoryObject.id} value={categoryObject.id}>
                    {categoryObject.name}
                  </option>
                ))}
            </select>
            <CommonInput
              type="text"
              id="price"
              name="start_price"
              value={priceState.initialPrice.value}
              placeholder="ex) 10000"
              onChange={onChangeInitialPrice}
              isValid={priceState.initialPrice.isValid}
              feedback="숫자만 입력 가능합니다."
              label="시작 가격"
            />
            <label htmlFor="minBidPrice">최소 입찰 단위</label>
            <S.InputBox>
              <select
                name="minBidPrice"
                id="minBidPrice"
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
            <label htmlFor="desc">상품 설명</label>
            {/* textArea 위의 label의 경우 띄어씌기를 하면 space-between을 한것과 같이 서로 끝과 끝에 가서 div를 붙임 */}
            <div>
              <textarea name="desc" id="desc" cols={30} rows={10}></textarea>
            </div>
          </S.ContentBox>
          <button>상품 등록</button>
        </S.RightSide>
      </S.Form>
    </S.CreateFormContainer>
  );
};

export default Create;
