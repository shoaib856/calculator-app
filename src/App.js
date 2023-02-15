import { useReducer } from "react";
import "./App.sass";
import DigitBtn from "./components/digitBtn";
import OperationBtn from "./components/operationBtn";

function reducer(state, { type, payload }) {
  switch (type) {
    case "digit":
      if (payload.digit === "0" && state.current === "0") return state;
      if (payload.digit === "." && state.current == null)
        return { ...state, current: "0." };
      if (payload.digit === "." && state.current.includes(".")) return state;

      if (!state.overwrite)
        return { ...state, current: payload.digit, overwrite: true };
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    case "operation":
      if (state.current == null) return state;
      if (state.previous != null && state.current != null)
        return {
          ...state,
          previous: `${evaluate(
            state.current,
            ...[state.previous.split(" ")]
          )} ${payload.operation}`,
          current: null,
        };
      return {
        ...state,
        previous: `${state.current} ${payload.operation}`,
        current: null,
      };
    case "reset":
      return {};
    case "del":
      if (state.current == null) return state;
      if (state.current.length === 1) return {};
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case "eval":
      if (
        state.current === "" ||
        state.current == null ||
        state.previous == null
      )
        return state;
      return {
        ...state,
        previous: null,
        current: evaluate(state.current, ...[state.previous.split(" ")]),
        overwrite: false,
      };
    default:
      break;
  }
}
function evaluate(current, previous) {
  let [prev, op] = previous;
  current = parseFloat(current);
  prev = parseFloat(prev);
  switch (op) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "x":
      return prev * current;
    case "/":
      return (prev / current).toFixed(5);
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    current: null,
    previous: null,
    overwrite: true,
  });
  return (
    <div className="calculator">
      <div className="container">
        <div className="content">
          <div className="theme-change">
            <p>calc</p>
            <div>
              <p>THEME</p>
              <div className="theme-number">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <div className="theme-change-toggle">
                <span className="ball"></span>
              </div>
            </div>
          </div>

          <div className="screen">{state.current ?? state.previous ?? ""}</div>

          <div className="btns-container">
            <DigitBtn digit={"7"} dispatch={dispatch} />
            <DigitBtn digit={"8"} dispatch={dispatch} />
            <DigitBtn digit={"9"} dispatch={dispatch} />
            <button
              type="button"
              className="del"
              onClick={() => dispatch({ type: "del" })}
            >
              DEL
            </button>
            <DigitBtn digit={"4"} dispatch={dispatch} />
            <DigitBtn digit={"5"} dispatch={dispatch} />
            <DigitBtn digit={"6"} dispatch={dispatch} />
            <OperationBtn operation={"+"} dispatch={dispatch} />
            <DigitBtn digit={"1"} dispatch={dispatch} />
            <DigitBtn digit={"2"} dispatch={dispatch} />
            <DigitBtn digit={"3"} dispatch={dispatch} />
            <OperationBtn operation={"-"} dispatch={dispatch} />
            <DigitBtn digit={"."} dispatch={dispatch} />
            <DigitBtn digit={"0"} dispatch={dispatch} />
            <OperationBtn operation={"/"} dispatch={dispatch} />
            <OperationBtn operation={"x"} dispatch={dispatch} />
            <button
              type="button"
              className="span-2 reset"
              onClick={() => {
                dispatch({ type: "reset" });
              }}
            >
              RESET
            </button>
            <button
              type="button"
              className="span-2 evaluate"
              onClick={() => dispatch({ type: "eval" })}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
