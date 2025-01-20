import axios from "axios";
import { useEffect } from "react";
import jwtAxios from "./apis/jwt";
import { removeCookie, setCookie } from "./utils/cookie";
import { useRecoilState } from "recoil";

function App() {
  const [user, setUser] = useRecoilState();
  const loginApi = async () => {
    try {
      // 여기는 일반 axios로 로그인을 하고 jwt를 발급받는다
      const res = await axios.get("/api/user/access-token");
      // 성공 시 리턴되는 jwt키를 쿠키에 보관한다
      setCookie("accessToken", res.data.resultData);
      // 사용자의 정보를 App 전체에서 접근하려고 한다
      // useRecoilState를 가지고서 앱 전체에서 활용하도록
    } catch (error) {
      console.log(error);
      // 실패 시 jwt를 지워주는 코드 쿠키에서 제거
      removeCookie("accessToken");
    }
  };
  useEffect(() => {
    loginApi();
  }, []);

  // jwt 인증키가 반드시 필요한 axios 호출
  const userInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      console.log(res);
      // Recoil 정보 업데이트 하기
      setUser({ ...res.data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={userInfo}>JWT를 활용한 호출</button>
    </div>
  );
}
export default App;
