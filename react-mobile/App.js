import Home from "./src/Page/Home";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Routes";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </NavigationContainer>
  );
}
