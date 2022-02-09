import styled from "styled-components";
import { mobile, medium } from "../../responsive";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";

const Container = styled.div`
  display: flex;
  border-top: 1px solid #131e3a;
  ${mobile({ flexDirection: "column" })}
  ${medium({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  color: #c69963;
  text-align: center;
  ${mobile({ textAlign: "center" })}
  ${medium({ textAlign: "center" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  padding: 5px;
  font-size: 16px;
  ${mobile({ textAlign: "center" })}
  ${medium({ textAlign: "center" })}
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${mobile({ justifyContent: "space-around" })};
  ${medium({ justifyContent: "space-around" })}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: #c69963;
  /* color: #131e3a; */
  text-align: center;
  ${medium({ fontSize: "16px" })};
  ${mobile({ fontSize: "16px" })};
`;

const Line = styled.hr`
  background-color: #131e3a;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  ${medium({
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  })};
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  ${medium({ width: "100%", fontSize: "14px" })};
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5;
`;

const Payment = styled.img`
  width: 60%;
  ${mobile({ width: "100%" })};
  ${medium({ width: "100%" })};
`;

const Footer = () => {
  return (
    <div id="footer" style={{ background: "#fffdd0" }}>
      <Container>
        <Left>
          <Logo>Kaisowoman</Logo>
          <Desc>
            Fashion that never go out of style.All the latest and chicest styles
            tailored to your preference.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <a href="https://m.facebook.com/Kaiso_f_inc-109805660422941/" className="social-links">
                <i className="fab fa-facebook fa-lg" arial-hidden="true"></i>
              </a>
            </SocialIcon>
            <SocialIcon color="E4405F">
              <a href="https://www.instagram.com/kaiso.official/" className="social-links">
                <i className="fab fa-instagram fa-lg" arial-hidden="true"></i>
              </a>
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <a href="https://www.twitter.com" className="social-links">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </SocialIcon>
            <SocialIcon color="E60023">
              <a href="https://www.pinterest.com/okukprogress/kaisowoman/" className="social-links">
                <i className="fab fa-pinterest fa-lg"></i>
              </a>
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <LinkContainer to="/">
              <ListItem>Home</ListItem>
            </LinkContainer>
            <LinkContainer to="/cart">
              <ListItem>Cart</ListItem>
            </LinkContainer>
            <LinkContainer to = "/about">
            <ListItem>About</ListItem>
            </LinkContainer>
            
            
            <ListItem>Accessories</ListItem>
            <LinkContainer to="/profile">
              <ListItem>My Account</ListItem>
            </LinkContainer>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <span
              style={{
                fontSize: "20px",
                color: "#75AD21",
              }}
            >
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <strong>
              No.3 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              Abuja.Nigeria.
            </strong>
          </ContactItem>
          <ContactItem>
            <span
              style={{ marginRight: "10px", fontSize: "20px", color: "red" }}
            >
              <i className="far fa-envelope"></i>
            </span>
            <strong>albertokuk10@gmail.com</strong>
          </ContactItem>
          <ContactItem>
            <span>
              <i className="fas fa-phone-volume phone"></i>
            </span>
            +2348072511182
          </ContactItem>
          <Payment src="/images/payment.png" />
        </Right>
      </Container>
      <Line />
      <div className="row text-center pb-5">
        <p className="col-sm section-title">
          &copy;{new Date().getFullYear()} OLA GREEN | All rights reserved |
          Terms Of Service | Privacy
        </p>
        <p className="col-sm section-title">
          <span>
            <i className="fas fa-phone-volume phone"></i>
          </span>
          +2347030831172
        </p>
      </div>
    </div>
  );
};

export default Footer;
