## Redirecting

Next.js에서 리디렉션을 처리하는 여러 가지 방법이 있다. 이 페이지에서는 각 옵션, 사용 사례 및 대규모 리디렉션을 관리하는 방법을 설명

| API                         | Purpose                                  | Where                                             | StatusCode                             |
| --------------------------- | ---------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| redirect                    | 사용자 동작 또는 이벤트 후 리디렉션      | Server Components, Server Actions, Route Handlers | 307(Temprorary) or 303 (Server Action) |
| permanentRedirect           | 사용자 동작 또는 이벤트 후 영구 리디렉션 | Server Components, Server Actions, Route Handlers | 308(permanent)                         |
| useRouter                   | 클라이언트 측 내비게이션 수행            | 클라이언트 컴포넌트의 이벤트 핸들러               | N/A                                    |
| redirects in next.config.js | 경로 기반으로 들어오는 요청 리디렉션     | next.config.js파일                                | 307(Temporary) or 308(Permanent)       |
| NextResponse.redirect       | 조건 기반으로 들어오는 요청 리디렉션     | Middleware                                        | Any                                    |

## redirect function

redirect 함수

redirect 함수는 사용자를 다른 URL로 리디렉션할 수 있게 해줌. Server Components, Route Handlers, 및 Server Actions에서 redirect를 호출할 수 있다.

redirect는 종종 변형이나 이벤트 후에 사용됨.
