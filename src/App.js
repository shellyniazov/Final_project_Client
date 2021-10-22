import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import Menu from "./components/menu";
import Footer from "./components/footer"
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/register";
import MessagePage from "./pages/MessagePage";
import CommunityPage from "./pages/CommunityPage";
import Admin from "./pages/admin";
import Profile from "./pages/profile";



function App() { // אחראי על ההעברה בין המסכים

  return (

    <BrowserRouter>
      <Menu />
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/MessagePage/:id" exact component={MessagePage} />
        <Route path="/CommunityPage/:id" exact component={CommunityPage} />
        <Route path="/Admin/:id" exact component={Admin} />
        <Route path="/Profile/:id" exact component={Profile} />

      </Switch>
      <Footer />
    </BrowserRouter>

  );
}

export default App;