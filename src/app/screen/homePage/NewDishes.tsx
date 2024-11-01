import React from "react";
import { Box, Container, Stack } from "@mui/material";
import {
        AspectRatio,
        Card,
        CardOverflow,
        CssVarsProvider,
        Typography,
} from "@mui/joy";
import Divider from "../../components/divider";
import { Visibility } from "@mui/icons-material";

import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieverNewDishes} from "./selector"
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enums";
import { serverApi } from "../../../lib/data/config";


const NewDishesRetriever = createSelector(retrieverNewDishes,
    (newDishes) => ({newDishes}))

export default function NewDishes() {
    const {newDishes} = useSelector(NewDishesRetriever)
    return (
    <div className={"new-products-frame"}>
        <Container className={"main"}>
            <Box className={"category-title"}>Fresh Menu</Box>
            <Stack className={"cards-frame"}>
                <CssVarsProvider>
                    {newDishes.length !== 0 ? (
                    newDishes.map((ele: Product, ) => {
                        const imagePath = `${serverApi}/${ele.productImages[0]}`
                        const sizeVolume = ele.productCollection === ProductCollection.DRINK ? ele.productVolume + "l" : ele.productSize + " size"
                        return (
                            <Card key={ele._id} className={"card"} variant="outlined">
                                <CardOverflow>
                                    <div className={"product-sale"}>{sizeVolume}</div>
                                    <AspectRatio ratio={"1"}>
                                        <img src={imagePath} alt="" />
                                    </AspectRatio>
                                </CardOverflow>
                                <CardOverflow variant="soft" className={"product-detail"}>
                                    <Stack className={"info"}>
                                        <Stack flexDirection={"row"}>
                                            <Typography className={"title"}>
                                                {ele.productName}
                                            </Typography>
                                            <Divider width="2" height="24" bg="#d9d9d9"/>
                                            <Typography className={"price"}>${ele.productPrice}</Typography>
                                        </Stack>

                                        <Stack>
                                            <Typography className={"views"}>
                                                {ele.productViews}
                                                <Visibility 
                                                   sx={{ marginLeft: "5px", fontSize: 20 }}/>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardOverflow>
                            </Card>
                        );
                    })
                    ) : ( <Box className={"no-data"}>New products are not available!</Box>)}  
                </CssVarsProvider>
            </Stack>
        </Container>
    </div>
    );
}