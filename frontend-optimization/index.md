# 목차


## 로딩 서능

로딩 성능은 서버에 있는 웹 페이지와 웹 페이지에 필요한 기타 리소스를 다운로드할 때의 성능을 말함. 

예를 들어 웹 페이지에 고화질 이미지가 포함되어 있을 때, 느린 인터넷 환경에서는 이 이미지가 매우 늦게 표시될 것입니다.

마찬가지로 HTML이나 Javascript, css 파일의 크기가 너무 크면 다운로드 하는 세간이 오래 걸림.

따라서 로딩 성능 개선은 다운로드 해야하는 리소스수를 줄이거나 크기를 줄이는 것.

## 렌더링 성능

다운로드 한 리소스를 가지고 화면을 그릴 때의 성능을 말함.

렌더링 성능에 크게 영향을 주는 것은 자바스크립트 코드.

브라우저의 동작 원리나 사용하는 프레임워크의 라이프사이클 등 웹 개발의 기본 지식을 이해해야 함.


## 1장 블로그 서비스

- 크롬 개발자 도구의 Performance 패널을 이용한 분석
- 크롬 개발자 도구의 Lighthouse 패널일 이용한 분석
- 크롬 개발자 도구의 Network 패널을 이용한 분석
- webpack-bundle-analyzer를 이용한 번드 파일 분석
- 이미지 CDN을 통한 이미지 사이즈 최적화
- 코드 분할과 컴포넌트 지연 로딩
- 텍스트 압축 기법
- 병목 코드 분석과 최적화

## 2장 올림픽 통계 서비스

- 브라우저 렌더링 과정
- css 애니메이션 최적화
- 컴포넌트 지연 로딩
- 컴포넌트 사전 로딩
- 이미지 사전 로딩

## 3장 홈페이지

롱보드를 소개하는 홈페이지를 분석하고 최적화함.
s
- 크롬 개발자 도구의 Coverage 패널을 이용한 분석
- 이미지 지연 로딩
- 이미지 포맷 종류
- 이미지 사이즈 최적화
- 동영상 포맷 종류
- 동영상 사이즈 최적화
- 폰트 최적화
- 캐시 최적화
- 불필요한 css 제거

## 4장 이미지 갤러리 서비스

이미지 갤러리 서비스를 분석하고 최적화함.
이미지 갤러리에서 헤더 버튼을 누르면 이미지를 카테고리별로 필터링하여 볼 수 있고, 개별 이미지를 클릭하면 해당 이미지가 별도의 모달로 표시됨.

- React Devloper Tools 활용법
- 리액트 라이프사이클 분석 방법
- 이미지 지연 로딩
- 레이아웃 이동을 피하는 방법
- 리덕스의 useSelector 렌더링 최적화
- 메모이제이션의 개념과 이를 활용한 최적화
- 병목 함수 로직 개선

