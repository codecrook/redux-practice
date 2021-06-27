const redux = require('redux');
const createStore = redux.createStore;

// Action Types //
const BUY_CAKE = 'BUY_CAKE';

// Action Creators //
function buyCake() {
    return { type: BUY_CAKE };
}

// Initial State //
const initialState = {
    numOfCakes: 10
};

// Reducer //
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return { ...state, numOfCakes: state.numOfCakes - 1 };
        default: return state;
    }
};

// Store //
const store = createStore(reducer);

// getState() //
console.log("Initial State:", store.getState());

// Subscribe //
const unsubscribe = store.subscribe(() => console.log("Updated State:", store.getState()));

// Dispatch //
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

// Unsubscibe //
unsubscribe();