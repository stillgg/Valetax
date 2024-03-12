import { useEffect, useState, useMemo } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { convert } from "@/services/rates";
import { numberWithSpaces } from "@/helpers/numberWithSpaces";
import { parseRuNumberFormat } from "@/helpers/parseRuNumberFormat";

import { HomeProps } from "@/types/navigation";

import { Exchange, Total } from "@/components/molecules";
import { Input } from "@/components/atoms";

function CurrencyConverter() {
  const { params } = useRoute<HomeProps["route"]>();

  const [amount, setAmount] = useState("1");

  const [from, setFrom] = useState(params?.from || "");
  const [to, setTo] = useState(params?.to || "");

  const { data, isPending } = useQuery({
    queryKey: ["convert", amount, from, to],
    queryFn: () => {
      return convert(from, to, amount);
    },
    enabled: Boolean(from && to),
  });

  const swapCurrencies = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const amount = parseRuNumberFormat(e.nativeEvent.text);
    setAmount(amount);
  };

  const formattedValue = useMemo(() => {
    return numberWithSpaces(amount);
  }, [amount]);

  useEffect(() => {
    setFrom(params?.from || "");
    setTo(params?.to || "");
  }, [params]);

  return (
    <View>
      <Exchange from={from} to={to} swapCurrencies={swapCurrencies} />

      <View style={styles.wrapperAmount}>
        <Input
          label="Amount:"
          maxLength={15}
          keyboardType="numeric"
          value={formattedValue}
          onChange={onChange}
        />
      </View>

      <Total
        from={from}
        to={to}
        isLoading={isPending}
        isSuccess={data?.success}
        amount={data?.query.amount}
        result={data?.result}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperAmount: {
    marginTop: 16,
    marginBottom: 24,
  },
});

export default CurrencyConverter;
