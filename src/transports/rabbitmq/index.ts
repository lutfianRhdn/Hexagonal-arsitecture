import { RabbitmqMessage } from "../../types/rabbitmqMessage";
import {login,register} from "../../controllers/authControllerRabbitmq";
export default async (payload: RabbitmqMessage) => {
  switch (payload.path) {
    case 'register':
  return await register(payload.data.username, payload.data.password);
  case 'login':
  return await login(payload.data.username, payload.data.password);
    default:
  return;
  }
  
}