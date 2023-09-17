import Todo from "@/components/Todo";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/Register-Page";
export default function Home() {
  const [image, setImage] = useState("./Dark.jpg");
  const [bgcolor, setBgColor] = useState("black");
  const [page, setPage] = useState("login");

  return (
    <Box bgColor={bgcolor} h="100vh">
      {/* <Todo setBgColor={setBgColor} /> */}
      {page === "login" ? (
        <LoginPage
          bgColor={bgcolor}
          setBgColor={setBgColor}
          setPage={setPage}
          image={image}
          setImage={setImage}
        />
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
