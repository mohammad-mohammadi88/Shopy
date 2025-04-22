'use client'
import { type ActionDispatch, createContext, type ReactNode, useContext, useReducer } from "react";
import AuthReducer, { Action, AuthActions } from "./authReducer";

export interface InitialAuthStateInterface {
    phoneVerifyToken: string | undefined;
}
const InitialAuthState: InitialAuthStateInterface = {
    phoneVerifyToken: undefined,
};

export const AuthStateContext = createContext<InitialAuthStateInterface>(
    InitialAuthState
);
export const AuthDispatchContext: any = createContext<any>(undefined);

export const useAuthDispatch = ():ActionDispatch<[action: Action]> => useContext(AuthDispatchContext);
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
