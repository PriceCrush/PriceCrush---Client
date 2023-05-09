import { useState, useCallback, useEffect } from 'react';
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
    emailForm: false,
    phoneNumForm: false,
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
      emailForm: false,
      phoneNumForm: false,
    };
    /**
     * @description 문자길이
     */
    const lengthRange = {
      maxLength: 16,
      minLength: 4,
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
    const hasSpecialChar = /[!@#$%^&*(),.?:{}|<>]/.test(text);
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

    /**
     * @description 이메일형식
     */
    const isEmailForm = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      text
    );
    /**
     * @description 핸드폰 번호형식 확인, 첫번째 그룹 010or 011, 두번째, 세번째그룹 네자리수 숫자
     */
    const isPhoneNumForm = /^(01[01])\d{4}\d{4}$/.test(text);

    verificationCollection.textlength = isValidLength;
    verificationCollection.specialCharacters = hasSpecialChar;
    verificationCollection.includingCharacters = hasCharacter;
    verificationCollection.continuity =
      hasConsecutiveChars || hasConsecutiveNum;
    verificationCollection.emailForm = isEmailForm;
    verificationCollection.phoneNumForm = isPhoneNumForm;

    setTextStatus(verificationCollection);
  }, [text]);

  useEffect(() => {
    textVerification();
  }, [textVerification]);

  return textStatus;
};

export default useValidation;
