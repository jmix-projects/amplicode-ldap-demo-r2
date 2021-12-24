import { Home } from "./home/Home";
import { screenStore } from "@amplicode/react-core";
import {UserList} from "./user/UserList";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: "screen.home"
});

screenStore.registerScreen("users", {
  component: UserList,
  captionKey: "screen.users"
})
