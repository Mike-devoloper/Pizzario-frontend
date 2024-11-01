import React from "react"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import {CssVarsProvider}  from "@mui/joy/styles"
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Container, Stack } from "@mui/material";
import { DescriptionOutlined, Visibility } from "@mui/icons-material";
import CardOverflow from "@mui/joy/CardOverflow";


import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieverPopularDishes} from "./selector"
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enums";
import { serverApi } from "../../../lib/data/config";


const PopularDishesRetriever = createSelector(retrieverPopularDishes,
    (popularDishes) => ({popularDishes}))



export default function PopularDishes() {
    const {popularDishes} = useSelector(PopularDishesRetriever)
    console.log("popularDishes => ", popularDishes);
    return (
    <div className="popular-dishes-frame">
        <Container>
            <Stack className="popular-section">
                <Box className={"category-title"}>Popular Dishes</Box>
                <Stack className="cards-frame">
                {popularDishes.length !== 0 ? (
                popularDishes.map((ele: Product, ) => {
                    const imagePath = `${serverApi}/${ele.productImages[0]}`
                    return(
                        <CssVarsProvider key={ele._id}> 
                    <Card className={"card"}>
                        <CardCover>
                            <img src={imagePath} alt="" />
                        </CardCover>
                        <CardCover className={"card-cover"}/>
                        <CardContent sx={{justifyContent:"flex-end"}}>
                            <Stack 
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            >
                               <Typography
                               level="h2"
                               fontSize={"lg"}
                               textColor={"#fff"}
                               mb={1}
                               >
                                {ele.productName}
                               </Typography>

                               <Typography
                                sx={{
                                    fontWeight: "md",
                                    color: "neutral.300",
                                    alignItems: "center",
                                    display: "flex",
                                }}
                               >
                               {ele.productViews}
                               <Visibility sx={{
                                fontSize:25, marginLeft: "5px"
                               }}/>
                               </Typography>

                            </Stack>
                        </CardContent>
                        <CardOverflow
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                py: 1.5,
                                px:"var(--Card-padding)",
                                borderTop: "1px solid ",
                                height: "60px"
                            }}
                        >
                            <Typography
                               startDecorator={<DescriptionOutlined/>}
                               textColor="neutral.300" >
                              {ele.productDesc}
                            </Typography>
                        </CardOverflow>
                        
                    </Card>  
                </CssVarsProvider>   
                    )
            }) ) : (<Box className={"no-data"}>New products are not available!</Box>)}                                                           
                </Stack>
            </Stack>
        </Container>
    </div>
    );
}