import { useEffect } from "react"
import toast from 'react-hot-toast'

const useErrors = errors => {
    useEffect(() => {
        errors.forEach(({ isError, error }) => {
            if (isError) toast.error(error?.data?.msg || 'Something went wrong')
        })
    }, [errors])
}

export default useErrors