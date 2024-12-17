import { BrowserRouter } from "react-router";
import Root from "./Root";
import { Provider } from "react-redux";
import store from "../store";
import { MODES } from "../env";

const App = () => {
  const basename = import.meta.env.MODE === MODES.PROD ? `/pod-project` : "/";

  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Root />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
