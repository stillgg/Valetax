import React, { useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

import { COLORS } from "@/theme/colors";

interface InputProps extends React.ComponentPropsWithRef<typeof TextInput> {
  label?: string;
  leftIcon?: React.JSX.Element | null;
  rightIcon?: React.JSX.Element | null;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperInputStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

function Input({
  value,
  placeholder = "",
  label,
  leftIcon,
  rightIcon,
  leftIconContainerStyle,
  containerStyle,
  wrapperInputStyle,
  inputStyle,
  disabled = false,
  ...props
}: InputProps) {
  const inputEl = useRef<TextInput | null>(null);

  const onPress = () => {
    if (inputEl.current !== null) inputEl.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={StyleSheet.flatten([
            styles.wrapperInput,
            {
              borderColor: disabled ? COLORS.grey300 : COLORS.black,
              backgroundColor: disabled ? COLORS.grey300 : COLORS.white,
            },
            wrapperInputStyle,
          ])}
        >
          {leftIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                {
                  paddingRight: 8,
                },
                leftIconContainerStyle,
              ])}
            >
              {leftIcon}
            </View>
          )}

          <TextInput
            ref={inputEl}
            value={value}
            placeholder={placeholder}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={StyleSheet.flatten([styles.input, inputStyle])}
            placeholderTextColor="#8D8D8D"
            {...props}
          />

          {rightIcon && (
            <View style={StyleSheet.flatten([styles.iconContainer])}>
              {rightIcon}
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.black,
  },
  wrapperInput: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Input;
