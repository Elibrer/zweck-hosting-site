import React, { useState, useEffect } from "react";
import "./Header.css";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  useBreakpointValue,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Slide,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import Auth from "../utils/auth";

import { Link, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import zweckLogo from "../assets/images/zweckLogo.png";
import eliLogo from "../assets/images/eliLogo.png";

const Header = () => {
  const location = useLocation();

  //check if logged in already or not
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  return (
    <>
      {!isLoggedIn ? (
        <Flex
          padding="10px"
          as="header"
          flexDir="row"
          width="100vw"
          backgroundColor="#1e272a"
        >
          <Flex paddingLeft="150px" alignItems="center" width="100%">
            <Heading color="orange.500">Zweck Hosting</Heading>
          </Flex>
          <Flex width="100%" justifyContent="end" paddingRight="100px">
            <Link to="/" onClick={() => {}}>
              <NavItem title="HOME" isActive={location.pathname === "/"} />
            </Link>
            <Link to="/login" onClick={() => {}}>
              <NavItem
                title="LOGIN"
                isActive={location.pathname === "/login"}
              />
            </Link>
            <Link to="/SignUp" onClick={() => {}}>
              <NavItem
                title="SIGN UP"
                isActive={location.pathname === "/SignUp"}
              />
            </Link>
            
          </Flex>
        </Flex>
      ) : (
        <Flex
          padding="10px"
          as="header"
          flexDir="row"
          width="100vw"
          backgroundColor="#1e272a"
        >
          <Flex paddingLeft="150px" alignItems="center" width="100%">
            <Heading color="orange.500">Zweck Hosting</Heading>
          </Flex>
          <Flex width="100%" justifyContent="end" paddingRight="100px">
            <Link
              to="/"
              onClick={() => {
                Auth.logout();
                setIsLoggedIn(Auth.loggedIn());
              }}
            >
              <NavItem
                title="LOG OUT"
                isActive={location.pathname === "/"}
              />
            </Link>
           
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Header;
