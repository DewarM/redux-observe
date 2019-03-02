export default function observeStore(store, selector, onChange) {
  let currentState;

  function handleChange() {
    const getNextState = () => selector(store.getState());
    const nextState = getNextState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(getNextState, store.dispatch);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
