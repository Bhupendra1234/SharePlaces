import React from 'react';
import {BrowserRouter as Router,Route, Redirect, Switch}  from  'react-router-dom';
import User from './User/Pages/User';
import Newplace from './Places/Pages/Newplaces';
import MainNavigation from  './Shared/Components/Navigation/MainNavigation';
import Userplaces from './Places/Pages/UserPlaces';
import UpdatePlace from './Places/Pages/UpdatePlaces';
import Auth from './User/Pages/Auth';
import {AuthContext} from './Shared/Context/context';
import {useAuth}  from './Shared/Hook/auth-hook';
const App =()=>
{

  const {token,login,logout,userId} = useAuth();
let routes;
if(token)
{
  routes=(
      <Switch>
    <Route path="/" exact>
    <User/>
    </Route>
    <Route path="/:userId/places" exact> 
     <Userplaces/>
      </Route>
      <Route path="/places/new" exact>
       <Newplace/>
       </Route>
       <Route path="/places/:placeId">
      <UpdatePlace/>
       </Route>
       <Redirect to="/" /> 
       </Switch>
  );
}else{
  routes=(
    <Switch>
    <Route path="/" exact>
    <User/>
    </Route>
     <Route path="/:userId/places" exact> 
     <Userplaces/>
      </Route>
      <Route path="/auth">
        <Auth/>
       </Route>
       <Redirect to="/auth" /> 
       </Switch>
  );
}
  return (
    <AuthContext.Provider value={
      {IsloggedIn:!!token,
        token:token,
      userId:userId,
      login:login,
     logout:logout}}>
     <Router>
       <MainNavigation/>
       <main>
       <Switch>
       {routes}
       </Switch>
       </main>
     </Router> 
     </AuthContext.Provider>
  );
};

export default App;
