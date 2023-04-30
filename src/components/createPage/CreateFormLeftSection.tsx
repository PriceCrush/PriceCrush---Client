import React, { useRef } from 'react';
import * as S from '@/components/stylecomponents/create.style';
import { FaCamera } from 'react-icons/fa';
import { ImageFiles } from './createPage.interface';

interface CreateFormLeftSectionProps {
  imageFiles: ImageFiles;
  setImageFiles: React.Dispatch<React.SetStateAction<ImageFiles>>;
}

const CreateFormLeftSection = ({
  imageFiles,
  setImageFiles,
}: CreateFormLeftSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  );
};
export default CreateFormLeftSection;
