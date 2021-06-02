import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import React,{useState} from 'react';
import Layout from './components/Layout'
import Login from './Login-fire/Login.js'
import PersonalDetails from './pages/PersonalDetails';
import SkillSet from './pages/SkillSet';
import TeamDetails from './pages/TeamDetails';
import {useLocation} from 'react-router-dom'
import PrivateRoute from './Login-fire/PrivateRoute';
import SignUp from './Login-fire/SignUp';
import {app} from './mockfirebase'
import ViewDetails from './pages/ViewDetails.js'
import {AuthProvider} from './Login-fire/Auth'

function App() {
  let location=useLocation()

  var user=app.auth().currentUser

  if(user){
    console.log(user.uid);
  }
  // let [toggle,setToggle]=useState(false)
  let toggle

 if(user){
   toggle=true
 }
 else{
    toggle=false
 }

  
  return (
  <AuthProvider>
      { location.pathname==='/login' &&  <Route exact path="/login" component={Login}/>}
      { location.pathname==='/signup' &&  <Route exact path="/signup" component={SignUp} />}
      {location.pathname==='/viewdetails' && <PrivateRoute exact path='/viewdetails' component={ViewDetails}/>}
      {location.pathname!=='/login' && location.pathname!=='/signup' && location.pathname!=='/viewdetails' &&
           <Layout>
           <Switch>
             <PrivateRoute exact path="/">
               <PersonalDetails/>
             </PrivateRoute>
             <PrivateRoute path="/skillset" exact>
               <SkillSet/>
             </PrivateRoute>
             <PrivateRoute path="/teamdetails" exact> 
               <TeamDetails/>
             </PrivateRoute>
             {/* <PrivateRoute path="/viewdetails" exact> 
               <ViewDetails/>
             </PrivateRoute> */}
           </Switch>
           </Layout>
        
          }
          

   </AuthProvider>
  );
}
//{location.pathname==='/' && <Route path='/login' component={()=><Redirect to='/login'/>}}

export default App;

