import React from "react";
import Avatar from "@mui/material/Avatar";

const UserAvatar = ({ first_name, last_name, size }) => {
  const stringToColor = (name) => {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return <Avatar {...stringAvatar(`${first_name} ${last_name}`)} />;
};

export default UserAvatar;
