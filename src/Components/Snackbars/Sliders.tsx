import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface CustomizedSnackbarsProps {
    handleClick: () => void;
    alertOpen: boolean;
    message: string;
}

export default function CustomizedSnackbars({ handleClick, alertOpen, message }: CustomizedSnackbarsProps) {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        handleClick();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => handleClose()}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
