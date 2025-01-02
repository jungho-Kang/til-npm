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
