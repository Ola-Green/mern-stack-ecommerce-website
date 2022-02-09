import React from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { userLogin, cart } = useSelector((state) => state);
  const { userInfo } = userLogin;
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="App">
      <Navbar
        collapseOnSelect
        className="px-5"
        expand="xl"
        style={{
          boxShadow: "0 0.3rem 0.6rem rgba(0,0,0, 0.15)",
          width: "100vw",
          background: "#131E3A",
        }}
      >
        <LinkContainer
          to="/"
          style={{
            fontWeight: "800",
            textTransform: "uppercase",
            color: "#f5f5dc",
            fontSize: "20px",
          }}
        >
          <Navbar.Brand>
            
            <b style={{ color: "red" }}>K</b>aiso
            <b style={{ color: "red" }}>W</b>oman
            
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="nav-toggle" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ml-auto">
            <LinkContainer className="cart-label link-nav" to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart fa-lg"></i>
                {cartItems.length > 0 && (
                  <Badge className="badge">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}{" "}
                Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="username"
                className="link-nav"
              >
                <LinkContainer to="/profile" style={{ color: "#c69963" }}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={logoutHandler}
                  style={{ color: "#c69963" }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login" style={{ color: "#c69963" }}>
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu" className="link-nav">
                <LinkContainer
                  to="/admin/userlist"
                  style={{ color: "#c69963" }}
                >
                  <NavDropdown.Item>
                    <i className="fas fa-user fa-lg mr-4"></i> users
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  to="/admin/orderlist"
                  style={{ color: "#c69963" }}
                >
                  <NavDropdown.Item>
                    <i className="fas fa-sort mr-4 fa-lg"></i> orders
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  to="/admin/categorylist"
                  style={{ color: "#c69963" }}
                >
                  <NavDropdown.Item>
                    <i className="fas fa-list fa-lg mr-4"></i>categories
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  to="/admin/productlist"
                  style={{ color: "#c69963" }}
                >
                  <NavDropdown.Item>
                    <i className="fab fa-product-hunt fa-lg mr-4"></i>products
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
