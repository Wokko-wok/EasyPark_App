import { createContext, useReducer, useEffect  } from "react";


// to see if localsotrage worked
// let user = null
// try {
//   JSON.parse(localStorage.getItem("user"))
// } catch {
//   console.log('No user stored in LocalStorage')
// }

const INITIAL_STATE = {
    //  check if user exsit in localStorage already, if yes the user already login 
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
        };
        case "LOGIN_SUCCESS":
            return {
                user: action.paylaod,
                loading: false,
                error: null,
        };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
        };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
        };
        default: return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
  
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          loading: state.loading,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  