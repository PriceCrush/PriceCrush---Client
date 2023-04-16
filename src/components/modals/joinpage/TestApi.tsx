import React, { useState } from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const TestApi = (props: any) => {
  const { company, setcompany } = props;

  const complete = (data: any) => {
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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    setcompany({
      ...company,
      address: fullAddress,
    });
  };

  return (
    <div>
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default TestApi;
