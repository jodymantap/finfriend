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
import { useRouter } from "next/navigation";
import { removeCredentials } from "../../actions";

export default function HeaderComponent({ sheetURL }: { sheetURL: string }) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const removeCookies = async () => {
    const res = await removeCredentials();
    if (res) {
      router.push("auth");
    }
  };

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
          onClick={toggleColorMode}
          aria-label="Swith color mode"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
        {sheetURL ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              ml={2}
            />
            <MenuList>
              <MenuItem as="a" href={sheetURL} icon={<ExternalLinkIcon />}>
                Open Sheet
              </MenuItem>
              <MenuItem onClick={removeCookies} icon={<EditIcon />}>
                Change Account
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
    </Box>
  );
}
