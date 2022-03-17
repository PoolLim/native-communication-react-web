import logo from "./logo.svg";
import "./App.css";

function App() {
  const callNative = () => {
    window.webkit.messageHandlers.callbackHandler.postMessage(
      "callNativeFunction"
    );
  };
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
      </header>
    </div>
  );
}

export default App;
