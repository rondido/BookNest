## 페이지

페이지는 경로에 고유한 UI입니다. page.js파일에서 컴포넌트를 기본 내보내기로 정의하여 페이지를 만들 수 있다.

예를 들어 index 페이지를 만들려면 app 디렉토리 내에 page.js 파일을 추가

그런 다음, 추가 페이지를 만들려면 새 폴더를 만들고 그 안에 page.js 파일을 추가하세요. 예를 들어 /dashboard 경로에 대한 페이지를 만들려면 dashboard라는 새 폴더를 만들고 그 안에 page.js 파일을 추가

```
// `app/dashboard/page.tsx`는 `/dashboard` URL의 UI입니다.
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

알아두면 좋은 점:

- Pages에는 .js, .jsx, 또는 .tsx 파일 확장자를 사용할 수 있습니다.
- 페이지는 항상 경로 서브트리의 리프입니다.
- page.js 파일은 경로 세그먼트를 공개적으로 접근할 수 있게 만드는 데 필요합니다.
- 페이지는 기본적으로 서버 컴포넌트이며, 클라이언트 컴포넌트로 설정할 수 있습니다.
- 페이지는 데이터를 가져올 수 있습니다. 자세한 내용은 데이터 가져오기 섹션을 참조하세요.
