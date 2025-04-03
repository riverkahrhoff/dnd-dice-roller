import { Box, Stack, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

interface RollResult {
  total: number;
  isHigher: boolean;
}

interface Props {
  results: RollResult[];
  isNatural20: boolean;
}

const RollResults = ({ results, isNatural20 }: Props) => {
  const { colorMode } = useColorMode();

  if (results.length === 0) return null;

  return (
    <Box
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.3)"
      }
      py={2}
      px={6}
      borderRadius="xl"
      backdropFilter="blur(10px)"
      boxShadow={`0 4px 20px ${
        colorMode === "light" ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.4)"
      }`}
      width="fit-content"
      position="relative"
      display="flex"
      alignItems="center"
      style={{
        border: `2px solid ${
          colorMode === "light"
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.1)"
        }`,
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        {results.map((result, index) => (
          <Text
            key={index}
            fontSize={
              result.isHigher
                ? { base: "3.5rem", sm: "4.5rem" }
                : { base: "2rem", sm: "2.5rem" }
            }
            opacity={result.isHigher ? 1 : 0.5}
            className={result.total === 20 && isNatural20 ? "natural-20" : ""}
            color={colorMode === "light" ? "black" : "white"}
            fontWeight={result.isHigher ? "bold" : "medium"}
            style={{
              textShadow:
                result.total === 20 && isNatural20
                  ? "0 0 20px gold, 0 0 40px gold"
                  : `0 2px 4px ${
                      colorMode === "light"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.4)"
                    }`,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {result.total}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default RollResults;
