import { StyleSheet, View } from "react-native";

import { SafeScreen } from "@/components/template";
import { CurrencyConverter } from "@/components/organism";

function Home() {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <CurrencyConverter />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
