// eslint-disable-next-line no-global-assign
export default alert = (type, setType, msg, setMsg, setVisible, dispatch) => {

    if (type === 'error') setType('error')
    else if (type === 'info') setType('info')
    else setType('success')

    setVisible('visible')
    setMsg(msg)

    setTimeout(() => {
        setVisible('hidden')
    }, 4200);
    if (type === 'error') dispatch({ type: 'clearError' })
    if (type === 'success') dispatch({ type: 'clearMsg' })

}