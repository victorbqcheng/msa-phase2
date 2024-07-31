import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


import BlogIcon from '../assets/blog-icon.png';
import { Link } from 'react-router-dom';


type Page = {
    title: string;
    href: string;
};

type Props = {
    onClickLogin?: () => void;
    onClickRegister?: () => void;
    onClickUserProfile?: () => void;
    onClickLogout?: () => void;
    userName?: string | null;
};

const pages: Page[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'About',
        href: '/about'
    }
];

function ResponsiveAppBar({ onClickLogin, onClickRegister, onClickUserProfile, onClickLogout, userName }: Props) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const loginButtonRef = React.useRef<HTMLButtonElement>(null);
    const userButtonRef = React.useRef<HTMLButtonElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        userButtonRef.current?.blur();
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const _onClickLogin = () => {
        loginButtonRef.current?.blur();
        onClickLogin?.();
    };
    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    {/* -------------------xs screen--------------------- */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                pages.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu} sx={{p:0}}>
                                        <Link style={{ textDecoration: 'none', padding:'10px' }} to={page.href}>{page.title}</Link>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Avatar src={BlogIcon} />
                    </Box>

                    {/* ------------------md screen---------------------- */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Avatar src={BlogIcon} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
                        {
                            pages.map((page) => (
                                <Button key={page.title} sx={{ mx: 2, color: 'white', p:0 }}><Link style={{ textDecoration: 'none', width:'100%' }} to={page.href}>{page.title}</Link></Button>
                            ))
                        }
                    </Box>
                    {/* ---------------------------------------- */}
                    {
                        userName ? (
                            <>
                                <Button ref={userButtonRef} sx={{ color: 'white' }} onClick={handleOpenUserMenu}>{userName}</Button>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => { onClickUserProfile?.(); handleCloseUserMenu(); }}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { onClickLogout?.(), handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button sx={{ color: 'white' }} ref={loginButtonRef} onClick={_onClickLogin}>Login</Button>
                                <Button sx={{ color: 'white' }} onClick={() => onClickRegister?.()}>Register</Button>
                            </>)
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
