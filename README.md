# Redux Toolkit (RTK)

- 전역 상태(즉, Context)를 관리하는 `상태 관리도구`
  - Context API (리액트에 빌트인)
  - Redux, Redux Toolkit, Recoil, Zustands

## 관련 사이트

- https://redux.js.org/
- https://ko.redux.js.org/introduction/getting-started/

## 레퍼런스 사이트에서 RTK를 추천함

- `npm install @reduxjs/toolkit`
- `npm install redux`
- `npm i react-redux`

## RTK의 기본 예제(`순서를 준수`하자)

- 학습순서는 `무조건 순서`대로 하셔야 합니다
- 폴더구조, 파일명 등등..
- `/src/store` 폴더 생성 (전역 state 보관장소)

  - `store.js` 파일 생성

  ```js
  // store 설정
  // store는 전역에서 사용할 state를 말합니다
  // 회사에서는 /src/store 폴더를 주로 생성합니다
  // store는 1개만 만들 수 있습니다
  // 즉, 전역 state는 1개만 만들 수 있습니다

  import { configureStore } from "@reduxjs/toolkit";

  // 파일명은 주로 store.js라고 칭합니다
  const store = configureStore({
    reducer: {
      // store를 쪼개서 즉, slice해서 사용합니다
    },
  });

  export default store;
  ```

- `/src/features/counter` 폴더 생성

  - `counterSlice.js`

  ```js
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
  ```

- `/src/store/store.js`
  - Slice로 만든 reducer 배치

```js
// store 설정
// store는 전역에서 사용할 state를 말합니다
// 회사에서는 /src/store 폴더를 주로 생성합니다
// store는 1개만 만들 수 있습니다
// 즉, 전역 state는 1개만 만들 수 있습니다

import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer를 활용
import counterReducer from "../features/counter/counterSlice";
// 파일명은 주로 store.js라고 칭합니다
const store = configureStore({
  reducer: {
    // store를 쪼개서 즉, slice해서 사용합니다
    counter: counterReducer,
  },
});

export default store;
```

- `/src/components/Counter.jsx` 생성

```jsx
import { useDispatch, useSelector } from "react-redux";
// store에 저장된 Slice 중에 어떤 Slice의 Action을 쓸것인가
import { add, minus, reset } from "../features/counter/counterSlice";

function Counter() {
  // RTK의 store를 불러들여서 그 중 counter를 사용하겠다
  // 직접 state의 값에 접근
  // const count = useSelector(state => state.counter.count);
  // 객체 구조분해 할당으로 접근
  const { count } = useSelector(state => state.counter);
  // RTK의 store에 있는 counter 값 갱신 dispatch 사용하겠다
  const dispatch = useDispatch();
  return (
    <div>
      <p>카운터 값 : {count}</p>
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}
export default Counter;
```

- `/src/App.jsx`에 Provider 세팅 (`전역 store 접근`)

```jsx
import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store/store";

function App() {
  return (
    // 전역 store를 활용함
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
```

## todoSlice 추가 해보기

- `/src/feature/todo` 폴더 생성
- `/src/feature/todo/todoSlice.js` 파일 생성

```js
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
    // dispatch(addTodo("안녕"))
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },
    // action id:기존 아이디
    // dispatch(toggleTodo(452347621))
    toggleTodo: (state, action) => {
      // 배열.find는 true인 요소를 찾는다.
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // action id:기존 아이디
    // dispatch(deleteTodo(123456789))
    deleteTodo: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});
// dispatch action 함수 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
// 기본 리듀서를 내보냄
export default todoSlice.reducer;
```

- `/src/store/store.js에 todoSlice 추가` 한다

```js
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
// 파일명은 주로 store.js라고 칭합니다
const store = configureStore({
  reducer: {
    // store를 쪼개서 즉, slice해서 사용합니다
    counter: counterReducer,
    todo: todoReducer,
  },
});

export default store;
```

- /src/App.jsx가 아니고, `main.jsx에 Provider` 배치

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // 전역 store를 활용함
  <Provider store={store}>
    <App />
  </Provider>,
);
```

- /src/components/Todo.jsx

```jsx
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../features/todo/todoSlice";

function Todo() {
  // store의 todoSlice의 state 출력
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Todo</h1>
      <div>
        {todos.map(item => (
          <div key={item.id}>
            {item.title}
            <button onClick={() => dispatch(toggleTodo(item.id))}>변경</button>
            <button onClick={() => dispatch(deleteTodo(item.id))}>삭제</button>
          </div>
        ))}
        <button onClick={() => dispatch(addTodo("안녕할일"))}>추가</button>
      </div>
    </div>
  );
}

export default Todo;
```

## userSlice 추가 해보기

- `/src/feature/user` 폴더 생성
- `/src/feature/user/userSlice.js` 파일 생성

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    showInfo: state => {
      console.log("사용자 정보 : ", state);
    },
  },
});
export const { showInfo } = userSlice.actions;
export default userSlice.reducer;
```

- `/src/store/store.js에 userSlice 추가` 한다

```js
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
```

- `userSlice.js`에 비동기 API 연동 추가
  - extraReducers와 createAsyncThunk를 체크하자

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: null,
};
// 비동기 작업
// redux toolkit에 있는 외부 Api 연동을 위한 AsyncThunk 만들기
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});
export const fetchUserOne = createAsyncThunk("user/fetchUserOne", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  return res.data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    showInfo: state => {
      console.log("사용자 정보 : ", state);
    },
  },
  // 비동기 즉, api 연동 작업 후 slice의 state 관리
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // 연결중..
        // console.log("fetchUser.pending : ", action);
        state.loading = true;
        state.error = null;
        // state.data = [];
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // 성공적 연결 및 데이터출력
        // console.log("fetchUser.fulfilled : ", action);
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // console.log("fetchUser.rejected : ", action);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserOne.pending, (state, action) => {
        console.log("fetchUserOne.pending : ", action);
      })
      .addCase(fetchUserOne.fulfilled, (state, action) => {
        console.log("fetchUserOne.fulfilled : ", action);
      })
      .addCase(fetchUserOne.rejected, (state, action) => {
        console.log("fetchUserOne.rejected : ", action);
      });
  },
});
export const { showInfo } = userSlice.actions;
export default userSlice.reducer;
```

- `/src/components/UserInfo.jsx`

```jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserOne } from "../features/user/userSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.user);

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>UserInfo</h1>
      <button onClick={() => dispatch(fetchUser())}>호출</button>
      <button onClick={() => dispatch(fetchUserOne())}>개별호출</button>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default UserInfo;
```
