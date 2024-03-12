import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { numberWithSpaces } from "@/helpers/numberWithSpaces";
import CURRENCIES from "@/services/currencies.json";
import { COLORS } from "@/theme/colors";

type TotalProps = {
  from: string;
  to: string;
  amount?: number;
  result?: number;
  isSuccess?: boolean;
  isLoading: boolean;
};

function Total({ from, to, amount, result, isSuccess, isLoading }: TotalProps) {
  const findSymbol = useCallback((code: string) => {
    return CURRENCIES.find((currency) => currency.code === code)?.symbolNative;
  }, []);

  const symbolNative = useMemo(() => {
    return {
      from: findSymbol(from),
      to: findSymbol(to),
    };
  }, [from, to]);

  const isShowTotal = useMemo(() => {
    return !amount || !from || !to;
  }, [amount, from, to]);

  const formattedAmount = useMemo(() => {
    return numberWithSpaces(amount);
  }, [amount]);

  const formattedResult = useMemo(() => {
    return numberWithSpaces(result);
  }, [result]);

  if (isSuccess === false)
    return (
      <View style={styles.wrapper}>
        <Text>Something went wrong</Text>
      </View>
    );

  if (isLoading && from && to)
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="small" color="grey" />
      </View>
    );

  return (
    <View style={styles.wrapper}>
      {!isShowTotal && (
        <View>
          <Text style={styles.amount}>
            {formattedAmount} {symbolNative.from} =
          </Text>

          <Text style={styles.result}>
            {formattedResult} {symbolNative.to}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 80,
  },
  amount: {
    fontSize: 16,
    color: COLORS.black,
  },
  result: {
    fontSize: 42,
    color: COLORS.black,
  },
});

export default Total;
