import React from 'react';
import { Route} from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider} from 'zmp-ui'; 
import { RecoilRoot } from 'recoil';
import HomePage from '../pages/home';
import TestPage from '../pages/test';
import ExpertPage from '../pages/expert';
import User from '../pages/user';
import MainLayout from '../layout';
import TestExecute from '../pages/testExecute';
import TestResult from '../pages/testResult';


const MyApp = () => {
  return (
    <RecoilRoot>
      <App >        
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path='/' element={<MainLayout/>}>
              <Route path="home" element={<HomePage></HomePage>}></Route>              
              <Route path="expert" element={<ExpertPage></ExpertPage>}></Route>
              <Route path="user" element={<User></User>}></Route>
              <Route path="test" element={<TestPage></TestPage>}></Route>      
              <Route path='testExecute' element={<TestExecute></TestExecute>}/>             
              <Route path='testResult' element={<TestResult></TestResult>}/> 
            </Route>             
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
}
export default MyApp;