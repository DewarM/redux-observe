import { createStore } from "redux";
import observe from ".";

describe("observe", () => {
  it("should not call onChange of there is no state to update with", () => {
    const reducer = (state, action) => ({ ...state, [action.id]: action });
    const store = createStore(reducer);
    const aSelector = state => state.a;
    const onChange = jest.fn();
    observe(store, aSelector, onChange);
    expect(onChange).toBeCalledTimes(0);
  });

  it("should call onChange if there is state", () => {
    let onChangeCalledTimes = 0;
    const reducer = (state = { a: { id: "a" } }, action) => ({
      ...state,
      [action.id]: action
    });
    const store = createStore(reducer);
    const aSelector = state => state.a;
    const onChange = () => {
      onChangeCalledTimes += 1;
    };
    observe(store, aSelector, onChange);
    expect(onChangeCalledTimes).toBe(1);
  });

  it("should call onChange after a dispatch causes a change that the consumer is interested in", () => {
    let onChangeCalledTimes = 0;
    const reducer = (state = { a: { id: "a" } }, action) => ({
      ...state,
      [action.id]: action
    });
    const store = createStore(reducer);
    const aSelector = state => state.a;
    const onChange = () => {
      onChangeCalledTimes += 1;
    };
    observe(store, aSelector, onChange);
    store.dispatch({ type: "testAction", id: "a" });
    store.dispatch({ type: "testAction", id: "a" });
    expect(onChangeCalledTimes).toBe(3);
  });
});
