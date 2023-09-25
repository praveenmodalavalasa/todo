import { Box } from "@chakra-ui/react";
import { useState } from "react";

import { useStore } from "@/store/useStore";

import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/Register-Page";

export default function Home() {
  const image = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  const bgcolor = useStore((state) => state.bgcolor);
  const setBgColor = useStore((state) => state.setBgColor);

  const [page, setPage] = useState("login");

  return (
    <Box bgColor={bgcolor} h="100vh">
      {page === "login" ? (
        <>
          <LoginPage
            bgColor={bgcolor}
            setBgColor={setBgColor}
            setPage={setPage}
            image={image}
            setImage={setImage}
          />
        </>
      ) : (
        <RegisterPage
          bgColor={bgcolor}
          setBgColor={setBgColor}
          setPage={setPage}
          image={image}
          setImage={setImage}
        />
      )}
    </Box>
  );
}
