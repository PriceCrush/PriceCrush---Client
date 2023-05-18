import styled from 'styled-components';

type SubImageItemProps = {
  isOdd: boolean;
};

export const CreateFormContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 0 18vw;
  font-size: 1.6rem;
  input,
  select,
  textarea {
    margin-top: 10px;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSize.pageTitle};
    font-weight: 700;
    line-height: 1.6;
  }
  select {
    width: 100%;
    height: 50px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 200px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 10px;
    font-size: 1.6rem;
    margin-bottom: 10px;
    resize: none;
    &:focus {
      outline: none;
      border: 1px solid #000;
    }
  }
`;
export const ContentBox = styled.div`
  height: 600px;
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  margin: 40px auto 0 auto;
  justify-content: center;
  gap: 100px;
`;

export const LeftSide = styled.div`
  max-width: 300px;
  min-height: 700px;
`;
export const ImageUpload = styled.div`
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

export const SubImageBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

export const SubImageItem = styled.li<SubImageItemProps>`
  display: flex;
  justify-content: ${({ isOdd }) => (isOdd ? 'start' : 'end')};
  img {
    border-radius: 4px;
    width: 125px;
    height: 125px;
  }
`;

export const UploadPictureButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
export const UploadPictureButton = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 0px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #333;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 700px;
  label,
  p {
    font-weight: 550;
  }

  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 4px;
    background-color: #000;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      background-color: #333;
    }
  }
`;

export const InputBox = styled.div`
  display: flex;
  gap: 10px;
`;
