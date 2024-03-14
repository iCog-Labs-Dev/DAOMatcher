import { AppBar, Toolbar, Typography } from '@mui/material'

function Header() {
    return (
        <AppBar position="fixed" color="transparent" elevation={0}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    DAOMatcher
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
