import styled from "styled-components/native";
import { TextInput } from "react-native-paper";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FBEBAF;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #4E5156;
  font-size: 20px;
  font-weight: bold;
`;

export const ImageWave = styled.Image`
  height: 100px;
  width: 100px;
  z-index: 1;
`;
