import React, { useEffect } from "react";
import { Flex, Text, Icon, Menu, MenuButton, Box, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";

export default function NavItem({ icon, title, isActive, navSize }) {


  return (
    <Box display="flex" w={navSize ? "300px" : "130px"} p={navSize ? (1) : (2)} alignItems="center" justifyContent="center" textAlign="center">
      <Menu>
        <Box
        w="100%"
          color={isActive ? "#1e272a" : "orange.500"}
          borderRadius={navSize ? (8) : (8)}
          p={2}
          background={
            isActive
              ? "#dd6b20"
              : "linear-gradient(to right, #dd6b20 50%, #1e272a 50%)"
          }
          backgroundSize={isActive ? "" : "200% 100%"}
          backgroundPosition={isActive ? "" : "right bottom"}
          transition={isActive ? "" : "all .5s ease-out"}
          _hover={
            isActive
              ? {}
              : {
                  textDecor: "none",
                  backgroundPosition: "left bottom",
                  color: "#1e272a",
                }
          }
        >
          <MenuButton w="100%">
            <Flex justify="center" align="center">
              <Text fontSize="14px" m="0" letterSpacing="3px" pl="3px" fontWeight="bold">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Box>
      </Menu>
    </Box>
  );
}
