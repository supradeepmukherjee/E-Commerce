import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { removeAlert, showError, showInfo, showSuccess } from "../redux/reducers/alert"

const useAlert = (errors = [], t = '', m = '') => {
    const dispatch = useDispatch()
    if (t === 'success') dispatch(showSuccess(m))
    if (t === 'info') dispatch(showInfo(m))
    setTimeout(() => {
        dispatch(removeAlert())
    }, 4200);
    useEffect(() => {
        if (t === 'error') dispatch(showError(m))
        else
            errors.forEach(({ isError, error }) => {
                if (isError) {
                    dispatch(showError(error?.data?.msg || 'Something went wrong'))
                }
            })
    }, [errors, dispatch, t, m])
}

export default useAlert