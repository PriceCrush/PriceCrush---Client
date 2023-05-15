# PriceCrush---Client

## 트러블슈팅

- Image가 화면 크기에따라 엑스박스와 정상출력 사이를 왔다갔다함

  - 왜인지는 모르겠지만, Local, Session, Cache 초기화 후 해결

- Socket 클라이언트 과도하게 쌓이는 문제

  - socekt.connect(), socket.disconnect()를 핸들링해야함
  - socket.disconnect()를 한다고 해서 소켓 자체가 사라지는 것은 아님

- HTTPS -> HTTP 로 요청시 The page at <URL> was loaded over HTTP 에러
  - 이미지를 불러오는 요청인 aws의 url 프로토콜 http 에 https 클라이언트 페이지에서 요청을 보내 생기는 문제
  - \_docuemtn.tsx의 <HEAD></HEAD> 안에 <meta> 태그 에 `httpEquiv` `content` 태그를 추가해서 해결

## 배포 0514
