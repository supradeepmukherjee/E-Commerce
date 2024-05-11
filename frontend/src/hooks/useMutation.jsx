import { useState } from "react"
import useAlert from '../hooks/useAlert'

const useMutation = useMutation => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [mutate] = useMutation()
    const executeMutation = async (alertMsg, ...args) => {
        setLoading(true)
        useAlert([], 'info', (alertMsg || 'Please wait...'))
        try {
            const res = await mutate(...args)
            if (res.data) {
                useAlert([], 'success', (res?.data?.msg || 'Success'))
                setData(res.data)
            } else
                useAlert([], 'error', (res?.error?.data?.msg || 'Something went wrong'))
        } catch (err) {
            console.log(err)
            useAlert([], 'error', 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return [executeMutation, loading, data]
}

export default useMutation