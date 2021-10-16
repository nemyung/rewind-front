import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store, { history } from './features/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
