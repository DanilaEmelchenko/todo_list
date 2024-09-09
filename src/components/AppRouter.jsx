import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from '../router';
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      {isAuth
       ? 
      <Routes>
        {privateRoutes.map(route =>
          <Route key={route.path} path={route.path} element={<route.component />} />)}
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
      : 
      <Routes>
        {publicRoutes.map(route =>
          <Route key={route.path} path={route.path} element={<route.component />} />)}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>}
    </div>
  );
};

export default AppRouter;
