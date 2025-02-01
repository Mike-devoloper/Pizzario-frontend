import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import { Product, ProductInquiry } from "../../../lib/data/types/product";
import { setChosenProduct, setProducts, setRestaurant } from "./slice";
import { Dispatch } from '@reduxjs/toolkit';
import {createSelector} from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enums";
import { useDispatch, useSelector,} from "react-redux";
import { serverApi } from "../../../lib/data/config";
import { useHistory, useParams } from "react-router-dom";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/data/types/member";
import { CartItem } from "../../../lib/data/types/search";
import Typography from "../../MaterialTheme/typography";

const actionDispatch = (dispatch:Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products
}))

interface ProductsProps {
  onAdd: (item:CartItem) => void
}


const returantImg = [
  { restImg: "/img/italian-pizza.png" },
  { restImg: "/img/fauget-pizza.png" },
  { restImg: "/img/pizza-hut.png" },
  { restImg: "/img/pizzota.jpeg" },
];


export default function Products(props: ProductsProps) {
  const {setProducts} = actionDispatch(useDispatch())
  const {products} = useSelector(productsRetriever)
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
     page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: ""
  });
  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch).then((data) =>  setProducts(data))
    .catch((err) => {
      console.log("ERROR on GetProducts", err)
    })
  }, [productSearch]);

  const [searchText, setSearchProduct] = useState<string>("")
  

  useEffect(() => {
    if(searchText === "") productSearch.search = ""
    setProductSearch({...productSearch});
  }, [searchText])

  
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1
    productSearch.productCollection = collection
    setProductSearch({ ...productSearch});
  };

  const [selectedSortOrder, setSelectedSortOrder] = useState<string>("createdAt")

  const searchOrderHandler = (order: string) => {
    setSelectedSortOrder(order)
    productSearch.page = 1
    productSearch.order = order
    setProductSearch({...productSearch});
  }
  
  const searchProductHandler = () => {
    productSearch.search = searchText
    setProductSearch({...productSearch})
  }

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value
    setProductSearch({...productSearch})
  }

    const [selectedPage, setSelectedPage] = useState<number>(1);
  
    const handlePageChange = (page:number) => {
      setSelectedPage(page);
    };
    const history = useHistory();
    const chosenProductHandler = (id: string) => {
      history.push(`/products/${id}`)
    }
    const {onAdd} = props;
 
   return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="main-title">
              <Box className={"title"}>Order our popular products <br /> by Categories</Box>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className="category-main">
                <Box
                  className={"order"}
                  onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                >
                   <img src="/img/other-foods.webp" alt=""  width={"120px"} style={{marginBottom: "0px"}}/>
                  <p className="filter-name">Other</p>
                </Box>
                <Box
                  className={"order"}
                  onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                >
                   <img src="/img/dessert.webp" alt=""  width={"105px"} style={{marginBottom: "0px"}}/>
                  <p className="filter-name">Dessert</p>
                </Box>
                <Box
                  className={"order"}
                  onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                >
                   <img src="/img/beverages.webp" alt=""  width={"70px"} style={{marginBottom: "0px"}}/>
                  <p className="filter-name">Beverages</p>
                </Box>
                <Box
                  className={"order"}
                  onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                >
                  <img src="/img/salad.webp" alt=""  width={"120px"} style={{marginTop: "20px"}}/>
                  <p className="filter-name">Salads</p>
                </Box>
                <Box
                  className={"order"}
                  onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                >
                <img src="/img/pizza-full.webp" alt=""  width={"100px"}/>
                <p className="filter-name">Fast foods</p>
                </Box>
              </Stack>
            </Stack>
            <Stack className={"dishes-filter-section"}>
                   <Stack className={"dishes-filter-box"}>
                         <Stack className="single-search-form">
                                <input
                                  className="search-box"
                                  type="text"
                                  placeholder="Type here..."
                                  onChange={(e) => {
                                    setSearchProduct(e.target.value) 
                                  }}
                                  onKeyDown={(e) => {
                                    if(e.key === "Enter") searchProductHandler();
                                  }}
                                />
                                <Button
                                  color={"primary"}
                                  variant={"contained"}
                                  className={"search-btn"}
                                  onClick={searchProductHandler}
                                >
                                  SEARCH
                                  <SearchIcon />
                                </Button>
                         </Stack>
                         <Stack className={"filter-btn"}>
                            <Button
                              variant={"contained"}
                              color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                              className={"order"}
                              onClick={() => searchOrderHandler("createdAt")}
                            >
                              NEW
                            </Button>
                            <Button
                              variant={"contained"}
                              className={"order"}
                              color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                              onClick={() => searchOrderHandler("productPrice")}
                            >
                              Price
                            </Button>
                            <Button
                              variant={"contained"}
                              className={"order"}
                              color={productSearch.order === "productViews" ? "primary" : "secondary"}
                              onClick={() => searchOrderHandler("productViews")}
                            >
                              Views
                            </Button>
                         </Stack>
                 </Stack>
          </Stack>
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                const sizeVolume = product.productCollection === ProductCollection.DRINK ? product.productVolume + "l" : product.productSize + " size"
                  return (
                    <Stack key={product._id} className={"product-card"} onClick={() => chosenProductHandler(product._id)}>
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})`}}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button 
                        className={"shop-btn"}
                        onClick={(e) => {
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0]
                          })
                          e.stopPropagation()
                        }}
                        >
                         Add to cart
                        </Button>
                        <Box className="view-btn">
                        <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Box>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

<Stack className={"pagination-section"}>
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={selectedPage}
              color={productSearch.page === selectedPage ? "primary" : "secondary"}
              onClick={() => handlePageChange(productSearch.page)}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={productSearch.page + 1 ? "primary" : "secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className={"brands-logo"}>
        <Container>
          <Stack className="restaurant-logo">
            <Box className={"family-brands"}>Our Family Brands</Box>
            <Stack className={"restaurant-img"}>
              <CssVarsProvider>
                {returantImg.map((ele, index) => {
                  return (
                    <Card key={index} className={"card"}>
                      <img src={ele.restImg} alt="" />
                    </Card>
                  );
                })}
              </CssVarsProvider>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"address-title"}>Our address</Box>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23689.91567597953!2d129.0983372261603!3d35.13155182662586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skr!4v1728896516279!5m2!1sen!2skr"  
            referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  )
    
}