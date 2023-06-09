import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userInfoAndCheckProps } from '@/types/memberTypes';

const TermForm = (props: userInfoAndCheckProps) => {
  const { handleUserInfo, passOrNot } = props;

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    agreement_use: false,
    agreement_mkt: false,
  });
  /**
   * @description name이 일치하는 체크박스 체크
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxStates({
      ...checkboxStates,
      [name]: checked,
    });
  };
  /**
   * @description 체크박스 전체 체크
   */
  const handleAllCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAllChecked(checked);
    setCheckboxStates({
      agreement_use: checked,
      agreement_mkt: checked,
    });
  };

  //모든 의존성 추가 시 무한루프
  useEffect(() => {
    handleUserInfo((prev: any) => ({
      ...prev,
      agreement_use: checkboxStates.agreement_use,
    }));
  }, [checkboxStates.agreement_use]);

  useEffect(() => {
    handleUserInfo((prev: any) => ({
      ...prev,
      agreement_mkt: checkboxStates.agreement_mkt,
    }));
  }, [checkboxStates.agreement_mkt]);

  useEffect(() => {
    passOrNot((prev: any) => ({
      ...prev,
      agreement_use: checkboxStates.agreement_use,
    }));
  }, [checkboxStates.agreement_use]);

  return (
    <div>
      <CheckBox>
        <Allterm>
          <TermCheckBox
            type="checkbox"
            name="allChecked"
            id="allChecked"
            checked={allChecked}
            onChange={handleAllCheckboxChange}
          />
          <CheckLabel htmlFor="allChecked">
            <span>전체동의</span>
          </CheckLabel>
        </Allterm>
        <TermsBox>
          <TermsList>
            <TermItem>
              <TermCheckBox
                name="agreement_use"
                id="agreement_use"
                type="checkbox"
                checked={checkboxStates.agreement_use}
                onChange={handleCheckboxChange}
              />
              <CheckLabel htmlFor="agreement_use">
                <span>[필수] 개인정보 수집 및 이용에 동의</span>
              </CheckLabel>
            </TermItem>
            <TermItem>
              <TermCheckBox
                type="checkbox"
                name="agreement_mkt"
                id="agreement_mkt"
                checked={checkboxStates.agreement_mkt}
                onChange={handleCheckboxChange}
              />
              <CheckLabel htmlFor="agreement_mkt">
                <span>[선택] 마케팅 정보 수신동의</span>
              </CheckLabel>
            </TermItem>
          </TermsList>
        </TermsBox>
      </CheckBox>
    </div>
  );
};

const CheckLabel = styled.label`
  display: flex;
  justify-content: space-between;
  > span {
    line-height: 2.5rem;
  }
`;

const TermCheckBox = styled.input`
  zoom: 1.5;
  accent-color: ${({ theme }) => theme.color.BLACK};
`;

const TermItem = styled.li`
  display: flex;
  justify-content: baseline;
`;

const TermsList = styled.ul`
  display: inline-flex;
  flex-direction: column;
  font-size: 1.4rem;
`;

const TermsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Allterm = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding-left: 15px;
`;

export default TermForm;
