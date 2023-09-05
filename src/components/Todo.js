import { Input, Button, Heading, Center, Stack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";

const Todo = () => {
  return (
    <>
      <Center h="500px" color="white">
        <Stack>
          <Stack direction="row" justifyContent="center">
            <CheckIcon alignSelf="center" color="black" w="6" h="6" />
            <Heading color="Black">Todo List</Heading>
          </Stack>
          <Stack direction="row">
            <Input
              placeholder="Add Item"
              w="300px"
              textColor="black"
              marginRight="3"
            />
            <Button colorScheme="green">Add Item</Button>
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default Todo;
