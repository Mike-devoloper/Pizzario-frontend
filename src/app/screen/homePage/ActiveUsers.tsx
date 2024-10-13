import React from "react"
import { Box, Container, Stack } from "@mui/material";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, Typography } from "@mui/joy";

const activeUsers = [
    { memberName: "Martin", imagePath: "/img/martin.webp" },
    { memberName: "Justin", imagePath: "/img/justin.webp" },
    { memberName: "Rose",   imagePath: "/img/rose.webp" },
    { memberName: "Nusret", imagePath: "/img/nusret.webp" },
]

export default function ActiveUsers() {
    return( 
     <div className="active-users-frame">
                    <Container>
                        <Stack className="main">
                            <Box className="category-title">Active Users</Box>
                            <Stack className="cards-frame" direction="row" justifyContent="space-between" spacing={2}>
                                <CssVarsProvider>
                                    {activeUsers.length !== 0 ? (
                                    activeUsers.map((user, index) => (
                                        <Card key={index} className="card" variant="outlined">
                                            <CardOverflow>
                                                <AspectRatio ratio="1">
                                                    <img src={user.imagePath} alt={user.memberName} />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className="user-info">
                                                <Typography className="username">
                                                    {user.memberName}
                                                </Typography>
                                            </CardOverflow>
                                        </Card>
                                    ))
                                    ) : (<Box className={"no-data"}>Active Users are not available!</Box>)}
                                </CssVarsProvider>
                            </Stack>
                        </Stack>
                    </Container>
                </div>
        
    );
}