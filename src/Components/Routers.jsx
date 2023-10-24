import { Route, Routes } from 'react-router-dom';
import LoginBox from './LoginBox';
import SignUp from './SignUp'

const Router = () => {
    return (
      <Routes>
          <Route path='/' exact element={<LoginBox />}/>
          <Route path='/SignUp' element={<SignUp />}/>
      </Routes>
    );
  }
export default Router; 