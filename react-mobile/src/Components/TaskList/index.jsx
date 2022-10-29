import React, { useState, useEffect, useRef } from "react";
import {
  Title,
  SubTitle,
  FlatList,
  Text,
  Button2,
  Button3,
  Button,
  Inputs,
  SafeArea,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

import Api from "../../Services/Api.js";
import { Alert, TouchableOpacity, View } from "react-native";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");
  const [newTask, setNewTask] = useState({
    description: "",
    status: "",
  });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const navigation = useNavigation();
  const modalizeRef = useRef(null);

  async function logout() {
    await AsyncStorage.removeItem("@user");
    navigation.navigate("login");
  }

  async function deleteTask(item) {
    const id = item.task_id;

    // if (item.status === "pendente") {
    //   Alert.alert(
    //     "Atenção",
    //     "A tarefa so pode ser deletada se estiver concluida"
    //   );
    //   return;
    // }

    await Api.delete(`/deletar/${id}`);
    return;
  }

  async function modalOpen() {
    setNewTask(" ");
    modalizeRef.current?.open();
  }

  async function modalOpenEdit(item) {
    modalizeRef.current?.open();
    setNewTask(item);
    setEdit(true);
    setId(item.task_id);
  }

  async function addTask() {
    const user = await AsyncStorage.getItem("@user");
    const { userId } = JSON.parse(user);

    await Api.post("/create", {
      description: newTask.description,
      status: newTask.status,
      user_id: userId,
    })
      .then(async (response) => {
        console.log(response);
        const task = response.data.data;
        setTasks([...tasks, task]);
        setNewTask({ description: "", status: "" });
        modalizeRef.current?.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function editTask(id) {
    setEdit(true);

    await Api.put(`atualizar/${id}`, {
      description: newTask.description,
      status: newTask.status,
    })
      .then(async (response) => {
        setNewTask({ description: "", status: "" });
        modalizeRef.current?.close();
      })
      .catch((error) => {
        console.log(error);
      });

    setEdit(false);
  }

  useEffect(() => {
    async function getTasks() {
      const user = await AsyncStorage.getItem("@user");
      const { userId } = JSON?.parse(user);
      const { userName } = JSON?.parse(user);
      setUserName(userName);
      const response = await Api.get(`/consultar/${userId}`);
      setTasks(response.data[0].tasks_tasks_user_idTousers);
    }
    getTasks();
  }, [tasks]);

  return (
    <>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View
          style={{
            flex: 1 / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title>Olá, {userName}</Title>
          <SubTitle>Essas são suas tarefas</SubTitle>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button2 onPress={() => modalOpen()}>
              <Text>Adicionar</Text>
            </Button2>
          </View>
        </View>
        <View style={{ flex: 2 / 3 }}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item?.task_id}
            renderItem={({ item }) => {
              const status = item?.status === "concluido" ? true : false;
              return (
                <>
                  {status ? (
                    <Button3
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 10,
                        width: "100%",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text style={{ color: "#fafafa" }}>
                        {item?.description}
                      </Text>
                      <Text style={{ color: "#fafafa" }}>{item?.status}</Text>

                      <TouchableOpacity onPress={() => deleteTask(item)}>
                        <Ionicons name="trash" size={24} color="#fafafa" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => modalOpenEdit(item)}>
                        <MaterialCommunityIcons
                          name="clipboard-edit"
                          size={24}
                          color="#fafafa"
                        />
                      </TouchableOpacity>
                    </Button3>
                  ) : (
                    <Button2
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 10,
                        width: "100%",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text>{item?.description}</Text>
                      <Text>{item?.status}</Text>
                      <TouchableOpacity onPress={() => deleteTask(item)}>
                        <Ionicons name="trash" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => modalOpenEdit(item)}>
                        <MaterialCommunityIcons
                          name="clipboard-edit"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </Button2>
                  )}
                </>
              );
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onPress={logout}>
            <Text>Sair</Text>
          </Button>
        </View>

        <Modalize
          ref={modalizeRef}
          snapPoint={200}
          adjustToContentHeight={true}
        >
          <SafeArea>
            <Text>Adicionar tarefa</Text>
            <Inputs
              placeholder="Descrição"
              value={newTask.description}
              onChangeText={(e) => setNewTask({ ...newTask, description: e })}
            />
            <Inputs
              placeholder="Status"
              value={newTask.status}
              onChangeText={(e) => setNewTask({ ...newTask, status: e })}
            />
            {!edit ? (
              <Button onPress={addTask}>
                <Text>Adicionar</Text>
              </Button>
            ) : (
              <Button onPress={() => editTask(id)}>
                <Text>Editar</Text>
              </Button>
            )}
          </SafeArea>
        </Modalize>
      </View>
    </>
  );
};

export default TaskList;

{
  /* <Container>
<Title>TaskList</Title>
<Div>
  <FlatList
    data={tasks}
    keyExtractor={(item) => item.task_id}
    renderItem={({ item }) => <Text>{item.description}</Text>}
  />
  <Button onPress={logout}>
    <Text>Deslogar</Text>
  </Button>
</Div>
</Container> */
}
