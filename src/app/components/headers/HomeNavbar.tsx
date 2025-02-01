import { Stack, Container, Button, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, useHistory } from "react-router-dom";
import Basket from "./Basket";
import React, {useState, useEffect} from "react"
import { CartItem } from "../../../lib/data/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/data/config";
import { Logout } from "@mui/icons-material";
interface HomeNavbarProps {
  cartItems: CartItem[]
  onAdd: (item:CartItem) => void
  onRemove: (item:CartItem) => void
  onDelete: (item:CartItem) => void
  onDeleteAll: () => void
  setLoginOpen: (isOpen: boolean) => void
  setSignupOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  handleCloseLogout: () => void
  handleLogoutRequest: () => void
  anchorEl: HTMLElement | null
}
const useNavigateToOrder = () => {
  const history = useHistory();

  const goToOrderPage = () => {
    history.push('/products'); 
  };

  return { goToOrderPage };
};



export default function HomeNavbar (props: HomeNavbarProps) {
  const {authMember} = useGlobals();
  const {goToOrderPage} = useNavigateToOrder()
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll, setSignupOpen, setLoginOpen, handleLogoutClick, handleCloseLogout, anchorEl, handleLogoutRequest} = props;

  return <div className="home-navbar">
    <Container className="home-container">
      <Stack className="menu">
        <Box className="logo-link">
          <NavLink to="/">
            <img src="/icons/pizza-logo.png" className="brand-logo"></img>
          </NavLink>
        </Box>
        <Stack className="links">
          <Box className={"hover-line"}>
          <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
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
          <Basket cartItems={cartItems} onAdd={onAdd} onDelete={onDelete} onRemove={onRemove} onDeleteAll={onDeleteAll}/>
        {!authMember ? 
        (<Box>
          <Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}>Login</Button>
          </Box>) : (
            <img 
            className="user-avatar"
            src={ authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` : "/icons/default-user.svg"}
            aria-haspopup={"true"}
            onClick={handleLogoutClick}
            />
          )}
                <Menu
                anchorEl={anchorEl}
	id="account-menu"
  open={Boolean(anchorEl)}
  onClose={handleCloseLogout}
  onClick={handleCloseLogout}
	PaperProps={{
		elevation: 0,
		sx: {
			overflow: 'visible',
			filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
			mt: 1.5,
			'& .MuiAvatar-root': {
				width: 32,
				height: 32,
				ml: -0.5,
				mr: 1,
			},
			'&:before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: 0,
				right: 14,
				width: 10,
				height: 10,
				bgcolor: 'background.paper',
				transform: 'translateY(-50%) rotate(45deg)',
				zIndex: 0,
			},
		},
	}}
	transformOrigin={{ horizontal: 'right', vertical: 'top' }}
	anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>
	<MenuItem onClick={handleLogoutRequest}>
		<ListItemIcon>
			<Logout fontSize="small" style={{ color: 'blue' }} />
		</ListItemIcon>
		Logout
	</MenuItem>
</Menu>
        </Stack>
      </Stack>
      <Stack className="header-frame">
        <Stack className="hero">
          <Box className="heading">
            <Typography variant="h1" className="header-text">Everything is better with a</Typography>
              <span className="text-primary">
                Pizza
              </span>
          </Box>
          <p className="desc">
            Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
          </p>
          <Box className="btn-group">
            {!authMember ? (
            <Button className="signup-btn" variant="contained" onClick={() => setSignupOpen(true)}>
                Signup
            </Button>) : (
              <Button className="order-btn" onClick={goToOrderPage}>
              Order now
            </Button>
            )}
          </Box>
        </Stack>
        <Stack className="hero-img">
          <img className="pizza" src={'/img/pizza.png'}  style={{ objectFit: 'contain'}}  alt={'pizza'} />
        </Stack>
    </Stack>
    </Container>
  </div>
}