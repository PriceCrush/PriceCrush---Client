/**
 *
 * @param price {number} - API에서 받은 가격입니다.
 * @param showSymbol {boolean} - 가격에 통화 기호를 표시할지 여부입니다.
 * @returns - 1000000 값이 인자로 들어왔을때 showSymbol 인자가 true 이면 ₩1,000,000 을 리턴하고 false 이면 1,000,000 을 리턴합니다.
 */

export const translatePriceToKoreanWon = (
  price: number,
  showSymbol: boolean = true
) => {
  const options = showSymbol
    ? { style: 'currency', currency: 'KRW' }
    : { minimumFractionDigits: 0 };
  return price.toLocaleString('ko-KR', options);
};
