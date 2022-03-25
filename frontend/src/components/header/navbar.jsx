import { useState } from "react";

import { Box, useColorMode } from "@chakra-ui/react";

import DarkModeToggle from "./darkModeToggle";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      display="flex"
      flexDir={{ base: "row-reverse", lg: "row" }}
      alignItems="center"
    >
      <DarkModeToggle onClick={toggleColorMode} colorMode={colorMode} />
    </Box>
  );
};

export default Navbar;
