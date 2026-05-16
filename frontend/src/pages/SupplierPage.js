import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Space } from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/suppliers';

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const response = await axios.get(API_URL);
    setSuppliers(response.data);
  };

  const onFinish = async (values) => {
    await axios.post(API_URL, values);
    form.resetFields();
    fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchSuppliers();
  };

  const columns = [
    { title: 'Firma Adı', dataIndex: 'name', key: 'name' },
    { title: 'Ülke', dataIndex: 'country', key: 'country' },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => deleteSupplier(record.id)}>Sil</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <h2>Firma Yönetimi</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: '20px' }}>
        <Form.Item name="name" rules={[{ required: true, message: 'Firma adı zorunlu' }]}>
          <Input placeholder="Firma Adı" />
        </Form.Item>
        <Form.Item name="country">
          <Input placeholder="Ülke" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Ekle</Button>
        </Form.Item>
      </Form>
      <Table dataSource={suppliers} columns={columns} rowKey="id" />
    </div>
  );
}

export default SupplierPage;