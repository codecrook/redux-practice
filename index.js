const redux = require('redux');
const reduxLogger = require('redux-logger');
const { createStore, combineReducers, applyMiddleware } = redux;
const { createLogger } = reduxLogger;

// Action Types //
const BUY_CAKE = 'BUY_CAKE';
const STOCKUP_CAKE = 'STOCKUP_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
const STOCKUP_ICECREAM = 'STOCKUP_ICECREAM';

// Action Creators //
function buyCake() {
    return { type: BUY_CAKE };
}

function stockupCake(numOfCakes) {
    return { type: STOCKUP_CAKE, numOfCakes };
}

function buyIceCream() {
    return { type: BUY_ICECREAM };
}

function stockupIceCream(numOfIceCreams) {
    return { type: STOCKUP_ICECREAM, numOfIceCreams };
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
        case STOCKUP_CAKE: return { ...state, numOfCakes: state.numOfCakes + action.numOfCakes };
        default: return state;
    }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
        case STOCKUP_ICECREAM: return { ...state, numOfIceCreams: state.numOfIceCreams + action.numOfIceCreams };
        default: return state;
    }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// Middleware //
const logger = createLogger();

// Store //
const store = createStore(rootReducer, applyMiddleware(logger));

// getState() //
console.log("Initial State:", store.getState());

// Subscribe //
const unsubscribe = store.subscribe(() => { });

// Dispatch //
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(stockupCake(10));
store.dispatch(buyIceCream());
store.dispatch(stockupIceCream(15));

// Unsubscibe //
unsubscribe();

// 12