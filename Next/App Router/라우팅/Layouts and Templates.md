## 레이아웃 및 템플릿

특수 파일인 layout.js와 template.js는 경로 간에 공유되는 UI를 생성할 수 있게 해줌. 이 페이지에서는 이러한 특수 파일을 언제, 어떻게 사용하는지 안내함.

## 레이아웃

레이아웃은 여러 경로 간에 공유되는 UI임. 탐색 시 레이아웃은 상태를 유지하고, 상호작용을 유지하며, 다시 렌더링되지 않는다. 레이아웃은 또한 중첩될 수 있다.

레이아웃은 layout.js 파일에서 React 컴포넌트를 기본 내보내기로 정의하여 생성할 수 있다. 이 컴포넌트는 렌더링 중 자식 레이아웃 또는 페이지로 채워질 children prop을 받아야 함.

## 루트 레이아웃 (필수)

루트 레이아웃은 app 디렉토리의 최상위 레벨에서 정의되며 모든 경로에 적용됩니다. 이 레이아웃은 필수이며, 서버에서 반환되는 HTML 을 수정할 수 있도록 html 및 body 태그를 포함해야함.

## 레이아웃 중첩

기본적으로 폴더 계층 구조의 레이아웃은 중첩됨. 이는 children prop을 통해 자식 레이아웃을 래핑함을 의미. 특정 경로 세그먼트(폴더) 안에 layout.js를 추가하여 레이아웃 중첩할 수 있다.

위의 두 레이아웃을 결합하면, 루트 레이아웃(app/layout.js)은 대시보드 레이아웃(app/dashboard/layout.js)을 래핑하며, 이는 app/dashboard/\* 내의 경로 세그먼트를 래핑합니다.

알아두면 좋은 점:

- 레이아웃에는 .js, .jsx 또는 .tsx 파일 확장자를 사용할 수 있습니다.
- 루트 레이아웃만 <html> 및 <body> 태그를 포함할 수 있습니다.
- 동일한 폴더에 layout.js와 page.js 파일이 정의되어 있으면 레이아웃이 페이지를 래핑합니다.
- 레이아웃은 기본적으로 서버 컴포넌트지만, 클라이언트 컴포넌트로 설정할 수 있습니다.
- 레이아웃은 데이터를 가져올 수 있습니다. 자세한 내용은 데이터 가져오기 섹션을 참조하세요.
- 부모 레이아웃과 자식 간에 데이터를 전달하는 것은 불가능합니다. 그러나 경로에서 동일한 데이터를 여러 번 가져올 수 있으며, React는 성능에 영향을 주지 않고 요청을 자동으로 중복 제거합니다.
- 레이아웃은 pathname에 접근할 수 없습니다(자세히 알아보기). 하지만, 임포트된 클라이언트 컴포넌트는 usePathname 훅을 사용하여 pathname에 접근할 수 있습니다.
- 레이아웃은 자신보다 아래에 있는 경로 세그먼트에 접근할 수 없습니다. 모든 경로 세그먼트에 접근하려면 클라이언트 컴포넌트에서 useSelectedLayoutSegment 또는 useSelectedLayoutSegments 훅을 사용할 수 있습니다.
- 경로 그룹을 사용하여 특정 경로 세그먼트를 공유 레이아웃에서 선택적으로 포함하거나 제외할 수 있습니다.
- 경로 그룹을 사용하여 여러 개의 루트 레이아웃을 만들 수 있습니다. 여기에서 예시를 확인하세요.
- pages 디렉토리에서 마이그레이션: 루트 레이아웃은 \_app.js 및 \_document.js 파일을 대체합니다. 마이그레이션 가이드 보기.

## 템플릿

