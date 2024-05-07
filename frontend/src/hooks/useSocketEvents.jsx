import { useEffect } from "react"

const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([e, handler]) => {
            socket.on(e, handler)
        })
        return () => {
            Object.entries(handlers).forEach(([e, handler]) => {
                socket.off(e, handler)
            })
        }
    }, [handlers, socket])
}

export default useSocketEvents