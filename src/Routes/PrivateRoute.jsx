import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import { Navigate, useLocation} from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)
    const location = useLocation();
    if (!user) {
        return <Navigate to='/login' state={{from : location}} replace></Navigate>
    }
    return (
        children
    )
}
