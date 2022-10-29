import styled from "styled-components/native";
import { TextInput } from "react-native-paper";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FBEBAF;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #4E5156;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Input = styled(TextInput)`
  width: 90%;
  height: 50px;
  background-color: #4E5156;
  margin-top: 20px;
  border-radius: 5px;
  outline: none;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background-color: #E6D8CB;
  margin-top: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #4E5156;
  font-size: 20px;
  font-weight: bold;
`;

export const Textm = styled.Text`
  color: #4E5156;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;
