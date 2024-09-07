import React from 'react';
import { Route} from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Header } from 'zmp-ui'; 
import { RecoilRoot } from 'recoil';
import HomePage from '../pages/home';
import TestPage from '../pages/test';
import ExpertPage from '../pages/expert';
import User from '../pages/user';


const MyApp = () => {
  return (
    <RecoilRoot>
      <App >        
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/test" element={<TestPage></TestPage>}></Route>
          <Route path="/expert" element={<ExpertPage></ExpertPage>}></Route>
          <Route path="/user" element={<User></User>}></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
}
export default MyApp;