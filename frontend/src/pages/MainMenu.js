import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Procurement Management System</h1>
      <Space size="large">
        <Button type="primary" size="large" onClick={() => navigate('/suppliers')}>
          Firma Yönetimi
        </Button>
        <Button type="primary" size="large" onClick={() => navigate('/parts')}>
          Parça Yönetimi
        </Button>
      </Space>
    </div>
  );
}

export default MainMenu;