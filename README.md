# KKO 로그인

- 카카오 개발자 등록 : https://developers.kakao.com
- 참고 : https://chunws13.tistory.com/63#google_vignette

## 앱 등록 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/db94fa79-ab4b-435b-985b-2af4b993a8ba)
- 과정 2
  ![Image](https://github.com/user-attachments/assets/a073f3d0-a558-4b74-9c8b-72da5207b084)
- 과정 3 (아이콘을 꼭 넣어주자)
  ![Image](https://github.com/user-attachments/assets/b16546e4-8126-4cba-9535-d887a73f3449)
- 과정 4
  ![Image](https://github.com/user-attachments/assets/8e02fff8-e040-4c9d-ab40-37778c673517)
- 과정 5
  ![Image](https://github.com/user-attachments/assets/a30ed210-3b3a-4f8e-884a-9f5814752255)
- 과정 6
  ![Image](https://github.com/user-attachments/assets/5bcab231-c3cf-474e-8d0d-d624715c19a1)
- 과정 7
  ![Image](https://github.com/user-attachments/assets/2272eda0-0cd8-4fa5-98bc-4155a3ce3c59)
- 과정 8 (리다이렉트 주소 작성)
  ![Image](https://github.com/user-attachments/assets/091155df-35e5-4464-bad3-ff22c7d23387)
- 과정 9
  ![Image](https://github.com/user-attachments/assets/d74fce7f-7db1-448e-87cb-d28fb8eaabdb)
- 과정 10
  ![Image](https://github.com/user-attachments/assets/124b4069-15c2-43b0-ae41-09e59d6f0c65)
- 과정 11
  ![Image](https://github.com/user-attachments/assets/907c61d2-7405-4853-889d-438fe585649e)
- 과정 12 (각 키를 .env에 보관해 두기)
  ![Image](https://github.com/user-attachments/assets/1fb4396d-68bf-44e9-bd80-1345bf45f43c)
- 과정 13 (동의항목)
  ![Image](https://github.com/user-attachments/assets/63a64ef7-82b9-4ed5-8f92-4f4d034b27ca)
  ![Image](https://github.com/user-attachments/assets/c68d8234-5a1f-4ba6-a44a-7033baad3ac4)
  ![Image](https://github.com/user-attachments/assets/6d26ce45-b381-4b6d-88a4-19c83366c08e)
- 과정 14 (추가권한)
  ![Image](https://github.com/user-attachments/assets/62af251c-3440-4476-aa29-f0ee94c6b1c0)
  ![Image](https://github.com/user-attachments/assets/bf4b494b-6103-4959-b93c-68504df67311)
  ![Image](https://github.com/user-attachments/assets/09254d76-30b4-48a9-a8ae-2c0d08c08ae8)

## .env 파일 작성

- vite 프로젝트이므로 접두어 `VITE_`가 필수로 작성됨

```txt
VITE_KKO_MAP_KEY=Map 키
VITE_KKO_LOGIN_REST_API_KEY=RESTAPI 키
VITE_KKO_LOGIN_JS_API_KEY=JS 키
```

## 카카오 로그인 기능 구현

- `/src/kko` 폴더 생성
- `/src/kko/kkoapi.js` 파일 생성

```js
// REST Key 처리
const rest_api_key = import.meta.env.VITE_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 성공시 이동할 경로
const redirect_uri = "http://localhost:5173/member/kko";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

## 회원가입 페이지 구성

- `/src/Join.jsx`

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kkoapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>SNS 로그인</h1>
      <div>
        <Link to={kakaoLogin}>카카오 로그인</Link>
      </div>
    </div>
  );
}
export default Join;
```

## 라우터 구성

- `/src/App.jsx`

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

## 인증키를 이용한 사용자 정보 알아내기

- 카카오 인증 후 정보 파악하기 위한 페이지 구성
- `/src/pages/member/After.jsx`

```jsx
import { useSearchParams } from "react-router-dom";

const After = () => {
  // 카카오 인증 알아내기
  // http://localhost:5173/member/kko?code=jAP3q9kan1tsRFA1IOYPw89xasovPu4twfaFHox-x3aOSM3Q1SWi0QAAAAQKPCJSAAABlNPHPDrdCc_9be4aqQ
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchparams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");
  return <div>인가키 {authCode}</div>;
};
export default After;
```

- 카카오 인증 후 정보 파악하기 위한 라우터 구성
- `/src/App.jsx` 추가

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

## 인가키 생성 후 Access Token 요청하기

- 인가키를 이용해서 Access Token을 발급하고
- 이 후로는 Access Token을 이용해서 여러가지 정보를 호출함
- `/src/kko/kkoapi.js` 기능 추가

```js
import axios from "axios";

// REST Key 처리
const rest_api_key = import.meta.env.VITE_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 성공시 이동할 경로
const redirect_uri = "http://localhost:5173/member/kko";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// Access Token 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };
  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};
// 토큰을 이용해서 사용자 정보 호출하기
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await axios.get(kko_user_api, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
```

## 실제 사용자 정보를 호출하기

- `/src/pages/member/After.jsx` 기능 추가 (Access Token 발급 및 사용자 정보 출력)
