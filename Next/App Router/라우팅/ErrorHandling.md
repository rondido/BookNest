## Error Handling

에러는 예상된 에러와 예상치 못한 예외 두 가지 범주로 나눌 수 있다.

- 예상된 에러를 반환 값으로 모델링: 서버 액션에서 예상된 에러를 try/catch로 처리하는 것을 피하십시오. useActionState를 사용하면 이러한 에러를 관리하고 클라이언트에 반환

## Handling Expected Errors

예쌍된 에러는 서버 측 폼 검증이나 실패한 요청 등 정상적인 애플리케이션 운영 중에 발생할 수 있는 에러임. 이러한 에러는 명시적으로 처리하고 클라이언트에 반환해야 함.

### Handling Expected Errors from Server Actions

useActionState 훅을 사용하여 서버 액션의 상태를 관리하고 처리함. 이 접근 방식은 예상된 에러를 위한 try/catchg 블록을 피하고 에러를 throw하는 대신 반환 값으로 모델링해야 함.

```
'use server'

import { redirect } from 'next/navigation'

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch('https://...')
  const json = await res.json()

  if (!res.ok) {
    return { message: 'Please enter a valid email' }
  }

  redirect('/dashboard')
}
```

그런 다음, useActionState 훅에 액션을 전달하고 반환된 state를 사용하여 에러 메시지를 표시할 수 있다.

```
'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions'

const initialState = {
  message: '',
}

export function Signup() {
  const [state, formAction] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      {/* ... */}
      <p aria-live="polite">{state?.message}</p>
      <button>Sign up</button>
    </form>
  )
}
```

### Handling Expected Errors from Server Components

서버 컴포넌트 내에서 데이터를 가져올 때는 응답을 사용하여 조건부로 에러 메시지를 렌더링하거나 redirect할 수 있다.

```
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!res.ok) {
    return 'There was an error.'
  }

  return '...'
}

```

## Uncaught Exceptions

예상치 못한 예외는 정상적인 애플리케이션 흐름 중에 발생해서는 안 되는 버그나 문제를 나타내는 예기치 않는 에러임.

- 일반적인적인 경우: 루트 레이아웃 아래에서 발생한 예기치 않은 에러는 error.js로 처리.

- 선택적인 경우: 중첩된 error.js 파일을 사용하여 세분화된 예기치 않은 에러를 처리함.
- 드문 경우: 루트 레이아웃에서 발생한 예기치 않은 에러는 global-error.js로 처리.

### Using Error Boundaries

Next.js는 예상치 못한 예외를 처리하기 위해 에러 경계를 사용함. 에러 경계는 자식 컴포넌트에서 발생한 에러를 캐치하고, 충돌한 컴포넌트 트리 대신 대체 UI를 표시함.

경로 세그먼트 내에 error.txt 파일을 추가하고 React 컴포넌트를 내보내어 에러경계를 생성함.

```

'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

### Handling Errors in Nested Routes

에러는 가장 가까운 부모 에러 경계로 전파됨. 이를 통해 경로 계층 구조와 다양한 수준에서 error.txt파일을 배치하여 세분화된 에러 처리가 가능함.

### Handling Global Errors

드물게 루트 레이아웃에서 에러를 처리해야하 할 때는, app/global-error.js를 사용함. 이 파일은 루트 앱 디렉토리에 위치하며, 국제화를 활용할 때도 작동함. 전역 에러 UI는 활성화될 때 루트 레이아웃이나 템플릿을 대체하므로 자체 html 및 body 태그를 정의해야 함.
