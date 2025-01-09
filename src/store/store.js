// store 설정
// store는 전역에서 사용할 state를 말합니다
// 회사에서는 /src/store 폴더를 주로 생성합니다
// store는 1개만 만들 수 있습니다
// 즉, 전역 state는 1개만 만들 수 있습니다

import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer를 활용
import counterReducer from "../features/counter/counterSlice";
// todo Reduce를 활용
import todoReducer from "../features/todo/todoSlice";
// 사용자 정보
import userReducer from "../features/user/userSlice";
// 파일명은 주로 store.js라고 칭합니다
const store = configureStore({
  reducer: {
    // store를 쪼개서 즉, slice해서 사용합니다
    counter: counterReducer,
    todo: todoReducer,
    user: userReducer,
  },
});

export default store;
