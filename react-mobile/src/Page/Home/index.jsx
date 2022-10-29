import React from "react";
import { Container, Title, ImageWave, Input } from "./styles";
import Login from "../../Components/Login";
import TaskList from "../../Components/TaskList";

// import wave from "../../../assets/wave.svg";

const Home = () => {
  return (
    <>
      <Container>
        {/* <ImageWave source={require("../../../assets/wave.png")} /> */}
        <TaskList />
      </Container>
    </>
  );
};

export default Home;
