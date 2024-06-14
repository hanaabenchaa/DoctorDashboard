import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const ConsultationHeader = () => {
  // Define menu items with sub-menus
  const items = [
    { label: 'Diagnosis', key: 'diagnosis', icon: <MailOutlined /> },
    { label: 'Treatment', key: 'treatment', icon: <AppstoreOutlined /> },
    { label: 'Antecedent', key: 'antecedent', icon: <SettingOutlined /> }
  ];

  // Render menu items
  const renderMenuItems = items.map(item => (
    <Menu.Item key={item.key} icon={item.icon}>
      <Link to={`/${item.key}`}>{item.label}</Link>
    </Menu.Item>
  ));

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['diagnosis']}>
      {renderMenuItems}
    </Menu>
  );
};

export default ConsultationHeader;

