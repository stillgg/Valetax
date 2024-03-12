import Icon from "../Icon/Icon";

interface FlagIconProps {
  uri: string;
}

function FlagIcon({ uri }: FlagIconProps) {
  if (!uri) return null;

  return (
    <Icon
      width={30}
      height={20}
      source={{
        uri,
      }}
      containerStyle={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "black",
        overflow: "hidden",
      }}
    />
  );
}

export default FlagIcon;
