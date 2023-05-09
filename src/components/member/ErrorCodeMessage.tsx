export const loginErrorCode = (code: number) => {
  let title = '';
  let message;

  switch (code) {
    case 422:
      (title = '로그인 오류'),
        (message = (
          <>
            <p>가입한 계정이 없거나 비밀번호가 올바르지 않습니다.</p>
          </>
        ));
      break;
    case 404:
      (title = '시스템 오류'),
        (message = (
          <>
            <p>현재 시스템장애로 인하여 로그인이 불가능합니다.</p>
            <p>불편을 드려 죄송합니다.</p>
          </>
        ));
    default:
      (title = '알수없는 오류'),
        (message = (
          <>
            <p>현재 알 수 없는 오류로 인하여 로그인이 불가능합니다.</p>
            <p>불편을 드려 죄송합니다.</p>
          </>
        ));
  }

  return { title, message };
};
