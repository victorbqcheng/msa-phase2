import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean,
    onLogin?: (username: string, password: string) => void,
    onClose?: () => void
};


const LoginDlg = ({ open, onLogin, onClose }: Props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin?.(username, password);
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                onClose={(_e: {}, reason: string) => { if (reason !== 'backdropClick') onClose?.() }}
            >
                <DialogTitle>{"Login"}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => onClose?.()}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Container maxWidth="xs">
                        <Box component="form" onSubmit={onSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') onLogin?.(username, password) }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mb: 2 }}
                                type='submit'
                            >
                                Login
                            </Button>
                        </Box>
                    </Container>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default LoginDlg