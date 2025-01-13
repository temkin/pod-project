import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { ThemeProvider } from "@mui/material";
import store from "../store";
import { MODES } from "../env";
import { lightTheme } from "../themes";
import Root from "./Root";

const App = () => {
  const basename = import.meta.env.MODE === MODES.PROD ? `/pod-project` : "/";

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter basename={basename}>
          <NotificationsProvider>
            <Root />
          </NotificationsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
