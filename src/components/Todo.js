import { Flex, Input } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import React from "react";

const Todo = () => {
  return (
    <>
      <Center h="500px" color="white">
          <Input placeholder="Basic usage" w="300px" />
      </Center>
    </>
  );
};

export default Todo;
