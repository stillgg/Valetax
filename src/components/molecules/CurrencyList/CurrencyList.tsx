import React, { useCallback } from "react";
import {
  FlatList,
  View,
  ViewStyle,
  ListRenderItemInfo,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { COLORS } from "@/theme/colors";

import { CurrenciesProps } from "@/types/navigation";

import CurrencyListItem from "../CurrencyListItem/CurrencyListItem";

interface CurrencyListProps {
  isLoading: boolean;
  activeCurrency?: string;
  currencies: ItemList[];
}

interface ItemList {
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

function CurrencyList({
  isLoading,
  activeCurrency,
  currencies,
}: CurrencyListProps) {
  const { params } = useRoute<CurrenciesProps["route"]>();
  const navigation = useNavigation<CurrenciesProps["navigation"]>();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ItemList>) => {
      const { flagSrc, code, name } = item;

      const itemStyle = {
        backgroundColor: COLORS.grey200,
      } as ViewStyle;

      const isFirst = index === 0;
      const isLast = index === currencies.length - 1;
      const isActive = item.code === activeCurrency;

      if (isFirst)
        Object.assign(itemStyle, {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        });

      if (isLast)
        Object.assign(itemStyle, {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        });

      return (
        <TouchableWithoutFeedback
          key={item.code}
          onPress={() => {
            if (!params) return;

            navigation.navigate("Home", {
              ...params,
              [params.type]: item.code,
            });
          }}
        >
          <View>
            <CurrencyListItem
              isActive={isActive}
              flagSrc={flagSrc}
              code={code}
              name={name}
              containerStyle={itemStyle}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    },
    []
  );

  const keyExtractor = (item: ItemList) => item.name;

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="small" color="grey" />
      ) : (
        <FlatList
          data={currencies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={{
            borderRadius: 8,
          }}
          initialNumToRender={25}
          ItemSeparatorComponent={() => (
            <View style={{ height: 8, backgroundColor: COLORS.grey200 }} />
          )}
        />
      )}
    </View>
  );
}

export default CurrencyList;
