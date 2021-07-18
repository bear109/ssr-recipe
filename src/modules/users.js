import axios from 'axios';

const GET_USERS_PENDING = 'user/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'user/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'user/GET_USERS_FAILURE';

const getUserPending = () => ({ type: GET_USERS_PENDING });
const getUserSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
const getUserFailure = (payload) => ({
  type: GET_USERS_FAILURE,
  error: true,
  payload,
});

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUserPending());
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    dispatch(getUserSuccess(response));
  } catch (e) {
    dispatch(getUserFailure(e));
    throw e;
  }
};

const initialState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false,
  },
  error: {
    users: null,
    user: null,
  },
};

function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, loading: { ...state.loading, users: true } };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        users: action.payload.data,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        error: { ...state.error, users: action.payload },
      };
    default:
      return state;
  }
}

export default users;
