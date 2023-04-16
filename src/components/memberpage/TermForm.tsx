import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import Link from 'next/link';

//여기부분 연결하는거
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <>
      <TermCheckBox type="checkbox" checked={checked} onChange={onChange} />
      <CheckLabel for="allChecked">
        <span>전체동의</span>
      </CheckLabel>
    </>
  );
};

const TermForm = (props) => {
  const { handleUserInfo, passOrNot } = props;

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    agreement_use: false,
    agreement_mkt: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates({
      ...checkboxStates,
      [name]: checked,
    });
  };

  const handleAllCheckboxChange = (e) => {
    const { checked } = e.target;
    setAllChecked(checked);
    setCheckboxStates({
      agreement_use: checked,
      agreement_mkt: checked,
    });
  };

  useEffect(() => {
    handleUserInfo((prev) => ({
      ...prev,
      agreement_use: checkboxStates.agreement_use,
    }));
  }, [checkboxStates.agreement_use]);
  useEffect(() => {
    handleUserInfo((prev) => ({
      ...prev,
      agreement_mkt: checkboxStates.agreement_mkt,
    }));
  }, [checkboxStates.agreement_mkt]);

  useEffect(() => {
    passOrNot((prev) => ({
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
          <CheckLabel for="allChecked">
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
              <CheckLabel for="agreement_use">
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
              <CheckLabel for="agreement_mkt">
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
