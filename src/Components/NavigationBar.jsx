import { Container, Navbar, Stack, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/feature/authSlice";
import { logoutClient } from "../redux/feature/clientSlice";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import logo from "../../public/Plutus_logo.svg";
import noDP from "../../public/profile-user.png";
import "../../src/assets/CSS/navigationbar.css";
import { useEffect } from "react";

function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggin, user } = useSelector((state) => state.auth);

  console.log(user, 'user2222')
  const logout = () => {
    socket.emit("end-connection");
    dispatch(logoutUser());
    navigate("/login");
  };
  const logoutClients = () => {
    socket.emit("end-connection");
    dispatch(logoutClient());
    navigate("/");
  };

  return ( 
    <Navbar className="p-0 w-100 navbar"> 
        {/* <Link to="/chat"> */}
        {" "}
        <div className="header w-100 px-3 py-2">
          <img src={logo} width="211" height="79" />
        </div>   
        {!isLoggin ? (
          <>
            <Nav>
              <Stack direction="horizontal">
                <h4>
                  {location.pathname !== "/login" &&
                    location.pathname !== "/register" && location.pathname !== "/" &&  location.pathname !== "/home" ? (
                    <Link to="/login">login</Link>
                  ) : null}
                </h4>
              </Stack>
            </Nav>
          </>
        ) : (
          isLoggin && !user.password ? (
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic">
                <img
                  src={noDP}
                  height="30px"
                  style={{ borderRadius: "50%" }}
                ></img>{" "}
                {user?.name && user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    logoutClients();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <nav>
              <Dropdown className="dropdown">
                <Dropdown.Toggle id="dropdown-basic">
                  <img
                    src={noDP}
                    height="30px"
                    style={{ borderRadius: "50%" }}
                  ></img>{" "}
                  {user?.name && user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </nav>
          )
        )} 
    </Navbar>
  );
}

export default NavigationBar;
