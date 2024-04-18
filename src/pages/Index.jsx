import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, useColorMode } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsWork((prevState) => !prevState);
            return isWork ? BREAK_MINUTES * 60 : WORK_MINUTES * 60;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg={colorMode === "light" ? "gray.100" : "gray.900"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Pomodoro Timer
        </Heading>
        <Box borderWidth={4} borderRadius="lg" p={8} boxShadow="lg" bg={colorMode === "light" ? "white" : "gray.700"}>
          <Heading as="h2" size="3xl" mb={4}>
            {isWork ? "Work" : "Break"}
          </Heading>
          <Text fontSize="6xl" fontWeight="bold">
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </Text>
        </Box>
        <Box>
          {!isRunning ? (
            <Button colorScheme="green" size="lg" onClick={() => setIsRunning(true)} leftIcon={<FaPlay />}>
              Start
            </Button>
          ) : (
            <Button colorScheme="red" size="lg" onClick={() => setIsRunning(false)} leftIcon={<FaPause />}>
              Pause
            </Button>
          )}
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              setIsRunning(false);
              setIsWork(true);
              setTimeLeft(WORK_MINUTES * 60);
            }}
            leftIcon={<FaSync />}
            ml={4}
          >
            Reset
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
