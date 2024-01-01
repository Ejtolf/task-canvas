import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface CustomizedSnackbarsProps {
    handleClick: () => void;
}

export default function CustomizedSnackbars({ handleClick }: CustomizedSnackbarsProps) {
    const [open, setOpen] = React.useState(false);

    const handleButtonClick = () => {
        handleClick();
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose()}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </Stack>
    );
}
