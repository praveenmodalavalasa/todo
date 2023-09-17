import React from "react";
import {
  Box,
  Heading,
  Center,
  Stack,
  Spacer,
  Input,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const RegisterPage = ({ setPage, setBgColor, image, setImage }) => {
  return (
    <>
      <Box>
        <Stack>
          <Image src={image} w="100%" h="40vh" alt="Light Mode" />
          <Stack justifyContent="center" alignItems="center">
            <Center mt="-60" mb="10" gap="4">
              <Heading color="white">TODO REGISTER</Heading>
              <Spacer />
              {image === "./Dark.jpg" ? (
                <BsFillSunFill
                  onClick={() => {
                    setImage(
                      image === "./Dark.jpg" ? "./Light.jpg" : "./Dark.jpg"
                    );
                    setBgColor("#E2E8F0");
                  }}
                  cursor="pointer"
                  style={{ color: "white" }}
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
                  cursor="pointer"
                  style={{ color: "white" }}
                  size={30}
                />
              )}
            </Center>
            <Center>
              <Stack direction="column" w="30vw">
                <Text
                  as="b"
                  textColor={image === "./Dark.jpg" ? "wHite" : "./Dark.jpg"}
                >
                  Email
                </Text>
                <Input bg="white" placeholder="Email address" w="full" />
                <Text
                  as="b"
                  textColor={image === "./Dark.jpg" ? "wHite" : "./Dark.jpg"}
                >
                  Password
                </Text>
                <Input bg="white" placeholder="********" w="full" />
                <Text
                  as="b"
                  textColor={image === "./Dark.jpg" ? "wHite" : "./Dark.jpg"}
                >
                  RePassword
                </Text>
                <Input bg="white" placeholder="********" w="full" />
                <Button
                  w="24"
                  marginTop="6"
                  colorScheme="green"
                  alignSelf="center"
                  textColor={image === "./Dark.jpg" ? "wHite" : "./Dark.jpg"}
                >
                  {" "}
                  REGISTER
                </Button>
                <Text
                  color={image === "./Dark.jpg" ? "wHite" : "./Dark.jpg"}
                  textAlign="center"
                >
                  Already a user?{" "}
                  <Button
                    variant="link"
                    as="u"
                    cursor="pointer"
                    onClick={() => setPage("login")}
                  >
                    Login
                  </Button>
                </Text>
              </Stack>
            </Center>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
