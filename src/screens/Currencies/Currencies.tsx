import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { debounce } from "lodash";

import CURRENCIES from "@/services/currencies.json";
import { COLORS } from "@/theme/colors";

import SearchImage from "@/theme/assets/images/search.png";
import ArrowLeftImage from "@/theme/assets/images/arrow-left.png";

import { HomeProps } from "@/types/navigation";

import { SafeScreen } from "@/components/template";
import { CurrencyList } from "@/components/molecules";
import { Icon, Input } from "@/components/atoms";

interface Currency {
  name: string;
  symbol: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
  code: string;
  namePlural: string;
  countryCodeISO2: string;
  flagSrc: string;
}

function Currencies() {
  const { params } = useRoute<HomeProps["route"]>();
  const navigation = useNavigation();

  const activeCurrency = useMemo(() => {
    if (params && params[params.type]) return params[params.type] || "";
    return "";
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [searchedCurrency, setCurrency] = useState(activeCurrency);

  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(
    []
  );

  const pickedCurrency = useMemo(() => {
    if (!params) return "";
    if (params.type === "to") return params.from || "";
    if (params.type === "from") return params.to || "";
    return "";
  }, []);

  const getAvailableCurrencies = (
    searchedCurrency: string,
    pickedCurrency: string
  ) => {
    const nestedCurrencies = [] as Currency[];

    const matchedCurrencies = CURRENCIES.filter((currency) => {
      const { code, name } = currency;
      const normolizedCode = code.toLowerCase();
      const normolizedName = name.toLowerCase();
      const normolizedPayload = searchedCurrency?.toLowerCase().trim();
      const normolizedPickedCurrency = pickedCurrency.toLowerCase();

      if (normolizedPickedCurrency === normolizedCode) return false;

      const isFiltered =
        normolizedCode.includes(normolizedPayload) ||
        normolizedName.includes(normolizedPayload);

      if (!isFiltered) nestedCurrencies.push(currency);

      return isFiltered;
    });

    const result = matchedCurrencies.concat(nestedCurrencies);

    setAvailableCurrencies(result);

    setLoading(false);
  };

  const getDebouncedAvailableCurrencies = useCallback(
    debounce(getAvailableCurrencies, 1000),
    []
  );

  const onChangeText = useCallback((value: string) => {
    setLoading(true);
    setCurrency(value);
    getDebouncedAvailableCurrencies(value, pickedCurrency);
  }, []);

  useEffect(() => {
    setLoading(true);
    getAvailableCurrencies(searchedCurrency, pickedCurrency);
  }, []);

  return (
    <SafeScreen background="white">
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            width={22}
            height={22}
            source={ArrowLeftImage}
            containerStyle={{
              marginRight: 20,
            }}
          />
        </Pressable>

        <Text style={styles.title}>Currency Select</Text>
      </View>

      <View style={styles.wrapperContent}>
        <Input
          value={searchedCurrency}
          maxLength={30}
          leftIcon={<Icon source={SearchImage} />}
          onChangeText={onChangeText}
          selectTextOnFocus={false}
        />

        <View style={styles.wrapperList}>
          <CurrencyList
            isLoading={isLoading}
            activeCurrency={activeCurrency}
            currencies={availableCurrencies}
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "700",
  },
  wrapperContent: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.grey100,
  },
  wrapperList: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default Currencies;
