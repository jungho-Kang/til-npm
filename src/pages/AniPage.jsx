import anime from "animejs";

import { useEffect } from "react";
import { useRef } from "react";

const AniPage = () => {
  const BoxWrap = {
    position: "releative",
    width: "100%",
    height: "80vh",
    backgroundColor: "yellowgreen",
  };
  const BoxStyle = {
    position: "absolute",
    left: 100,
    top: 250,
    width: 100,
    height: 100,
    backgroundColor: "red",
  };

  // 만약 html 이었으면 querySelector(".클래스명")
  // React 이므로 useRef 로 html 태그를 참조한다.
  const boxRef = useRef(null);
  // 버튼 이벤트에서 anime 적용해보기
  const motionA = () => {
    anime({
      targets: boxRef.current,
      left: "240px",
      backgroundColor: "#FFF",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });
  };
  const motionB = () => {
    anime({
      targets: boxRef.current,
      scale: 1.5,
      duration: 2000,
      backgroundColor: "#0F0",
    });
  };
  const motionC = () => {
    anime({
      targets: boxRef.current,
      scale: 1,
      left: 0,
      duration: 2000,
      backgroundColor: "#F00",
    });
  };

  // 실제 anime 적용해보기
  useEffect(() => {
    const box = boxRef.current;
    // anime({
    //   targets: box,
    //   translateX: 150,
    //   duration: 5000,
    //   rotate: "1turn",
    // });
  }, []);

  return (
    <div>
      <h1>AniPage</h1>
      <div>
        <button onClick={motionA}>효과 1</button>
        <button onClick={motionB}>효과 2</button>
        <button onClick={motionC}>효과 3</button>
      </div>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}></div>
      </div>
    </div>
  );
};
export default AniPage;
