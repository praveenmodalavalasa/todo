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
import { nanoid } from "nanoid";
import { Reorder } from "framer-motion";

const Todo = ({ setBgColor }) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState("All");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { id: nanoid(), task: input, complete: false },
    ]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.complete));
  };

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
            <Stack pos="relative">
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
                  onClick={(e) => handleAddTodo(e)}
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
            <Stack spacing={0}>
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
                              onClick={() => handleCompleteTask(todo.id)}
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
                              onClick={() => handleCompleteTask(todo.id)}
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
                  direction="row"
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
          <Text textColor="gray" textAlign="center" pos="absolute" bottom={5}>
            Drag and drop the reorder list
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
