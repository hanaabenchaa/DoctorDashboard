


// Sidebar.jsx
import React from 'react';
import { Menu , Flex } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine  } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';

const Sidebar = () => {
    
    return (
<>
        <Flex align='center' justify='center'>
        <div className='logo'>
            <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
    </Flex>


        <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar'>
            <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                <Link to="/MainContent">Acceuil</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                <Link to="/patients">Patient</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                <Link to="/waiting-list">File d'attente</Link>
            </Menu.Item>
            <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                <Link to={`/consultation`}>Consultation</Link>
            </Menu.Item>
            <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                <Link to="/bilan">Bilan</Link>
            </Menu.Item>
            <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <Link to="/medicament">Medicament</Link>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <Link to="/statistiques">Statistiques</Link>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <Link to="/paiement">Paiment</Link>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <Link to="/logout">LogOut</Link>
                </Menu.Item>
            
        </Menu>
        </>
    );
};

export default Sidebar;
/*import React from 'react';
import { Menu, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';
import useAppStore from '../Store/appStore';

const Sidebar = () => {
    const sidebarCollapsed = useAppStore(state => state.sidebarCollapsed); // Access the sidebar state from the store
    const toggleSidebar = useAppStore(state => state.toggleSidebar); // Access the function to toggle the sidebar state

    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </Flex>

            <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' collapsed={sidebarCollapsed}>
                <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                    <Link to="/MainContent">Acceuil</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                    <Link to="/patients">Patient</Link>
                </Menu.Item>
                <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                    <Link to="/waiting-list">File d'attente</Link>
                </Menu.Item>
                <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                    <Link to="/consultation">Consultation</Link>
                </Menu.Item>
                <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                    <Link to="/bilan">Bilan</Link>
                </Menu.Item>
                <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <Link to="/medicament">Medicament</Link>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <Link to="/statistiques">Statistiques</Link>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <Link to="/paiement">Paiment</Link>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <Link to="/logout">LogOut</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;*/
