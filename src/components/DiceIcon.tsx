import { IconType } from "react-icons";
import {
  GiDiceTwentyFacesTwenty,
  GiD12,
  GiD10,
  GiDiceEightFacesEight,
  GiPerspectiveDiceSix,
  GiD4,
} from "react-icons/gi";

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

interface DiceIconProps {
  type: DiceType;
  size?: number | string;
  color?: string;
}

const diceIcons: Record<DiceType, IconType> = {
  d4: GiD4,
  d6: GiPerspectiveDiceSix,
  d8: GiDiceEightFacesEight,
  d10: GiD10,
  d12: GiD12,
  d20: GiDiceTwentyFacesTwenty,
};

const DiceIcon = ({
  type,
  size = 24,
  color = "currentColor",
}: DiceIconProps) => {
  const Icon = diceIcons[type];
  return <Icon size={size} color={color} />;
};

export default DiceIcon;
