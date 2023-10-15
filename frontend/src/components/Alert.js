import Stack from '@mui/material/Stack';
import AlertMUI from '@mui/material/Alert';

const Alert = ({ alertVisibility, alertMsg, alertType }) => {
    return (
        <Stack sx={{ width: 'max-content', position: 'fixed', left: 0, right: 0, margin: '5vh auto', zIndex: '100' }}>
            <AlertMUI variant="filled" severity={alertType} style={{ visibility: alertVisibility, fontSize: '3vh' }}>
                {alertMsg}
            </AlertMUI>
        </Stack>
    )
}

export default Alert