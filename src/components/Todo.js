import React, { useState } from "react";

import {
  Input,
  Button,
  Heading,
  Center,
  Stack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";

import { BsCircle, BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const Todo = ({ setBgColor }) => {
  const [image, setImage] = useState("./Dark.jpg");

  return (
    <>
      <Box>
        <Image src={image} w="100%" h="40vh" alt="Light Mode" />
        <Stack mt="-60" justifyContent="center" alignItems="center">
          <Stack>
            <Stack direction="row">
              <Heading color="White" marginBottom="6">
                T O D O
              </Heading>
              <Spacer />
              {image === "./Dark.jpg" ? (
                <BsFillSunFill
                  onClick={() => {
                    setImage(
                      image === "./Dark.jpg" ? "./Light.jpg" : "./Dark.jpg"
                    );
                    setBgColor("white");
                  }}
                  style={{ color: "white", marginTop: "10" }}
                  size={30}
                />
              ) : (
                <BsFillMoonFill
                  onClick={() => {
                    setImage(
                      image === "./Dark.jpg" ? "./Light.jpg" : "./Dark.jpg"
                    );
                    setBgColor("black");
                  }}
                  style={{ color: "white", marginTop: "10" }}
                  size={30}
                />
              )}
            </Stack>
            <Stack pos="relative">
              <BsCircle
                cursor="pointer"
                style={{
                  position: "absolute",
                  border: "1px solid #777a92",
                  borderRadius: "50%",
                  zIndex: "2",
                  top: "22%",
                  left: "15px",
                  width: "20px",
                  height: "20px",
                }}
              />
              
              <Input
                placeholder="Create a new todo..."
                _placeholder={{fontFamily:"Helvetica"}}
                fontFamily="inherit"
                textColor={image === "./Dark.jpg" ? "white" : "black"}
                h="12"
                w="100%"
                bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                border="0"
                focusBorderColor="white"
                pl={12}
                marginBottom="4"
              />
            </Stack>
            <Stack spacing={0}>
              <Box
                textColor="white"
                bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                h="12"
                w="100%"
                borderBottom="1px"
                borderColor={"gray"}
              >
                <Stack direction="row" className="todoItem">
                  <BsCircle
                    cursor="pointer"
                    style={{
                      border: "0px solid #777a92",
                      color: "#777a92",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      marginLeft: "15px",
                      marginTop: "12.5",
                    }}
                  />

                  <Text
                    marginLeft="2"
                    marginTop="2.5"
                    textColor={image === "./Dark.jpg" ? "white" : "black"}
                  >
                    Hi Prana
                  </Text>
                  <Spacer />
                  <RxCross1
                    pos="absolute"
                    className="todoDelete"
                    style={{
                      margin: "12.5px",
                      marginTop: "12.5px",
                      color: "#777a92",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </Stack>
              </Box>
              <Box
                textColor="white"
                borderBottomRadius="8"
                bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                h="12"
                w="100%"
              >
                <Stack
                  direction="row"
                  spacing={2}
                  marginRight="4"
                  marginLeft="4"
                  marginTop="2"
                >
                  <Text textColor="gray">0 items left</Text>
                  <Spacer />
                  <Button variant="link" _hover={{textDecoration:"none", textColor: "white"}} >All</Button>
                  <Button variant="link" _hover={{textDecoration:"none", textColor: "white"}} >Active</Button>
                  <Button variant="link" _hover={{textDecoration:"none", textColor: "white"}} >Completed</Button>
                  <Spacer />
                  <Button variant="link" _hover={{textDecoration:"none", textColor: "white"}} >Clear Completed</Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Text textColor="gray" textAlign="center" pos="absolute" bottom={5}>
            Drag and drop the reorder list
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
