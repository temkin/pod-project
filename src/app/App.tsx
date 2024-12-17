import { BrowserRouter } from "react-router";
import Root from "./Root";
import { Provider } from "react-redux";
import store from "../store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
