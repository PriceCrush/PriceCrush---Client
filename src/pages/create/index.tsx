import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Create = () => {
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [mainImg, setMainImg] = useState<Blob>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files as FileList);
    const imgArr = fileList.map((file, index) => {
      if (index === 0) {
        setMainImg(file);
      }
      return URL.createObjectURL(file);
    });
    setImgUrl(imgArr);
  };

  useEffect(() => {
    return () => {
      imgUrl.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [imgUrl]);

  return (
    <div>
      <h2>상품 등록</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" multiple onChange={onChangeFileInput} />
          {imgUrl.map((img) => (
            <Img key={img} src={img} />
          ))}
        </div>
        <div>
          <label htmlFor="name">상품명</label>
          <input type="text" id="name" />
          <select name="카테고리" id="category">
            <option value="신발">신발</option>
            <option value="의류">의류</option>
          </select>
          <label htmlFor="price">시작 가격</label>
          <input type="text" id="price" />
        </div>
      </form>
    </div>
  );
};

export default Create;
