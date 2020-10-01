import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Icon = ({ iconName, iconColor, iconSize, iconStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        style={iconStyle}
        name={iconName}
        color={iconColor}
        size={iconSize}
      />
    </TouchableOpacity>
  );
};

export default Icon;
