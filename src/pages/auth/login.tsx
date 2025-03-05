import SignInLayout from '@Auth/signin'
import type { NextPage } from 'next'
import FormsLayout from "@Auth/FormsLayout"
import { useAppDispatch } from '@Libs/hooks'

const login: NextPage = () => {
    const dispatch = useAppDispatch()
    return (
        <FormsLayout title='Login to Shopy'>
            <SignInLayout dispatch={dispatch}/>
        </FormsLayout>
    )
}

export default login