import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ArrowsLeftRight from "@/theme/assets/images/arrows-left-right.png";

import { HomeProps } from "@/types/navigation";

import { CurrencySelect, Icon } from "@/components/atoms";

interface ExchangeProps {
  from: string;
  to: string;
  swapCurrencies: () => void;
}

function Exchange({ from, to, swapCurrencies }: ExchangeProps) {
  const navigation = useNavigation<HomeProps["navigation"]>();

  const placeholder = useMemo(() => {
    return {
      from: to === "USD" ? "PLN" : "USD",
      to: from === "PLN" ? "USD" : "PLN",
    };
  }, [from, to]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Currencies", {
            from,
            to,
            type: "from",
          })
        }
        style={styles.wrapperSelect}
      >
        <CurrencySelect
          value={from}
          label="From:"
          placeholder={placeholder.from}
        />
      </Pressable>

      <Pressable onPress={swapCurrencies}>
        <View style={styles.wrapperSwapBtn}>
          <Icon source={ArrowsLeftRight} />
        </View>
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate("Currencies", {
            from,
            to,
            type: "to",
          })
        }
        style={styles.wrapperSelect}
      >
        <CurrencySelect value={to} label="To:" placeholder={placeholder.to} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  wrapperSwapBtn: {
    width: 44,
    height: 44,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperSelect: {
    flex: 1,
  },
});

export default Exchange;
