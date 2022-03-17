import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("hello");
  const callNative = () => {
    try {
      window.webkit.messageHandlers.callbackHandler.postMessage(
        "callNativeFunction"
      );
    } catch (e) {
      const stringErr = e.toString();
      console.log(stringErr);
      setMsg(stringErr);
    }
  };

  useEffect(() => {
    window.fromNative = () => {
      console.log("from Native");
      setMsg("from Native");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
