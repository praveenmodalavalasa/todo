import Todo from "@/components/Todo";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [bgcolor, setBgColor] = useState ("black")
  return <Box bgColor={bgcolor} h="100vh"><Todo setBgColor={setBgColor}/></Box>;
}
