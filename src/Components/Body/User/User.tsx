import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material"
import { Fragment } from "react"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function User({user}:any) {
    return (
        <Fragment>
            <Box sx={{ margin: '0.5rem 1rem', padding: '1rem 0' }}>
                <Stack direction="row" sx={{display:'flex',justifyContent:"space-between"}}>
                    <Stack direction="row" >
                        <Avatar alt="Remy Sharp" src={`https://robohash.org/${Math.random()}`} />
                        <Box sx={{ textAlign: 'left',marginLeft:'1rem' }}>
                            <Typography>{user.name}</Typography>
                            <Typography color="gray">@{user.username}</Typography>
                        </Box>
                    </Stack>
                    <Button startIcon={<OpenInNewIcon />}>Visit profile</Button>
                </Stack>

            </Box>
            <Divider />
        </Fragment>
    )
}

export default User
