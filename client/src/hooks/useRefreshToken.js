import { useDispatch, useSelector } from 'react-redux';
import { useLazyRefreshQuery } from "../redux/slices/authApiSlice"
import { selectCurrentUser } from "../redux/slices/authSlice"
import { setAuth } from '../redux/slices/authSlice'

export function useRefreshToken() {
    const [triggerRefresh] = useLazyRefreshQuery();
    const dispatch = useDispatch();
    const currentEmail = useSelector(selectCurrentUser)
    console.log('using useRefreshToken custom hook')
    console.log('this is the currentEmail in useRefreshToken custom hook ' + currentEmail)

    const refresh = async () => {
        try {
            console.log('trying to reach api in useRefreshToken custom hook')
            const response = await triggerRefresh();
            dispatch(setAuth({
                email: currentEmail,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }))
            console.log('this is the response in the useRefreshToken custom hook')
            console.log(response)
            return response.data.accessToken
        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}
