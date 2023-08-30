import { Box, Button, Chip, Container, Divider, IconButton, Slider, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import User from "./User/User";
import AddIcon from '@mui/icons-material/Add';
function valuetext(value: number) {
    return `${value}°C`;
}
function Body() {
    const [handle, setHandle] = useState<string[]>([]);
    const [handleInput, setHandleInput] = useState<string>('')
    const [descriptionInput, setDescriptionInput] = useState<string>("")
    const [users, setUsers] = useState<any[]>()
    const [count, setCount] = useState<any>(100)
    const addHandler = () => {
        if(handleInput != ""){
            setHandle([...handle, handleInput])
            setHandleInput('')
        }
    }
    const changeHandleInput = (e: any) => {
        if (e.key === 'Enter') {
            addHandler()
            return
        }
        setHandleInput(e.target.value)
    }
    const deleteHandle = (h: string) => {
        setHandle(handle.filter(e => e != h))
    }
    const handleSubmit = () => {
        const requestBody = {
            handle,
            descriptionInput,
            count
        }
        console.log(requestBody);

        if (handle.length > 0 && descriptionInput != '') {
            fetch("http://localhost:5000"
            ,{
                method:'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query:descriptionInput,
                    user_list:handle,
                    user_limit:3
                }),
            }
            ).then(e => e.json()).then(e => {

                setUsers(e)
            })
        } else {
            alert("Empty handles or description!")
        }
    }
    return (
        <center>
            <Container maxWidth="lg">

                <Box sx={{ margin: '5rem 0' }}>
                    <Container maxWidth="md">
                        <Typography variant="h5">Search for people with similar interests</Typography>
                        <Box sx={{ height: '2rem' }} />
                        <Stack direction="row">

                            <TextField
                                id="outlined-basic"
                                label="Twitter handles"
                                variant="outlined"
                                fullWidth
                                onChange={changeHandleInput}
                                value={handleInput}
                                onKeyDown={changeHandleInput}
                                size="small"
                            />
                            <IconButton aria-label="delete" size="medium" onClick={addHandler}>
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>
                        <Box sx={{ margin: '1rem 0' }}>
                            {handle.length ? handle.map((h, i) => (
                                <Chip label={h} key={i} onDelete={() => deleteHandle(h)} sx={{ margin: '0.5rem' }} />
                            )) :
                                <Typography variant="body2">Handle list will appear here</Typography>
                            }
                        </Box>
                        <Box sx={{ height: '1rem' }} />
                        <Box>

                            <TextField
                                id="outlined-textarea"
                                label="Search description"
                                // placeholder="Placeholder"
                                rows={2}
                                multiline
                                fullWidth
                                value={descriptionInput}
                                onChange={e => setDescriptionInput(e.target.value)}
                                size="small"
                            />

                        </Box>
                        <Box sx={{ height: '1rem' }} />
                        <div style={{ alignSelf: "left" }}>
                            <Typography id="users-slider" gutterBottom>
                                How many results?
                            </Typography>
                        </div>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={100}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={100}
                            marks
                            min={100}
                            max={1000}
                            aria-labelledby="users-slider"
                            size="small"
                            onChange={(_, v) => setCount(v)}
                            value={count}
                        />
                        <Box sx={{ height: '2rem' }} />

                        <Button variant="contained" fullWidth onClick={handleSubmit} size="small">Search</Button>
                    </Container>
                </Box>
                <Divider flexItem>
                    {users && users.length && <Typography>Results</Typography>}

                </Divider>
                <Container maxWidth="sm">
                    {users && users.length && users.map(user => (
                        <User user={user} />
                    ))}
                </Container>
            </Container >
        </center >
    )
}

export default Body


// username list
// description
// amount of users