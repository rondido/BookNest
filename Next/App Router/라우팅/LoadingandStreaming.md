## Loading UI and Streaming

특정 경로 세그먼트에 대한 풀백을 생성하고, 콘텐츠가 준비되는 대로 자동으로 스트리밍할 수 있게 하는 Suspense 기반의 로딩 UI를 사용하세요.

## Instant Loading States

즉시 로딩 상태

loading.js 파일을 추가하여 폴더 내에 로딩 상태를 생성.

## Streaming with Suspense

Suspense를 사용한 스트리밍

Supense 경계는 UI 컴포넌트를 수동으로 스트리밍할 수 있도록 합니다. Node.js Edge 런타임에서도 사용할 수 있다.

### What is Streaming?

스트리밍이란?

스트리밍은 SRR의 단점을 해결하기 위해 페이지의 HTML을 더 작은 처읔로 나누고 서버에서 클라이언트로 점진적으로 전송하는 방식.

```
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}

```

## SEO

SEO

Next.js는 UI를 스트리밍하기 전에 generateMetadata 내부에서 데이터 페칭이 완료될 때까지 대기함. 이는 스트리밍 응답의 첫 번째 부분에 head 태그가 포함되도록 보장.

Status Codes

상태 코드

스트리밍 시 200 상태 코드를 반환하여 요청이 성공했음을 알림. redirect 또는 notfound를 사용할 떄와 같이 스트리밍된 콘텐츠 내에서 오류를 클라이언트에 전달할 수 있다. 응답 헤더는 이미 클라이언트에 전성되었기 때문에 응답의 상태 코드를 업데이트할 수 없다. 이는 SEO에 영향을 미치지 않는다.
