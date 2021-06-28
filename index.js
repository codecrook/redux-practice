const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// Action Types //
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// Action Creators //
function buyCake() {
    return { type: BUY_CAKE };
}

function buyIceCream() {
    return { type: BUY_ICECREAM };
}

// Initial States //
const initialCakeState = {
    numOfCakes: 10
};

const initialIceCreamState = {
    numOfIceCreams: 20
}

// Reducers //
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return { ...state, numOfCakes: state.numOfCakes - 1 };
        default: return state;
    }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
        default: return state;
    }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// Store //
const store = createStore(rootReducer);

// getState() //
console.log("Initial State:", store.getState());

// Subscribe //
const unsubscribe = store.subscribe(() => console.log("Updated State:", store.getState()));

// Dispatch //
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// Unsubscibe //
unsubscribe();

// 10