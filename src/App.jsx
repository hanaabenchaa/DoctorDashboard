// without zustand
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import MainContent from './components/MainContent';

import Consultation from './pages/Consultation';
import Bilan from './pages/Bilan';
import Medicament from './pages/Medicament';
import Statistiques from './pages/Statistics';
import Paiement from './pages/Paiment';
import Logout from './pages/Logout';
import WaitingList from './pages/WaitingList';
import './App.css';
import Patients from './pages/Patients';

const { Sider, Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Sider theme='light' collapsible>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className='header'>
            <CustomHeader/>
          </Header>
          <Content className='content'>
            
            <Routes>
              <Route path="/MainContent" element={<MainContent/>} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/waiting-list" element={<WaitingList />} />
              <Route path="/consultation/:n_dossier"element={<Consultation />} />
               
              <Route path="/bilan" element={<Bilan />} />
              <Route path="/medicament" element={<Medicament />} />
              <Route path="/statistiques" element={<Statistiques />} />
              <Route path="/paiement" element={<Paiement />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
///:n_dossier when i want to the buuton of consulter 



