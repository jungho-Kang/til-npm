import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoSlice",
  // 최초로 보관 데이터
  initialState,

  // reducer 함수 : store의 todoSlice의 state를 갱신
  // state는 slice에 보관하고 있는 데이터
  // action은 state에 업데이트할 새로운 데이터
  reducers: {
    // action {id:Date.now(), title: "안녕하세요", completed: false}
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },
    // action id:기존 아이디
    toggleTodo: (state, action) => {},
    // action id:기존 아이디
    deleteTodo: (state, action) => {},
  },
});
