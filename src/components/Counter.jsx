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
