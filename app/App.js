import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./views/UserViews/Login.js";
import { UserRegister } from "./views/UserViews/Register.js";
import { UserView } from "./views/UserViews/Main.js";
import { QuestionnaireMain } from "./views/QuestionnaireView/QuestionnaireMain.js"
import { QuestionnaireDetail } from "./views/QuestionnaireView/QuestionnaireDetail.js";
import { CreateQuestionnaire } from './views/QuestionnaireView/QuestionnaireCreate.js'
import { ResponderCuestionario } from './views/QuestionnaireView/ResponderCuestionario.js'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={UserView} />
        <Stack.Screen name="Register" component={UserRegister} />
        <Stack.Screen name="QuestionnaireMain" component={QuestionnaireMain} />
        <Stack.Screen name="QuestionnaireDetail" component={QuestionnaireDetail} />
        <Stack.Screen name="CreateQuestionnaire" component={CreateQuestionnaire} />
        <Stack.Screen name="ResponderCuestionario" component={ResponderCuestionario} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


/* 
navigation.navigate("QuestionnaireDetail", { id: item._id });
ResponderCuestionario

*/