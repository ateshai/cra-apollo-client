// import { ApolloProvider } from "@apollo/react-common";
import { ApolloClient } from "apollo-client";
// import { SchemaLink } from "apollo-link-schema";
import { createHttpLink } from "apollo-link-http";
import Express from "express";
// import { StaticRouter } from "react-router";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getDataFromTree } from "@apollo/react-ssr";
import fetch from "node-fetch";
import React from "react";
import ReactDOM from "react-dom/server";

import App from "../components/App";

const manifest = require("../../build/public/manifest.json");

const basePort = 8081;

const app = new Express();

app.use(Express.static("build/public"));
app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: "https://48p1r2roz4.sse.codesandbox.io",
      credentials: "same-origin",
      headers: {
        cookie: req.header("Cookie"),
      },
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const jsx = (
    <App render="server" client={client} location={req.url} context={context} />
  );

  // during request (see above)
  getDataFromTree(jsx).then(() => {
    // We are ready to render for real
    const content = ReactDOM.renderToString(jsx);
    const initialState = client.extract();

    const html = <Html content={content} state={initialState} />;

    const scripts = Object.values(manifest)
      .filter((item) => item.includes(".js"))
      .map((item) => {
        // console.log("asdasd", item);
        // console.log("asd", `<script src="${item}"></script>`);
        return `<script src="${item}"></script>`;
      });
    scripts.reverse();

    res.status(200);
    res.send(`<!doctype html>\n
    <html>\n
      <body>\n
      ${ReactDOM.renderToStaticMarkup(html)}\n
      ${scripts.join("")}
    </body>\n
  </html>`);
    res.end();
  });
});

function Html({ content, state }) {
  return (
    <>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </>
  );
}

app.listen(basePort, () =>
  console.log(
    // eslint-disable-line no-console
    `app Server is now running on http://localhost:${basePort}`
  )
);
