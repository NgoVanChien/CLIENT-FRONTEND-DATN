import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <MessengerCustomerChat
          pageId="100089169848202"
          // pageId="104045158495285"
          appId="483410550637236"
        // htmlRef="<REF_STRING>"
        />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//- http: nhận dữ liệu & trả dữ liệu qua http
//- DTO: data transfer object
//- Business logic: handler logic data => client
