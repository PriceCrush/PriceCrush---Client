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
  - 배포 상황과 로컬 상황에서 다르게 해야할 듯 로컬 테스트 상황에서는 해당 태그 사용시 소켓에 연결되지 않음

## 웹소켓 관련 임시

Socket.IO는 기본적으로 두 가지 전송 방식을 사용합니다: WebSocket과 HTTP Long Polling입니다.

WebSocket: 이는 양방향 통신을 가능하게 하는 프로토콜입니다. 클라이언트와 서버 모두 언제든지 데이터를 전송할 수 있습니다. 이 프로토콜은 실시간 애플리케이션에 적합하며, Socket.IO가 활용하는 주요 프로토콜입니다.

HTTP Long Polling: 이 방식에서 클라이언트는 서버에 요청을 보내고, 서버에 응답할 준비가 될 때까지 기다립니다. 서버가 응답하면 클라이언트는 즉시 새 요청을 보냅니다. 이 방식은 실시간 애플리케이션에 있어 WebSocket이 사용할 수 없는 경우의 fallback 방식으로 사용됩니다.

이 두 전송 방식 중 WebSocket은 HTTP보다 더 효율적이지만, WebSocket을 지원하지 않는 환경에서는 HTTP Long Polling이 사용됩니다.

transports: ['websocket'] 옵션을 설정하면, Socket.IO는 WebSocket 연결만 사용하도록 강제됩니다. 이렇게 하면 HTTP Long Polling이 사용되지 않아, HTTPS와 관련된 문제를 피할 수 있습니다. 하지만 이 방식은 모든 환경에서 WebSocket을 지원하지 않는 경우 문제가 될 수 있으므로, 일반적으로는 백엔드 서버를 HTTPS를 사용하도록 설정하는 것이 더 좋은 해결책입니다.

이 방식이 문제를 해결하는 이유는, HTTPS를 사용하는 클라이언트에서 HTTP를 사용하는 서버에 요청을 보내는 것이 문제이기 때문입니다. WebSocket 연결만 사용하도록 강제하면, HTTP를 사용하는 Long Polling 요청이 발생하지 않으므로 이 문제를 피할 수 있습니다.

## 배포 0514

## 배포 0521

BASEURL 변경 (SSL 인증서 등륵)
