import { BrowserRouter } from "react-router";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import Root from "./Root";
import { Provider } from "react-redux";
import store from "../store";
import { MODES } from "../env";

const App = () => {
  const basename = import.meta.env.MODE === MODES.PROD ? `/pod-project` : "/";

  return (
    <Provider store={store}>
      <NotificationsProvider>
        <BrowserRouter basename={basename}>
          <Root />
        </BrowserRouter>
      </NotificationsProvider>
    </Provider>
  );
};

export default App;
