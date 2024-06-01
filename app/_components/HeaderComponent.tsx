"use client";
import {
  Box,
  Flex,
  Image,
  IconButton,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  ExternalLinkIcon,
  EditIcon,
} from "@chakra-ui/icons";

export default function HeaderComponent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      position="fixed"
      bg={bg}
      top="0"
      zIndex="sticky"
      boxShadow="md"
      width="100%"
      p={6}
    >
      <Flex justify="space-between" align="center">
        <Image boxSize="25px" src="/logo.png" alt="App Logo" />
        <Spacer />
        <IconButton
          bg="transparent"
          mr={2}
          onClick={toggleColorMode}
          aria-label="Swith color mode"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<ExternalLinkIcon />}>Open Sheet</MenuItem>
            <MenuItem icon={<EditIcon />}>Change Account</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
