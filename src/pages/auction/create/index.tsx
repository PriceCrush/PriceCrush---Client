import React, { useState, useRef, useEffect } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import { FaCamera } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import CommonInput from '../../../components/inputs/CommonInput';
import produce from 'immer';
import { Api } from '@/utils/commonApi';
import styled from 'styled-components';
import ButtonBase from './../../../components/buttons/ButtonBase';
import ImageUploadForm from '@/components/auctionPage/create/ImageUploadForm';
import { useRecoilState } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import { productCategoryType } from '@/types/productsTypes';
import axios from 'axios';
import { getCookie } from 'cookies-next';

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

const Create = () => {
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

  const [imageFiles, setImageFiles] = useState<imageFilesProps>({
    main: null,
    sub: [],
    mainPreviewUrl: null,
    subPreviewUrl: [],
  });

  const [categoriesState, setCategoriesState] = useRecoilState(categoriesAtom);
  const [categoriesList, setCategoriesList] = useState<productCategoryType[]>(
    []
  );

  useEffect(() => {
    setCategoriesList(categoriesState);
  }, [categoriesState]);

  const { changeModal, closeModal, openModal } = useModal();

  const minPriceRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // formData.append('mainImg', imageFiles.main as File);
    // imageFiles.sub.forEach((file) => {
    //   formData.append('subImg', file);
    // });

    const formData = new FormData(event.currentTarget);

    const { startTime, closeTime } = startAndCloseTime();

    formData.append('start_date', startTime);
    formData.append('end_date', closeTime);
    //현재 storage에 있는 categoryState에 id를 사용
    // formData.append('productCategory', 'something');
    const data = JSON.stringify(Object.fromEntries(formData));
    //----------------------------
    //data폼은 맞췄음, file폼은 한번봐야함
    let files: any = [];
    files.push(imageFiles.main);
    imageFiles.sub.forEach((file) => {
      files.push(file);
    });

    console.log(data);
    console.log(files);
    const createproductRequest = JSON.stringify({
      name: 'YH테스트3 ',
      start_price: 10000,
      desc: '무수한 설명',
      start_date: '2023-05-17',
      end_date: '2023-05-20',
      productCategory: '9a69718d-6104-4392-aee2-00e5fdbf0416',
    });

    const createProductData = {
      createproductRequest,
      files,
    };

    const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    const ss_API_URL = `${serverBaseURL}product`;
    const accessToken = getCookie('accessToken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(`${ss_API_URL}`, createProductData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    //----------------------------------------------------------
    // const accessToken = getCookie('accessToken');
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };

    // try {
    //   const result = await Api.post('product', createProductData, config);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
    //----------------------------------------------------------
    //--------------------------------
    // {
    //   "name": "스포츠 용품",
    //   "start_price": 10000,
    //   "desc": "야구 글러브, 축구화, 배드민턴 라",
    //   "start_date": "2023-04-29",
    //   "end_date": "2023-05-28",
    //   "productCategory": "9a69718d-6104-4392-aee2-00e5fdbf0416"
    // }

    // try {
    //   const result = await Api.post('product', data);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }

    // try {
    //   const result = Api.post("")
    // } catch (error) {

    // }
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

  const showCurrentPictureNum = () => {
    let cnt = 0;
    if (imageFiles.main) {
      cnt = 1 + imageFiles.sub.length;
    }
    return cnt;
  };

  return (
    <S.CreateFormContainer>
      <h2>상품 등록</h2>
      <S.Form onSubmit={onSubmit} encType="multipart/form-data" method="post">
        <S.LeftSide>
          <div>
            <h3>등록된 사진수 </h3>
            <span>{showCurrentPictureNum()}/5</span>
          </div>
          <S.ImageUpload>
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
          <TestBox onClick={onClickFileUpload}>
            <ButtonBase>사진올리기</ButtonBase>
          </TestBox>
          <div>
            <ImageUploadForm />
          </div>
        </S.LeftSide>
        <S.RightSide>
          <CommonInput type="text" id="name" name="name" label="상품명" />
          <label htmlFor="category">카테고리</label>
          <select name="productCategory" id="category">
            {categoriesList &&
              categoriesList.map((categoryObject) => (
                <option key={categoryObject.id} value={categoryObject.id}>
                  {categoryObject.name}
                </option>
              ))}
            {/* <option value="신발">신발</option>
            <option value="의류">의류</option> */}
          </select>
          <CommonInput
            type="text"
            id="price"
            name="start_price"
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
            name="desc"
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

const MainImageBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  & > div {
    position: absolute;
    bottom: 0;
    font-size: 1.8rem;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    background-color: #e5e5e5;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

const TestBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 30px;
`;

export default Create;
