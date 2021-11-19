import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

import wrapper from "../store/store";
import theme from "../theme";

const MainRoot = styled(Grid)(({}) => ({
  margin: "0 auto",
}));
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MainRoot item container xs={10} justifyContent="center" wrap="nowrap">
        <Component {...pageProps} />
      </MainRoot>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
