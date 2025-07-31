import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./theme/AppTheme";
import { AppAppBar } from "./components/AppAppBar";
import { NewsList } from "./components/newslist";


export const MainPage: React.FC<React.PropsWithChildren<{ disableCustomTheme?: boolean }>> = ({disableCustomTheme, children, ...props}) =>  {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <div>
        <NewsList />
        {children}
      </div>
    </AppTheme>
  );
}
