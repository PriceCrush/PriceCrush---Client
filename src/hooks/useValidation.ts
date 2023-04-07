import React, { useCallback, useEffect, useState } from 'react';

//들어온값
// 들어온값에 따라 해당오류가 해당이 되는지 안되는지 보여준다.

interface handleTextStatusProps {
  textlength: boolean;
  specialCharacters: boolean;
  includingCharacters: boolean;
  continuity: boolean;
}
/**
 * @description 유효성 검사를 위한 Hook
 * @param text
 * @returns {object} text에 해당하는 상태확인
 */

// 의문 : 하나하나 분리하는게 더 좋은지 모르겠음,
//추가사항 있을때 더 넣을 얘정인데 그러면 무거워질것같기때문에
const useValidation = (text: string) => {
  const [textStatus, setTextStatus] = useState({
    textlength: false,
    specialCharacters: false,
    includingCharacters: false,
    continuity: false,
  });

  const test = useCallback(() => {
    const json = {
      textlength: false,
      specialCharacters: false,
      includingCharacters: false,
      continuity: false,
    };
    //length check
    const minLength = 8;
    const maxLength = 16;
    const isValidLength = text.length >= minLength && text.length <= maxLength;
    //
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    //
    const hasCharacter = /[a-zA-Z]/.test(text);
    //
    const hasConsecutiveChars =
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        text
      );
    const hasConsecutiveNum =
      /([0-9]){3,}|(012|123|234|345|456|567|678|789)/.test(text);

    json.textlength = isValidLength;
    json.specialCharacters = hasSpecialChar;
    json.includingCharacters = hasCharacter;
    json.continuity = hasConsecutiveChars || hasConsecutiveNum;

    console.log(json, 'check???');

    setTextStatus(json);
  }, [text]);

  useEffect(() => {
    test();
  }, [test]);

  return textStatus;
};

export default useValidation;
