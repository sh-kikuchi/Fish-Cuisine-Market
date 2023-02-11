import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './components/commons/AppBar';
import AuthView from './pages/auth/AuthView';
import Home from './pages/home/Home';
import Introduction from './pages/Introduction/IntroductionPage';
import CountPage from './pages/count/CountPage';
import StoreFormPage from './pages/stores/StoreFormPage';
import StoreListPage from './pages/stores/StoreListPage';
import MenuFormPage from './pages/menus/MenuFormPage';
import MenuListPage from './pages/menus/MenuListPage';
import EatLogFormPage from './pages/eatLogs/EatLogFormPage';
import EatLogListPage from './pages/eatLogs/EatLogListPage';
import LandscapePage from './pages/imageList/LandscapePage';
import MealPicturePage from './pages/imageList/MealPicturePage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar></AppBar>
        <Routes>
          <Route path="/login" element={<AuthView />} />
          <Route path="/register" element={<AuthView />} />
          <Route path="/edit" element={<AuthView />} />
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/count" element={<CountPage />} />
          <Route path="/store/detail/:storeid" element={<StoreFormPage />} />
          <Route path="/store/register" element={<StoreFormPage />} />
          <Route path="/store/list" element={<StoreListPage />} />
          <Route path="/menu/detail/:storeid/:menuid" element={<MenuFormPage />} />
          <Route path="/menu/register/:storeid" element={<MenuFormPage />} />
          <Route path="/menu/list/:storeid" element={<MenuListPage />} />
          <Route path="/eatLog/detail/:storeid/:menuid/:eatlogid" element={<EatLogFormPage />} />
          <Route path="/eatLog/register/:storeid/:menuid" element={<EatLogFormPage />} />
          <Route path="/eatLog/list/:storeid/:menuid" element={<EatLogListPage />} />
          <Route path="/imageList/meal/fish" element={<MealPicturePage />} />
          <Route path="/imageList/landscape/toyosu" element={<LandscapePage />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}
//このコンポーネントからstoreにアクセス
export default App;
