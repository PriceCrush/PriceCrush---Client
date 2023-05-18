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

export const temporaryPasswordApiCode = (code: number) => {
  let title = '';
  let message;

  switch (code) {
    case 200:
      (title = '임시 비밀번호 발급'),
        (message = (
          <>
            <p>가입된 번호로 임시 비밀번호를 발급했습니다.</p>
          </>
        ));
      break;
    case 422:
      (title = '가입된 이메일 없음'),
        (message = (
          <>
            <p>해당 이름과 핸드폰으로 가입된 이메일이 존재하지 않습니다.</p>
          </>
        ));
      break;

    default:
      (title = '알수없는 오류'),
        (message = (
          <>
            <p>현재 알 수 없는 오류로 요청이 거부되었습니다.</p>
            <p>불편을 드려 죄송합니다.</p>
          </>
        ));
  }

  return { title, message };
};

export const findEmailApiCode = (code: number) => {
  let title = '';
  let message;

  switch (code) {
    case 422:
      (title = '가입된 이메일 없음'),
        (message = (
          <>
            <p>해당 이름과 핸드폰으로 가입된 이메일이 존재하지 않습니다.</p>
          </>
        ));
      break;

    default:
      (title = '알수없는 오류'),
        (message = (
          <>
            <p>현재 알 수 없는 오류로 요청이 거부되었습니다.</p>
            <p>불편을 드려 죄송합니다.</p>
          </>
        ));
  }

  return { title, message };
};
export const resetPasswordApiCode = (code: number) => {
  let title = '';
  let message;

  switch (code) {
    case 200:
      (title = '비밀번호 변경'),
        (message = (
          <>
            <p>비밀번호가 정상적으로 변경되었습니다.</p>
          </>
        ));
      break;
    case 409:
      (title = '비밀번호 변경 오류'),
        (message = (
          <>
            <p>비밀번호 변경이 정상적으로 이루어지지 않았습니다.</p>
          </>
        ));
      break;
    case 404:
      (title = '비밀번호 변경 오류'),
        (message = (
          <>
            <p>비밀번호 변경이 정상적으로 이루어지지 않았습니다.</p>
          </>
        ));
      break;
    default:
      (title = '알수없는 오류'),
        (message = (
          <>
            <p>현재 알 수 없는 오류로 요청이 거부되었습니다.</p>
            <p>불편을 드려 죄송합니다.</p>
          </>
        ));
  }

  return { title, message };
};
