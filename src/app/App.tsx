import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
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
            <Root />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
