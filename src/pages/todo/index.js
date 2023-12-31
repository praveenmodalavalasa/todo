import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useStore } from "@/store/useStore";

import { signOut } from "firebase/auth";
import auth from "../../components/Firebase-Auth";

import {
  Input,
  Button,
  Heading,
  Center,
  Stack,
  Spacer,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

import {
  BsCircle,
  BsFillSunFill,
  BsFillMoonFill,
  BsFillCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";

import { Reorder } from "framer-motion";
import axios from "axios";
//...................................................................

const Todo = () => {
  const Router = useRouter();

  const image = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  const bgcolor = useStore((state) => state.bgcolor);
  const setBgColor = useStore((state) => state.setBgColor);

  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState("All");

  //...................................................................

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;
    const newTodo = await axios.post(process.env.NEXT_PUBLIC_STRAPI_URL, {
      data: {
        task: input,
        complete: false,
      },
    });
    const todo = await newTodo.data.data;

    setTodos((prev) => [
      ...prev,
      {
        id: todo.id,
        task: todo.attributes.task,
        complete: todo.attributes.complete,
      },
    ]);

    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    axios.delete(process.env.NEXT_PUBLIC_STRAPI_URL + "/" + id);
  };

  const handleCompleteTask = (id, complete) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
    axios
      .put(process.env.NEXT_PUBLIC_STRAPI_URL + "/" + id, {
        data: {
          complete: !complete,
        },
      })
      .then((complete) => complete.id);
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.complete));
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    } else {
      Router.push("/?err=Please Login In");
    }
    axios
      .get(process.env.NEXT_PUBLIC_STRAPI_URL)
      .then((response) => response.data.data)
      .then((data) =>
        setTodos(
          data.map((todo) => ({
            id: todo.id,
            task: todo.attributes.task,
            complete: todo.attributes.complete,
          }))
        )
      )
      .catch((err) => console.log(err.message));
  }, []);

  const signout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
    Router.push("/");
  };

  //.......................................................................

  return (
    <>
      <Box overflowY={"hidden"} bgColor={bgcolor} h={"100vh"}>
        <Image src={image} w="100%" h="40vh" alt="Light Mode" />
        <Stack mt="-60" justifyContent="center" alignItems="center">
          <Stack pos="absolute" top="6" right={{ base: "12", md: "4" }}>
            <Button
              textColor={todosFilter === "Completed" ? "black" : "white"}
              as="b"
              bgColor="blue"
              colorScheme="blue"
              onClick={signout}
            >
              Signout
            </Button>
          </Stack>
          <Stack>
            <Stack direction="row">
              <Heading
                color="White"
                marginBottom="6"
                marginLeft={{ base: "2", md: "0" }}
              >
                T O D O
              </Heading>
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
                  cursor="pointer"
                  style={{ color: "white", marginTop: "10" }}
                  size={30}
                />
              )}
            </Stack>
            <Stack
              pos="relative"
              w={{ base: "96vw", md: "full" }}
              alignSelf={{ base: "center" }}
            >
              <form onSubmit={handleAddTodo}>
                <BsCircle
                  cursor="pointer"
                  style={{
                    position: "absolute",
                    border: "0px solid #777a92",
                    color: "#777a92",
                    borderRadius: "50%",
                    zIndex: "2",
                    top: "22%",
                    left: "15px",
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={handleAddTodo}
                />

                <Input
                  placeholder="Create a new todo..."
                  _placeholder={{ fontFamily: "Helvetica" }}
                  fontFamily="inherit"
                  textColor={image === "./Dark.jpg" ? "white" : "black"}
                  h="12"
                  w="100%"
                  bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                  border="0"
                  focusBorderColor="white"
                  pl={12}
                  marginBottom="4"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            </Stack>
            <Stack
              spacing={0}
              w={{ base: "96vw", md: "full" }}
              alignSelf={{ base: "center" }}
            >
              <Reorder.Group
                axis="y"
                values={todos}
                onReorder={setTodos}
                style={{
                  overflowY: "auto",
                  maxHeight: "50vh",
                }}
              >
                {todos
                  .filter((todo) =>
                    todosFilter === "All"
                      ? true
                      : todosFilter === "Active"
                      ? !todo.complete
                      : todo.complete
                  )
                  .map((todo) => (
                    <Reorder.Item
                      value={todo}
                      key={todo.id}
                      style={{ listStyle: "none" }}
                    >
                      <Box
                        textColor="white"
                        bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                        h="12"
                        w="100%"
                        borderBottom="1px"
                        borderColor={"gray"}
                      >
                        <Stack direction="row" className="todoItem">
                          {todo.complete ? (
                            <BsFillCheckCircleFill
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
                              onClick={() =>
                                handleCompleteTask(todo.id, todo.complete)
                              }
                            />
                          ) : (
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
                              onClick={() =>
                                handleCompleteTask(todo.id, todo.complete)
                              }
                            />
                          )}

                          <Text
                            marginLeft="2"
                            marginTop="2.5"
                            textColor={
                              todo.complete
                                ? "#777a92"
                                : image === "./Dark.jpg"
                                ? "white"
                                : "black"
                            }
                            as={todo.complete ? "s" : ""}
                          >
                            {todo.task}
                          </Text>
                          <Spacer />
                          <BsXCircleFill
                            pos="absolute"
                            cursor="pointer"
                            className="todoDelete"
                            style={{
                              margin: "12.5px",
                              marginTop: "12.5px",
                              color: "#777a92",
                              width: "20px",
                              height: "20px",
                              color: image === "./Dark.jpg" ? "white" : "black",
                            }}
                            onClick={() => handleDeleteTask(todo.id)}
                          />
                        </Stack>
                      </Box>
                    </Reorder.Item>
                  ))}
              </Reorder.Group>
              <Box
                textColor="white"
                borderBottomRadius="8"
                bg={image === "./Dark.jpg" ? "#24273d" : "white"}
                h="12"
                w="100%"
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={2}
                  marginRight="4"
                  marginLeft="4"
                  marginTop="2"
                >
                  <Text textColor="gray">{todos.length} items left</Text>
                  <Spacer />
                  <Button
                    variant="link"
                    textColor={todosFilter === "All" ? "#3a78f2" : "gray"}
                    _hover={{
                      textDecoration: "none",
                      textColor:
                        todosFilter === "All"
                          ? ""
                          : image === "./Dark.jpg"
                          ? "white"
                          : "black",
                    }}
                    onClick={() => setTodosFilter("All")}
                  >
                    All
                  </Button>
                  <Button
                    variant="link"
                    textColor={todosFilter === "Active" ? "#3a78f2" : "gray"}
                    _hover={{
                      textDecoration: "none",
                      textColor:
                        todosFilter === "Active"
                          ? ""
                          : image === "./Dark.jpg"
                          ? "white"
                          : "black",
                    }}
                    onClick={() => setTodosFilter("Active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant="link"
                    textColor={todosFilter === "Completed" ? "#3a78f2" : "gray"}
                    _hover={{
                      textDecoration: "none",
                      textColor:
                        todosFilter === "Completed"
                          ? ""
                          : image === "./Dark.jpg"
                          ? "white"
                          : "black",
                    }}
                    onClick={() => setTodosFilter("Completed")}
                  >
                    Completed
                  </Button>
                  <Spacer />
                  <Button
                    onClick={() => handleClearCompleted()}
                    variant="link"
                    _hover={{
                      textDecoration: "none",
                      textColor: image === "./Dark.jpg" ? "white" : "black",
                    }}
                  >
                    Clear Completed
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Center>
        <Text textColor="gray" textAlign="center" pos="absolute" bottom={5}>
          Drag and drop the reorder list
        </Text>
      </Center>
    </>
  );
};

export default Todo;
