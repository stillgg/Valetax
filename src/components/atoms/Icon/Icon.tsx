import React from "react";
import { Image, View, StyleProp, ViewStyle, StyleSheet } from "react-native";

interface IconProps extends React.ComponentProps<typeof Image> {
  containerStyle?: StyleProp<ViewStyle>;
}

function Icon({
  source,
  width = 18,
  height = 18,
  containerStyle,
  ...props
}: IconProps) {
  return (
    <View style={StyleSheet.flatten([containerStyle])}>
      <Image
        source={source}
        style={{
          width,
          height,
        }}
        {...props}
      />
    </View>
  );
}

export default Icon;
