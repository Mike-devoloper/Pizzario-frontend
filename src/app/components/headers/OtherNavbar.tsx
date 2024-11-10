import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";
import Basket from "./Basket";

interface OtherNavbarProps {
  cartItems: CartItem[];
}

export default function OtherNavbar (props: OtherNavbarProps) {
  const {cartItems} = props;
    const authMember = null;
    return <div className="other-navbar">
      <Container className="home-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img src="/icons/burak.svg" className="brand-logo"></img>
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
            <NavLink to="/">Home</NavLink>
          </Box>
          <Box className={"hover-line"}>
            <NavLink to="/products" activeClassName={"underline"}>Products</NavLink>
          </Box>
          {authMember ? (
          <Box className={"hover-line"}>
            <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
          </Box>
          ) : null}
           {authMember ? (
          <Box className={"hover-line"}>
            <NavLink to="/member-page" activeClassName={"underline"}>My page</NavLink>
          </Box>
          ) : null}
          <Box className={"hover-line"}>
            <NavLink to="/help" activeClassName={"underline"}>Help</NavLink>
          </Box>
          <Basket cartItems={cartItems}/>
          {!authMember ? 
          (<Box>
            <Button variant="contained" className="login-button">Login</Button>
            </Box>) : (
              <img 
              className="user-avatar"
              src={"/icons/default-user.svg"}
              aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  }