import React from 'react';
import { Divider, Table } from 'antd';

const ConsultationMain = () => {
  const columns = [
    { title: 'Antecedents', dataIndex: 'antecedent', key: 'antecedent' }
  ];

  const data = [
    { key: '1', antecedent: 'Muscle injuries' },
    { key: '2', antecedent: 'Previous bone fractures' },
    { key: '3', antecedent: 'Previous traumatic surgeries' }
  ];

  return (
    <div>
      <ConsultationHeader /> {/* Include the header component */}
      <Divider orientation="left">Traumatology Antecedents</Divider>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ConsultationMain;

