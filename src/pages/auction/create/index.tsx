import React, { useState, useRef, useEffect } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import { FaCamera } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import CommonInput from '../../../components/inputs/CommonInput';
import produce from 'immer';
import { Api } from '@/utils/commonApi';
import axios from 'axios';
import { FormDataApi } from '@/utils/formDataApi';

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

const Create = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { changeModal, closeModal, openModal } = useModal();
  const minPriceRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<State>({
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

  const numCheck = (str: string) => {
    let check = /^\d*$/;
    return check.test(str);
  };

  const onChangeInitialPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numCheck(e.target.value) === false) {
      setState(
        produce((draft) => {
          draft.initialPrice.isValid = false;
        })
      );
      return;
    }
    setState(
      produce((draft) => {
        draft.initialPrice.value = Number(e.target.value);
        draft.initialPrice.isValid = true;
      })
    );
  };

  const onChangeMinPricePer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(
      produce((draft) => {
        draft.minPricePer.value = e.target.value;
      })
    );
  };

  const onChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numCheck(e.target.value) === false) {
      setState(
        produce((draft) => {
          draft.minPrice.isValid = false;
        })
      );
      return;
    }
    setState(
      produce((draft) => {
        draft.minPrice.value = Number(e.target.value);
        draft.minPrice.isValid = true;
      })
    );
  };

  useEffect(() => {
    let newMinPrice = 0;
    let isDisabled = true;

    if (state.initialPrice.value === undefined) return;

    if (state.minPricePer.value === '직접 입력') {
      isDisabled = false;
    } else {
      newMinPrice =
        state.initialPrice.value * parseFloat(state.minPricePer.value);
    }

    const input = minPriceRef.current;
    if (input) {
      input.disabled = isDisabled;
    }

    setState(
      produce((draft) => {
        draft.minPrice.value = newMinPrice;
      })
    );
  }, [state.initialPrice.value, state.minPricePer.value]);

  const [imageFiles, setImageFiles] = useState<{
    main: File | null;
    sub: File[];
    mainPreviewUrl: string | null;
    subPreviewUrl: string[];
  }>({
    main: null,
    sub: [],
    mainPreviewUrl: null,
    subPreviewUrl: [],
  });
  const [tempImageFiles, setTempImageFiles] = useState<File[]>([]);

  useEffect(() => {
    const mainFile = imageFiles.main ? [imageFiles.main] : [];
    const subFiles = imageFiles.sub ? imageFiles.sub : [];
    const newTempImageFiles = [...mainFile, ...subFiles];
    setTempImageFiles(newTempImageFiles);
  }, [imageFiles]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData); // {}
    const createproductRequest = JSON.stringify({
      name: 'My Cloth 0518',
      start_price: 100000,
      desc: 'Clothes',
      start_date: '2023-05-10',
      end_date: '2023-06-20',
      minBidPrice: '0.3',
      productCategory: 'f8ae854a-d8ae-486a-a9c4-d2b166c4a4d7',
    });
    formData.append('createproductRequest', createproductRequest);
    // useEffect에서 Files 관리
    formData.append('files', tempImageFiles as any);
    console.log(tempImageFiles);

    try {
      const response = await FormDataApi.post('/product', formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // formData.append('mainImg', imageFiles.main as File);
    // imageFiles.sub.forEach((file) => {
    //   formData.append('subImg', file);
    // });

    // const data = Object.fromEntries(formData);
    // console.log(data);
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

  return (
    <S.CreateFormContainer>
      <h2>상품 등록</h2>
      <S.Form onSubmit={onSubmit} encType="multipart/form-data" method="post">
        <S.LeftSide>
          <S.ImageUpload onClick={onClickFileUpload}>
            {!imageFiles.mainPreviewUrl ? (
              <>
                <FaCamera />
                <div>
                  <p>이미지를 등록해주세요</p>
                  <p>0 / 5</p>
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
                <img key={img} src={img} onClick={() => onClickImg(index)} />
              ))}
          </S.SubImageBox>
        </S.LeftSide>
        <S.RightSide>
          <CommonInput type="text" id="name" name="name" label="상품명" />
          <label htmlFor="category">카테고리</label>
          <select name="category" id="category">
            <option value="신발">신발</option>
            <option value="의류">의류</option>
          </select>
          <CommonInput
            type="text"
            id="price"
            name="price"
            value={state.initialPrice.value}
            placeholder="ex) 10000"
            onChange={onChangeInitialPrice}
            isValid={state.initialPrice.isValid}
            feedback="숫자만 입력 가능합니다."
            label="시작 가격"
          />
          <label htmlFor="minPricePer">최소 입찰 단위</label>
          <S.InputBox>
            <select
              // name="minPricePer"
              // id="minPricePer"
              value={state.minPricePer.value}
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
              value={state.minPrice.value}
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
      </S.Form>
    </S.CreateFormContainer>
  );
};

export default Create;
