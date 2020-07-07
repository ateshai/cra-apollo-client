import React from "react";
import { ApolloProvider } from "@apollo/react-common";
import { StaticRouter } from "react-router";

import Layout from "../../routes/Layout";

function App(props) {
  // console.log("app props", props);
  const { client, location, context } = props;

  return (
    <ApolloProvider client={client}>
      <StaticRouter location={location} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );
}

export default App;