템플릿은 자식 레이아웃 또는 페이지를 래핑한다는 점에서 레이아웃과 유사하다. 경로 간에 지속되고 상태를 유지하는 데 레이아웃과 달리, 템플릿은 탐색 시 자식의 새 인스턴스를 생성. 이는 사용자가 템플릿을 공유하는 경로 간에 탐색할 때마다 자식의 새 인스턴스가 마운트되고, DOM 요소가 재생성되며, 클라이언트 컴포넌트의 상태가 유지되지 않고, 이펙트가 다시 동기화됨을 의미함.

이러한 특정 동작이 필요한 경우 템플릿이 레이아웃보다 더 적합한 옵션일 수 있다.

- 탐색 시 useEffect를 다시 동기화하려는 경우
- 탐색 시 자식 클라이언트 컴포넌트의 상태를 재설정하려는 경우

템플릿은 template.js 파일에서 기본 React 컴포넌트를 내보내기로 정의할 수 있습니다. 이 컴포넌트는 children prop을 받아야 합니다

## Linking and Navigating

Next.js에서 경로 간 이동 하는 방법은 4가지가 존재

- Link 컴포넌트 사용
- useRouter 훅 사용(클라이언트 컴포넌트)
- redirect 함수 사용(서버 컴포넌트)
- 네이티브 History API 사용

## Link Component

Link 컴포넌트

Link는 HTML <a>태그를 확장하여 경로 간 사전 로드와 클라이언트 측 내비게이션을 제공하는 내장 컴포넌트입니다. Next.js에서 경로 간 이동을 위한 기본적이고 권장되는 방법임.

```
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## Examples

### Linking to Dynamic Segments

동적 세그먼트에 링크하기

동적 세그먼트에 링크할 때 템플릿 리터럴과 인터플레이션을 사용하여 링크 목록을 생성할 수 있다. 예를 들어, 블로그 게시물 목록을 생성하려면 다음과 같이 합니다

```
import Link from 'next/link'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### Checking Active Links

활성 링크 확인하기

usePathName()을 사용하여 링크가 활성화되었는지 확인할 수 있다.
예를 들어, 현재 pathname이 링크의 href와 일치하는지 확인하여 활성 링크에 클래스를 추가했다.

```
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Links() {
  const pathname = usePathname()

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href="/about"
      >
        About
      </Link>
    </nav>
  )
}
```

### Scrolling to an id

id로 스크롤하기

Next.js App Router의 기본 동작은 새로운 경로로 이동할 때 맨 위로 스크롤하거나 이전 및 다음 탐색을 위해 스크롤 위치를 유지하는 것.

내비게이션 시 특정 id로 스크롤하려면 URL에 # 해시 링크를 추가하거나 href prop에 해시 링크를 전달할 수 있다. Link는 요소로 렌더링되기 때문에 가능함.

```
<Link href="/dashboard#settings">Settings</Link>

// 출력
<a href="/dashboard#settings">Settings</a>
```

### Disabling scroll restorantion

스크롤 복원 비활성화

Next.js App Router의 기본 동작은 새로운 경로로 이동 할 때 맨 위로 스크롤하거나 이전 및 다음 탐색을 위해 스크롤 위치를 유지하는 것. 이 동작을 비활성화 하려면 Link 컴포넌트 scroll={false}를 전달하거나 router.push() 또는 router.replce()에 srcoll:false를 전달할 수 있다.

```
// next/link
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

```
// useRouter
import { useRouter } from 'next/navigation'

const router = useRouter()

router.push('/dashboard', { scroll: false })
```

## useRouter() hook

useRouter() 훅

useRoter 훅을 사용하여 클라이언트 컴포넌트에서 프로그래밍 방식으로 경로를 변경할 수 있다.

```
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## redirect function

redirect 함수

서버 컴포넌트의 경우 redirect 함수를 사용하세요.

```
import { redirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }

  // ...
}
```

참고:

