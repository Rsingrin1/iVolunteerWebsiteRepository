import React from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
//import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Profile({ userName, profilePic, onLogout }) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <Avatar
            name={userName}
            src={profilePic}
            size="sm"
            cursor="pointer"
          />
        }
        variant="ghost"
        _hover={{ bg: "transparent" }}
      />
      <MenuList>
        <MenuItem onClick={() => console.log("Go to My Profile")}>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => console.log("Go to Home")}>Home</MenuItem>
        <MenuItem onClick={onLogout || (() => console.log("Logout"))}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}


