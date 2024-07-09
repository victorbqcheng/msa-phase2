import { Snackbar } from '@mui/material'
import React from 'react'
import stateStore from '../store/stateStore'
import { observer } from 'mobx-react-lite';

const GlobalMessage = () => {
    const onSnackClose = () => {
        stateStore.setOpenSnackbar(false);
    };
    return (
        <>
            <Snackbar
                open={stateStore.openSnackbar}
                autoHideDuration={3000}
                onClose={onSnackClose}
                message={stateStore.message}
            />
        </>
    )
}

export default observer(GlobalMessage)