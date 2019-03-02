# redux-observe

[![Greenkeeper badge](https://badges.greenkeeper.io/DewarM/redux-observe.svg)](https://greenkeeper.io/)

![alt text](https://travis-ci.org/DewarM/redux-observe.svg?branch=v1.0.0)

## redux-observe is a small redux utility to help respond to particular changes in redux state.

### 1. Install
`npm install --save redux-observe`
### 2. Usage
```js
import observe from 'redux-observe';

observe(store, state => state.users, (userState) => console.log('Users changed!'));
```

### API Reference

`observe(store, selector, onChange)`

Observe runs the `onChange` function each time the selected state from `selector` changes.

#### Arguments
1. `store` store instance
2. `selector` _(Function)_: A selector function that will receive state and return a state slice that should be listened to for changes, `(state) => stateSlice`
3. `onChange` _(Function)_: A onChange function that will be called each time the state slice created from the `selector` function changes, `(stateSlice, dispatch) => {}`

#### Example
##### Each time `state.users` changes all user details are refetched.
```js
observe(store, state => state.users, (userState, dispatch) => {
    forEach(userState.allIds, id => {
        fetch(`/user/detail/${id}`)
            .then(r => r.json())
            .then(data => dispatch({type: 'USER_DETAILS', payload: data}))
    })
});
```

Tips:
- It will often make sense to extract `onChange` functions so that they are not defined inline.
- It is possible to get into an infinite loop - careful with dispatches!

