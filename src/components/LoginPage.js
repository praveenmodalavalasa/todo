import React from "react";
import { useState } from "react";

import { useRouter } from "next/router";

import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./Firebase-Auth";

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

const LoginPage = ({ setPage, setBgColor, image, setImage }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(router.query.err || "");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      localStorage.setItem("user", res.user.uid);
      router.push("/todo");
    } catch (err) {
      const index = err.message.indexOf("/");
      const msg = err.message
        .slice(index + 1, err.message.length - 2)
        .replace("-", " ");
      setError(msg.charAt(0).toUpperCase() + msg.slice(1));
    }
  };

  return (
    <>
      <Box>
        <Stack>
          <Image src={image} w="100%" h="40vh" alt="Light Mode" />
          <Stack justifyContent="center" alignItems="center">
            <Center mt="-60" mb="10" gap="4">
              <Heading color="white">TODO LOGIN</Heading>
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
            {error && <Center style={{ color: "red" }}>{error}</Center>}
            <Center>
              <form onSubmit={login}>
                <Stack direction="column" w="30vw">
                  <Text
                    as="b"
                    textColor={image === "./Dark.jpg" ? "white" : "./Dark.jpg"}
                  >
                    Email
                  </Text>

                  <Input
                    bg="white"
                    placeholder="Email address"
                    w="full"
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                    }}
                  />
                  <Text
                    as="b"
                    textColor={image === "./Dark.jpg" ? "white" : "./Dark.jpg"}
                  >
                    Password
                  </Text>
                  <Input
                    bg="white"
                    placeholder="********"
                    type="password"
                    w="full"
                    onChange={(e) => {
                      setPass(e.target.value.trim());
                    }}
                  />

                  <Button
                    w="24"
                    marginTop="6"
                    colorScheme="green"
                    alignSelf="center"
                    type="submit"
                    textColor={image === "./Dark.jpg" ? "white" : "./Dark.jpg"}
                  >
                    LOGIN
                  </Button>

                  <Text
                    textColor={image === "./Dark.jpg" ? "white" : "./Dark.jpg"}
                    textAlign="center"
                  >
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      as="u"
                      cursor="pointer"
                      onClick={() => setPage("Register")}
                    >
                      Register
                    </Button>
                  </Text>
                </Stack>
              </form>
            </Center>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