- redirect는 기본적으로 307 (임시 리디렉션) 상태 코드를 반환합니다. 서버 액션에서 사용될 때는 303 (다른 페이지 보기)를 반환하며, 이는 POST 요청 결과로 성공 페이지로 리디렉션하는 데 자주 사용됩니다.
- redirect는 내부적으로 오류를 발생시키므로 try/catch 블록 외부에서 호출해야 합니다.
- redirect는 렌더링 프로세스 동안 클라이언트 컴포넌트에서 호출될 수 있지만, 이벤트 핸들러에서는 호출될 수 없습니다. 대신 useRouter 훅을 사용할 수 있습니다.
- redirect는 절대 URL도 허용하며 외부 링크로 리디렉션하는 데 사용할 수 있습니다.
- 렌더링 프로세스 전에 리디렉션하려면 next.config.js 또는 미들웨어를 사용하세요.

## Using the native History API

네이티브 History API 사용

Next.js는 네이티브 window.history.pushState 및 window.history.replaceState 메서드를 사용하여 페이지를 다시 로드하지 않고 브라우저의 히스토리 스택을 업데이트할 수 있다.

pushState 및 replaceState 호출은 Next.js 라우터와 통합되어 usePatchname 및 useSearchParams와 동기화할 수 있다.

### window.history.pushState

window.history.pushState

브라우저의 히스토리 스택에 새 항목을 추가하는 데 사용됩니다. 사용자는 이전 상태로 돌아갈 수 있습니다. 예를 들어, 제품 목록을 정렬하려면 다음과 같이 합니다

```
'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </>
  )
}
```

### window.history.replaceState

window.history.replaceState

브라우저의 히스토리 스택에서 현재 항목을 대체하는 데 사용됩니다. 사용자는 이전 상태로 돌아갈 수 없습니다. 예를 들어, 애플리케이션의 로케일을 변경하려면 다음과 같이 합니다:

```
'use client'

import { usePathname } from 'next/navigation'

export function LocaleSwitcher() {
  const pathname = usePathname()

  function switchLocale(locale: string) {
    // 예: '/en/about' 또는 '/fr/contact'
    const newPath = `/${locale}${pathname}`
    window.history.replaceState(null, '', newPath)
  }

  return (
    <>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>French</button>
    </>
  )
}
```

## How Routing and Navigation Works

라우팅 및 내비게이션 작동 방식

App Router는 라우팅 및 내비게아션에 대해 하이브리드 접근 방식을 사용

서버에서 애플리케이션 코드는 경로 세그먼트에 의해 자동으로 코드 분할됨.

클라이언트에서 Next.js는 경로 세그먼트를 사전 로그하고 캐시함. 즉, 사용자가 새 경로로 내비게이션할 때 브라우저가 페이지를 다시 로드하지 않으며 변경된 경로 세거먼트만 다시 렌더링됨.

### 1. Code Splitting

1. 코드 분할

코드 분할은 애플리케이션 코드를 더 작은 번들로 나누어 브라우저가 다운로드하고 실행할 수 있게 함. 이는 전송되는 데이터 양과 각 요청에 대한 실행 시간을 줄여 성능을 향상시킴.

서버 컴포넌트를 사용하면 애플리케이션 코드가 경로 세그먼트에 의해 자동으로 코드 분할됨. 이는 현재 경로에 필요한 코드만 내비게이션 시 로드된다는 것을 의미.

### 2. Prefetching

2. 사전 로드

사전 로드는 사용자가 방문하기 전에 백그라운드에서 경로를 미리 로드하는 방법

Next.js에서 경로를 사전 로드하는 두 가지 방법이 있다.

- Link 컴포넌트: 경로가 사용자의 뷰포트에 보이게 되면 자동으로 사전 로드됨. 사전 로드는 페이지가 처음 로드될 때 또는 스크롤을 통해 뷰에 들어올 때 발생
- router.prefetch: useRouter 훅을 사용하여 프로그래밍 방식으로 경로를 사전 로드할 수 있다.

