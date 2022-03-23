import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const isAndroid = () => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf("android") > -1) {
      return true;
    } else {
      return false;
    }
  };

  const [msg, setMsg] = useState(`hello ${isAndroid() ? "Android" : "IOS"}`);

  const callNative = () => {
    if (isAndroid()) {
      const script = document.createElement("script");
      script.text = "window.fromNative(Android.callNativeFunction());";
      document.body.appendChild(script);
    } else {
      try {
        window.webkit.messageHandlers.callbackHandler.postMessage(
          "callNativeFunction"
        );
      } catch (e) {
        const stringErr = e.toString();
        console.log(stringErr);
        setMsg(stringErr);
      }
    }
  };

  useEffect(() => {
    window.setMsg = setMsg;
    window.fromNative = (data) => {
      console.log("from Native");
      const parsed = JSON.parse(data);
      setMsg(`from Native, data: ${JSON.stringify(parsed)}`);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>v0.4</div>
        <input type={"number"} style={{ width: 200, height: 50 }}></input>
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={callNative}
          style={{
            width: 200,
            height: 130,
            fontSize: 30,
          }}
        >
          Call Native
        </button>
        <div>{msg}</div>
      </header>
    </div>
  );
}

export default App;
