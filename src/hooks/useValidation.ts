import React, { useCallback, useEffect, useState } from 'react';

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

const useValidation = (text: string) => {
  const [textStatus, setTextStatus] = useState({
    textlength: false,
    specialCharacters: false,
    includingCharacters: false,
    continuity: false,
  });
  /**
   * @description 유효성 검사를위함 함수 (문자길이, 특수문자여부, 알파벳 여부, 연속된 알파벳 여부, 연속된 숫자여부)
   */
  const textVerification = useCallback(() => {
    const verificationCollection = {
      textlength: false,
      specialCharacters: false,
      includingCharacters: false,
      continuity: false,
    };
    /**
     * @description 문자길이
     */
    const lengthRange = {
      maxLength: 16,
      minLength: 8,
    };
    /**
     * @description 문자길이확인
     */
    const isValidLength =
      text.length >= lengthRange.minLength &&
      text.length <= lengthRange.maxLength;
    /**
     * @description 특수문자여부확인
     */
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
    /**
     * @description 알파벳 여부확인
     */
    const hasCharacter = /[a-zA-Z]/.test(text);
    /**
     * @description 연속된 알파벳 여부확인
     */
    const hasConsecutiveChars =
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        text
      );
    /**
     * @description 연속된숫자여부확인
     */
    const hasConsecutiveNum =
      /([0-9]){3,}|(012|123|234|345|456|567|678|789)/.test(text);

    verificationCollection.textlength = isValidLength;
    verificationCollection.specialCharacters = hasSpecialChar;
    verificationCollection.includingCharacters = hasCharacter;
    verificationCollection.continuity =
      hasConsecutiveChars || hasConsecutiveNum;

    // console.log(json, 'check???');

    setTextStatus(verificationCollection);
  }, [text]);

  useEffect(() => {
    textVerification();
  }, [textVerification]);

  return textStatus;
};

export default useValidation;