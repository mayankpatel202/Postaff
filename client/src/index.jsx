import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers/indexReducer.js';

/**
 * Create a new instant of ApolloClient and apply cache middleware
 * dataIdFromObject is a function that takes a data object and return
 * a unique identifier to be used when normalizing the data in the store.
 *
 * I would suggest this read if you're interest at reading more
 * https://www.apollographql.com/docs/react/advanced/caching.html#normalization
 */
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  dataIdFromObject: o => o.id,
  cache: new InMemoryCache(),
});

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') },
  },
  applyMiddleware(reduxThunk),
);

const Root = () => (
  <ApolloProvider client={ client }>
    <ReduxProvider store={ store }>
      <Fragment>
        <App />
      </Fragment>
    </ReduxProvider>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('app'),
);
