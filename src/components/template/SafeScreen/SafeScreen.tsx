import { SafeAreaView, StatusBar, View } from "react-native";

import type { PropsWithChildren } from "react";

interface SafeScreenProps extends PropsWithChildren {
  background?: "white" | "#F5F5F5";
}

function SafeScreen({ children, background = "#F5F5F5" }: SafeScreenProps) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: background }]}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

export default SafeScreen;
