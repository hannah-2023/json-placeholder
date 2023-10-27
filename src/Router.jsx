import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Users from "./Users/User";
import Photos from "./Photos/Photos";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/users" />}></Route>
        <Route path="users" element={<Users />}>
          <Route path=":userId" element={<Users/>}></Route>
        </Route>
        <Route path="photos" element={<Photos />}></Route>
      </Route>
    </Route>
  )
);

export default router;
