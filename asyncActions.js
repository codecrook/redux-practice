const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");

const { createStore, applyMiddleware } = redux;

// Action Types //
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action Creators //
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = users => ({ type: FETCH_USERS_SUCCESS, payload: users });
const fetchUsersFailure = error => ({ type: FETCH_USERS_FAILURE, payload: error });

// Async Actions //
const fetchUsers = () => dispatch => {
    dispatch(fetchUsersRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            const { data: users } = response;
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error => fetchUsersFailure(error.message));
};


// Initial State //

const initialState = {
    loading: false,
    users: [],
    error: ''
};

// Reducer //
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return { ...state, loading: true };
        case FETCH_USERS_SUCCESS: return { ...state, loading: false, users: action.payload, error: '' };
        case FETCH_USERS_FAILURE: return { ...state, loading: false, users: [], error: action.payload };
    }
};

// Store //
const store = createStore(reducer, applyMiddleware(reduxThunk));

