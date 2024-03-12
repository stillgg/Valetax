import type { StackScreenProps } from "@react-navigation/stack";

interface CurrencyParams {
  from?: string;
  to?: string;
  type: "to" | "from";
}

export type ApplicationStackParamList = {
  Home?: CurrencyParams;
  Currencies?: CurrencyParams;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type HomeProps = StackScreenProps<ApplicationStackParamList, "Home">;

export type CurrenciesProps = StackScreenProps<
  ApplicationStackParamList,
  "Currencies"
>;
