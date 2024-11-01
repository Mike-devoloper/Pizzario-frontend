import React from "react"
import { Box, Container, Stack } from "@mui/material";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, Typography } from "@mui/joy";

import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieverNewDishes, retrieverTopUsers} from "./selector"
import { serverApi } from "../../../lib/data/config";
import { Member } from "../../../lib/data/types/member";


const TopUsersRetriever = createSelector(retrieverTopUsers,
    (topUsers) => ({topUsers}))

export default function ActiveUsers() {
    const {topUsers} = useSelector(TopUsersRetriever)
   
    return (
        <div className="active-users-frame">
            <Container>
                <Stack className="main">
                    <Box className="category-title">Active Users</Box>
                    <Stack className="cards-frame" direction="row" justifyContent="space-between" spacing={2}>
                        <CssVarsProvider>
                            {topUsers.length !== 0 ? (
                                topUsers.map((member: Member) => (
                                    <Card key={member._id} className="card" variant="outlined">
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={member.memberImage} alt={member.memberNick || "User Image"} />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="user-info">
                                            <Typography className="username">
                                                {member.memberNick}
                                            </Typography>
                                        </CardOverflow>
                                    </Card>
                                ))
                            ) : (
                                <Box className="no-data">Active Users are not available!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}