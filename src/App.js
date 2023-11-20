
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Login from "./Layout/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import routes from "./routes/routes";
import { useSelector } from "react-redux";
// import { ThemeProvider } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from './components/Theme/theme';
import React from "react";
import { CssBaseline } from "@mui/material";
// import useToken from "./hooks/useToken";

function App() {

  const { isLoggedIn , loading} = useSelector((state) => state.auth);
  if (isLoggedIn ===  false) {

    return <Login />;
  }

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
 
 
  if(isLoggedIn ===  true){
    // <CssBaseline />
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              {routes.map(({ path, component, subLink }) => {
                if (subLink == null) {
                  return <Route key={path} path={path} element={component} />;
                }

                return (
                  <Route key={path} path={path} element={component}>
                    <Route path={subLink.path} element={subLink.component} />
                  </Route>
                );
              })}
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
// <Route
//   index
//   element={
//    component
//   }
// />
