import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

interface RollResult {
  total: number;
  isHigher: boolean;
}

interface Props {
  results: RollResult[];
  hasRolled: boolean;
  isNatural20: boolean;
}

const RollResults = ({ results, hasRolled, isNatural20 }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      style={{
        opacity: hasRolled ? 1 : 0,
        transform: `scale(${hasRolled ? 1 : 0.5})`,
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        {results.map((result, index) => (
          <Heading
            key={index}
            size="2xl"
            className={`text-${colorMode === "light" ? "dark" : "light"} ${
              result.total === 20 && isNatural20 ? "natural-20" : ""
            }`}
            fontSize={
              result.isHigher
                ? { base: "3rem", sm: "4rem" }
                : { base: "1.5rem", sm: "2rem" }
            }
            style={{
              fontWeight: "900",
              opacity: result.isHigher ? 1 : 0.7,
              textShadow:
                result.total === 20 && isNatural20
                  ? "0 0 30px gold, 0 0 60px gold, 0 0 90px gold"
                  : `0 0 30px ${
                      colorMode === "light"
                        ? "rgba(0,0,0,0.4)"
                        : "rgba(255,255,255,0.4)"
                    }`,
              animation: hasRolled
                ? result.total === 20 && isNatural20
                  ? "natural-20 2s cubic-bezier(0.4, 0, 0.2, 1) infinite"
                  : "glow 2s ease-in-out infinite alternate"
                : "none",
            }}
          >
            {result.total}
          </Heading>
        ))}
      </Stack>
    </Box>
  );
};

export default RollResults;
