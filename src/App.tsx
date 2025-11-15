import { Provider } from "react-redux";
import { store } from "./store/store";
import AppInitializer from "./AppInitializer";

function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

export default App;
