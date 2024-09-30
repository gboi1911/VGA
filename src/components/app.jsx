import React, { useEffect, useState } from 'react';
import { Route} from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider} from 'zmp-ui'; 
import { RecoilRoot } from 'recoil';
import HomePage from '../pages/home';
import TestPage from '../pages/test';
import ExpertPage from '../pages/expert';
import User from '../pages/user';
import MainLayout from '../layout';
import TestExecute from '../pages/mbtiTest/testExecute';
import TestResult from '../pages/mbtiTest/testResult'; 
import TestExecuteHolland from '../pages/hollandTest/testExecuteHolland';
import TestResultHolland from '../pages/hollandTest/testResultHolland';
import ExpertDetailPage from 'pages/expertDetail';
import { getDataAccessToken } from 'api/zalo';

const MyApp = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getDataAccessToken();
        setAccessToken(token); // Store the token once fetched
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <RecoilRoot>
      <App >        
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path='/' element={<MainLayout/>}>
              <Route path="home" element={<HomePage></HomePage>}></Route>              
              <Route path="expert" element={<ExpertPage></ExpertPage>}></Route>
              <Route path='expertDetail/:id' element={<ExpertDetailPage></ExpertDetailPage>}></Route>
              <Route path="user" element={<User></User>}></Route>
              <Route path="test" element={<TestPage></TestPage>}></Route>      
              <Route path='testExecute' element={<TestExecute></TestExecute>}/>             
              <Route path='testResult' element={<TestResult></TestResult>}/> 
              <Route path='testExecuteHolland' element={<TestExecuteHolland></TestExecuteHolland>}/>
              <Route path='testResultHolland' element={<TestResultHolland></TestResultHolland>}/>
            </Route>             
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
}
export default MyApp;