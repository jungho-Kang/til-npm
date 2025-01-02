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
