import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';

interface PostProps {
  address: string;
  zoneCode: string;
}

const handleAddress = (data: any) => {
  const { address, zonecode } = data;
  console.log(data);
  console.log(`우편 번호 : ${zonecode}`);
  console.log(`도로명 주소 : ${address}`);
};

const FindAddressConfirm = () => {
  const [post, setPost] = useState<PostProps>({
    address: '',
    zoneCode: '',
  });
  const { closeModal } = useModal();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    closeModal();
  };

  return (
    <PostcodeWrapper>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        style={{ width: '100%', height: '500px' }}
        autoClose
      />
      {/* <DaumPostcode
        onComplete={handleAddress}
        className="postcode-iframe"
        style={{ width: '100%', height: '466px' }}
        autoClose
      /> */}
    </PostcodeWrapper>
  );
};

const PostcodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default FindAddressConfirm;
