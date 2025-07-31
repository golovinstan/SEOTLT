import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from './routes/rootrouter'

import { NotesContext, notesInterface } from './NotesContext'

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <NotesContext.Provider value={notesInterface}>
          <RootRouter />
        </NotesContext.Provider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);