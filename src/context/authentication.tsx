'use client'
import { createContext, ReactNode, useContext, useReducer } from "react";
import AuthReducer, { AuthActions } from "./authReducer";

export interface InitialAuthStateInterface {
    phoneVerifyToken: string | undefined;
}
const InitialAuthState: InitialAuthStateInterface = {
    phoneVerifyToken: undefined,
};

const AuthStateContext = createContext<InitialAuthStateInterface | undefined>(
    undefined
);
const AuthDispatchContext: any = createContext<any>(undefined);

export const useAuthDispatch = () => useContext(AuthDispatchContext);
export const useAuthState = () => useContext(AuthStateContext);

const AuthProvider = ({ children }: { children: Readonly<ReactNode> }) => {
    const [state, dispatch] = useReducer(AuthReducer, InitialAuthState);
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
};
export default AuthProvider;

export const addPhoneVerifyToken = (token: string) => ({
    type: AuthActions.addPhoneToken,
    payload:token,
});
