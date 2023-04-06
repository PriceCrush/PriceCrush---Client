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
 * @description 정규식표현을 확인하기 위한 Hook
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

  const handleTextStatus = (
    status: keyof handleTextStatusProps,
    check: boolean
  ) => {
    setTextStatus((prevStatus) => ({
      ...prevStatus,
      [status]: check,
    }));
  };

  /**
   * @description 글자 길이를 확인하는 함수
   */
  const checkValidLength = useCallback(() => {
    const minLength = 8;
    const maxLength = 16;
    const isValidLength = text.length >= minLength && text.length <= maxLength;
    isValidLength
      ? handleTextStatus('textlength', true)
      : handleTextStatus('textlength', false);
  }, [text.length]);

  /**
   * @description 특수문자 포함여부를 확인하는 함수
   */
  const checkSpecialChar = useCallback(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    hasSpecialChar
      ? handleTextStatus('specialCharacters', true)
      : handleTextStatus('specialCharacters', false);
  }, [text]);

  /**
   * @description 알파벳 포함여부를 확인하는 함수
   */
  const checkCharacter = useCallback(() => {
    const hasCharacter = /[a-zA-Z]/.test(text);
    hasCharacter
      ? handleTextStatus('includingCharacters', true)
      : handleTextStatus('includingCharacters', false);
  }, [text]);

  /**
   * @description hasConsecutiveChars abc와같은 순차적으로 증가하는 문자확인
   * @description hasConsecutiveNum 123와같은 순차적으로 증가하는 숫자확인
   */
  const checkContinuity = useCallback(() => {
    const hasConsecutiveChars =
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        text
      );
    const hasConsecutiveNum =
      /([0-9]){3,}|(012|123|234|345|456|567|678|789)/.test(text);

    hasConsecutiveChars || hasConsecutiveNum
      ? handleTextStatus('continuity', true)
      : handleTextStatus('continuity', false);
  }, [text]);

  useEffect(() => {
    checkValidLength();
    checkSpecialChar();
    checkCharacter();
    checkContinuity();
  }, [checkValidLength, checkCharacter, checkContinuity, checkSpecialChar]);

  return textStatus;
};

export default useValidation;
