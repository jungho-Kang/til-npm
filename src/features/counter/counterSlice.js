import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

// 코딩 컨벤션
// Slice는 store를 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이스 구분 이름
  name: "counterSlice", // 문자열
  // 슬라이스 초기 값
  initialState, // `initialState: initialState`의 축약형
  // store/counterSlice에 저장된 값 갱신 함수
  // 상태를 갱신해주는 함수 묶음
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 0;
    },
  },
});

// Reducer 함수를 외부로 내보내서 dispatch를 해주도록
// action : type의 구분, payload 전달
export const { add, minus, reset } = counterSlice.actions;
export default counterSlice.reducer;
