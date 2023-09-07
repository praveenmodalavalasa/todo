import React, { useState } from "react";

import { Input, Button, Heading, Center, Stack } from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";

import {BsCircle} from "react-icons/bs";

const Todo = () => {
  const [image, setImage] = useState("./Dark.jpg");

  return (
    <>
      <Box>
        <Image src={image} w="100%" h="40vh" alt="Light Mode" />
        <Stack mt="-60" justifyContent="center" alignItems="center">
          <Stack>
            <Heading color="White" marginBottom="6">
              T O D O
            </Heading>
            <Stack pos="relative">
              <BsCircle style={{position:"absolute", border:"1px solid #777a92", borderRadius:"50%", zIndex:"1", top:"22%", left:"15px", width:"20px", height:"20px"}} />
              <Input
                placeholder="Create a new todo..."
                textColor="white"
                marginRight="40"
                h="12"
                w="100%"
                bg={"#24273d"}
                border="0"
                focusBorderColor="white"
                px="20"
                py="5"
                marginBottom={"4"}
              />
            </Stack>
            <Button
              colorScheme="green"
              onClick={() => {
                setImage(image === "./Dark.jpg" ? "./Light.jpg" : "./Dark.jpg");
              }}
            >
              Add Item
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
