import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Tests from "./Components/Tests";
import Test from "./Components/Test";
import Login from "./Auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./Private/PrivateRoute";
import AnswerSheet from './Components/AnswerSheet';
import VideoChat from './video/VideoChat';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
        
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              path="/test/:id"
              element={
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              }
            />

            <Route
              path="/answer/:id"
              element={
                <PrivateRoute>
                  <AnswerSheet />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Tests />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
