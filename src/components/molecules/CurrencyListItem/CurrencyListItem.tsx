import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { COLORS } from "@/theme/colors";

import { FlagIcon } from "@/components/atoms";

interface CurrencyListItemProps {
  isActive: boolean;
  flagSrc: string;
  code: string;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const CurrencyListItem = React.memo(
  ({
    isActive,
    flagSrc,
    code,
    name,
    containerStyle,
  }: CurrencyListItemProps) => {
    return (
      <View style={StyleSheet.flatten([styles.itemContainer, containerStyle])}>
        <View
          style={StyleSheet.flatten([
            styles.wrapperItem,
            {
              backgroundColor: isActive ? COLORS.grey300 : "transparent",
              borderRadius: isActive ? 8 : 0,
            },
          ])}
        >
          <FlagIcon uri={flagSrc} />

          <View style={styles.wrapperText}>
            <Text numberOfLines={1} style={styles.text}>
              {code} - {name}
            </Text>
          </View>

          {isActive && (
            <View style={styles.radio}>
              <View style={styles.circle} />
            </View>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  itemContainer: {
    maxHeight: 54,
  },
  wrapperItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  wrapperText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingRight: 8,
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
    flex: 1,
  },
  radio: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.black,
  },
});

export default CurrencyListItem;
