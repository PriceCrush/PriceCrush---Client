# PriceCrush---Client
> 실시간 경매 참여 플랫폼 서비스  
> https://price-crush-client.vercel.app/ 

# 1. 제작 기간 & 참여 인원
- 2023년 03월 ~ 2023년 05월
- `FE`: 3명, `BE`: 3명 

# 2. 사용 기술
- Next.js
- Socket.io

# 3. 핵심 기능
같은 물건을 보고있는 사용자들이 입찰할때마다 실시간으로 바뀌는 가격을 보며 경매에 참여할 수 있습니다.  
마이 페이지에서 내가 참여한 경매를 관리할 수 있으며 판매자는 현재 가격이 마음에 든다면 현재 가격에서 경매를 종료시킬 수 있습니다.

## 4. 핵심 트러블슈팅
### `이찬휘`  
### 4.1 Socket 생성과 Context로 관리하기
- 프로젝트에서 Socket.io는 실시간 경매 파트에서만 사용되기에 경매를 할 수 있는 `상품 상세 정보` 페이지에서 Socket을 관리하던 중 
[리액트에서 socket.io 사용하기](https://velog.io/@warmwhiten/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-socket.io-%EC%95%8C%EB%A7%9E%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)라는 글을 보았습니다.  
- React Context를 이용해 Socket을 웹 페이지 전체에서 실행시키고 페이지마다 필요한 이벤트들을 `on`,`off` 시키는 방법으로  
기존 방법보다 기능 추가의 확장성이 용이하고 더 나은 방법이라는 생각이 들어 적용하였습니다. [context.ts](https://github.com/PriceCrush/PriceCrush---Client/blob/91afba8d334f0d1f7bcafd2dc05bef69cd02c9db/src/socket/context.ts#L1-L5)
- 결과적으로 새로운 기능이 추가되진 않았지만 `공지`, `알람` 등 새로운 기능을 더 추가하기 쉬운 형태로 Socket을 사용할 수 있었습니다.


### 4.2 ERR_SSL_PROTOCOL_ERROR  
- 개발중인 `http://localhost:3000` 에서는 서버에 요청을 보낼때 아무런 문제가 없었지만 vercel을 통해 배포한 페이지에서는 서버로 보내는 요청에 `ERR_SSL_PROTOCOL_ERROR` 에러가 나왔습니다.
- 클라이언트 페이지의 SSL 인증서는 유효한 것을 확인해 http 프로토콜로 실행되고있는 EC2 인스턴스가 문제라고 판단하여 백엔드 팀원들과 이야기하여 백엔드 팀원이 AWS ACM, Route53, ALB을 사용해 https url을 만들었습니다.  
- `http://ec2~~~.com` -> `https:~~~.com` API 요청시 문제가 해결되었습니다.


## 5. 기타 트러블 슈팅
### `이찬휘`
### 5.1 Main 페이지 Carousel 동작 문제
- 테스트를 위해서 등록된 경매 물품을 모두 삭제하고 다시 등록할때 총 등록 물품이 3개 이하일때 `center` mode로 설정한 Carousel이 동작하지 않고 가장 왼쪽의 물품에 포커스된채 움직이지 않는 문제가 있었습니다.
- [`React Slick Center Mode 문서`](https://react-slick.neostack.com/docs/example/center-mode)을 참조하여 아이템의 갯수에 따라 동작 방식을 수정했습니다.
- [기존 코드](https://github.com/PriceCrush/PriceCrush---Client/blob/545c23416587df76c4a97930188197b50083617b/src/components/carousel/MainPageCarousel.tsx#L33-L77)
- [개선된 코드](https://github.com/PriceCrush/PriceCrush---Client/blob/ff8b2961b9de80fb3cb066b83bd3a5cbe1805cd1/src/components/carousel/MainPageCarousel.tsx#L17-L47)

### 5.2 배포 후 Mixed Content 에러 발생
개발중인 `http://localhost:3000` 에서는 서버에 요청을 보낼때 아무런 문제가 없었지만 vercel을 통해 배포한 페이지에서는 서버로 보내는 요청에 위의 에러가 나왔습니다.  
[Mixed content](https://wellsw.tistory.com/34)을 참조하여 https 프로토콜에서 http 프로토콜로 요청을 보내면 발생하는 문제인 것을 인지하고 `head`를 수정하였습니다.

### 5.3 Recoil state와 Web Storage 동기화
- 페이지 새로고침시 데이터를 그대로 유지하기 위해, 로그인된 유저의 기본적인 정보를 확인하기 위해 state에 저장된 정보를 Web Storage에 저장해서 사용하던 중 불필요하게 반복되는 코드가 많다라는 생각에  
이를 대신해주는 라이브러리를 찾다가 `Recoil-Persist`라는 npm 라이브러리를 찾았습니다.
- 이를 적용해 중복되는 코드를 줄이고 state와 storage 간의 동기화 작업을 쉽게 해결하였습니다.
- [코드](https://github.com/PriceCrush/PriceCrush---Client/blob/ff8b2961b9de80fb3cb066b83bd3a5cbe1805cd1/src/atoms/categoriesState.ts#L3-L13)

### 5.4 Axios Interceptor로 헤더에 토큰 실어보내기
- 유저의 인증/인가는 JWT를 적용하여 AccessToken, Refresh 토큰으로 관리됩니다. 하지만 개발중 httpOnly 속성을 가진 AccessToken이 생각대로 작동하지 않았습니다.
- 문제를 해결하기 전까지 요청 헤더에 직접 토큰 값을 넣어 보내주기위해 Axios Instance 에 interceptor를 추가하여 토큰이 존재하는 경우 토큰을 실어 보내주었습니다.
- [코드](https://github.com/PriceCrush/PriceCrush---Client/blob/ff8b2961b9de80fb3cb066b83bd3a5cbe1805cd1/src/utils/axiosInstance.ts#L25-L37)





