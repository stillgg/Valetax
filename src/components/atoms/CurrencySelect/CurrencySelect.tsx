import { useMemo } from "react";

import CURRENCIES from "@/services/currencies.json";
import { COLORS } from "@/theme/colors";

import ChevronDownImage from "@/theme/assets/images/chevron-down.png";

import FlagIcon from "../FlagIcon/FlagIcon";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";

interface CurrencySelectProps {
  placeholder?: string;
  value: string;
  label: string;
}

function CurrencySelect({
  value,
  label,
  placeholder = "",
}: CurrencySelectProps) {
  const flagSrc = useMemo(() => {
    return (
      CURRENCIES.find((currency) => currency.code === value)?.flagSrc || ""
    );
  }, [value]);

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      containerStyle={{
        pointerEvents: "none",
      }}
      wrapperInputStyle={{
        backgroundColor: value ? COLORS.grey300 : COLORS.white,
        borderColor: value ? COLORS.grey300 : COLORS.black,
      }}
      leftIcon={
        value ? <FlagIcon uri={flagSrc} /> : <Icon source={ChevronDownImage} />
      }
      rightIcon={value ? <Icon source={ChevronDownImage} /> : null}
    />
  );
}

export default CurrencySelect;