Link의 기본 사전 로드 동작(즉 prefetch prop이 지정되지 않았거나 null로 설정된 경우)은 loading.js의 사용 방식에 따라 다름. 첫 번째 loading.js파일까지 렌더링된 트리의 공유 레이아웃만 사전 로드되어 30초 동안 캐시됨. 이는 전체 동적 경로를 가져오는 비용을 줄여주며, 사용자에게 더 나은 시각적 피드백을 제공하기 위해 즉각적인 로딩 상태를 표시할 수 있다.

prefetch prop을 false로 설정하여 사전 로드를 비활성화할 수 있습니다. 또는 prefetch prop을 true로 설정하여 로딩 경계를 넘어 전체 페이지 데이터를 사전 로드할 수 있습니다.

참고

- 사전 로드는 개발 환경에서는 활성화되지 않으며, 프로덕션 환경에서만 활성화됩니다.

### 3. Chaching

3. 캐싱

Next.js에는 라우터 캐시라고 불리는 메모리 내 클라이언트 측 캐시가 있다. 사용자가 애플리케이션을 탐색할 때 사전 로드된 경로 세그먼트와 방문한 경로의 React 서버 컴포넌트 페이로드가 캐시에 저장됨.

이는 내비게이션 시 새로운 서버 요청을 만드는 대신 가능한 한 캐시를 재사용하여 요청 수와 전송되는 데이터 양을 성능을 향상시킴.

### 4. Partial Rendering

4. 부분 렌더링

부분 렌더링은 내비게이션 시 변경된 경로 세그먼트만 클라이언트에서 다시 렌더링되고, 공유된 세그먼트는 유지되는 것을 의미합니다.

예를 들어, 두 형제 경로인 /dashboard/settings와 /dashboard/analytics 간 내비게이션할 때 settings와 analytics 페이지가 렌더링되고, 공유된 dashboard 레이아웃은 유지됩니다.

부분 렌더링이 없다면, 각 내비게이션은 전체 페이지를 클라이언트에서 다시 렌더링하게 됩니다. 변경된 세그먼트만 렌더링하면 전송되는 데이터 양과 실행 시간을 줄여 성능을 향상시킬 수 있습니다.

### 5. Soft Navigation

5. 소프트 내비게이션

브라우저는 페이지 간 내비게이션 시 "하드 내비게이션"을 수행합니다. Next.js App Router는 페이지 간 "소프트 내비게이션"을 가능하게 하여 변경된 경로 세그먼트만 다시 렌더링되도록 합니다(부분 렌더링). 이를 통해 내비게이션 중 클라이언트 React 상태가 유지됩니다.

### 6. Back and Forward Navigation

6. 뒤로 및 앞으로 내비게이션

기본적으로 Next.js는 뒤로 및 앞으로 내비게이션을 위해 스크롤 위치를 유지하고 라우터 캐시의 경로 세그먼트를 재사용합니다.

### 7. Routing between pages/ and app/

7. pages/와 app/ 간의 라우팅

pages/에서 app/로 점진적으로 마이그레이션할 때 Next.js 라우터는 두 경로 간의 하드 내비게이션을 자동으로 처리합니다. pages/에서 app/로의 전환을 감지하기 위해 앱 경로의 확률적 검사를 활용하는 클라이언트 라우터 필터가 있으며, 때때로 false positive를 초래할 수 있습니다. 기본적으로 이러한 발생은 매우 드물어야 하며, false positive 가능성을 0.01%로 구성합니다. 이 가능성은 next.config.js의 experimental.clientRouterFilterAllowedRate 옵션을 통해 사용자 지정할 수 있습니다. false positive 비율을 낮추면 클라이언트 번들에서 생성된 필터의 크기가 증가한다는 점을 유의해야 합니다.

또는 이 처리를 완전히 비활성화하고 pages/와 app/ 간의 라우팅을 수동으로 관리하려는 경우, next.config.js에서 experimental.clientRouterFilter를 false로 설정할 수 있습니다. 이 기능이 비활성화되면 기본적으로 앱 경로와 겹치는 페이지의 동적 경로는 제대로 내비게이션되지 않습니다.
