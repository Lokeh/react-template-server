import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import BasicLayout from "../../layouts/Basic";
import asset from "../../common/asset";
import CounterApp from "../../apps/counter/app";

export default function Page(props) {
  const initialState = {
    count: props.count ? parseInt(props.count, 10) : 0,
    name: props.name ? props.name : ""
  };
  return (
    <BasicLayout>
      {/* Preload our state */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.__COUNTER_APP_DATA__ = ${JSON.stringify(initialState)};`
        }}
      />
      {/* Include the client side bundle */}
      <script src={asset("apps/counter/build/bundle.js")} />
      {/* Render to string (instead of static) so that React can mount
          on the div and reuse the DOM efficiently */}
      <div
        id="app"
        dangerouslySetInnerHTML={{
          __html: renderToString(<CounterApp {...props} />)
        }}
      />
    </BasicLayout>
  );
}