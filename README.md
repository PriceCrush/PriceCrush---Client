# PriceCrush---Client

## 트러블슈팅

- Image가 화면 크기에따라 엑스박스와 정상출력 사이를 왔다갔다함

  - 왜인지는 모르겠지만, Local, Session, Cache 초기화 후 해결

- Socket 클라이언트 과도하게 쌓이는 문제
  - socekt.connect(), socket.disconnect()를 핸들링해야함
  - socket.disconnect()를 한다고 해서 소켓 자체가 사라지는 것은 아님
