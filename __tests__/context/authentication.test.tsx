import AuthProvider, { addPhoneVerifyToken, useAuthDispatch, useAuthState } from '@Context/authentication';
import { render, screen } from '@testing-library/react';
import { beInDom } from '@Tests/testFunction.test';
import { FC, useEffect } from 'react';

const AuthTestComponent: FC = () => {
    const dispatch = useAuthDispatch();
    useEffect(() => {

        dispatch(addPhoneVerifyToken("verify token"))
    },[])
    return (
        <div data-testid="phoneVerifyToken">{useAuthState().phoneVerifyToken}</div>
    )
}
// Before Each


describe('authentication context tests', () => {
    it('displays phone verify token', () => {
        render(
            <AuthProvider>
                <AuthTestComponent />
            </AuthProvider>
        )
        const state = screen.getByTestId('phoneVerifyToken')
        beInDom(state)
        expect(state).toHaveTextContent('verify token')
    })
})