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
      script.text = "Android.callNativeFunction();";
      document.body.appendChild(script);
    } else {
      try {
        // const script = document.createElement("script");
        // script.text =
        //   'console.log(\'added script\'); window.fromNative(\'{"browsers":{"firefox":{"name":"Firefox","pref_url":"about:config","releases":{"1":{"release_date":"2004-11-09","status":"retired","engine":"Gecko","engine_version":"1.7"}}}}}\');';
        // document.body.appendChild(script);
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
    window.fromNative = (data) => {
      console.log("from Native");
      const parsed = JSON.parse(data);
      setMsg(`from Native, data: ${JSON.stringify(parsed)}`);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>v0.1</div>
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
