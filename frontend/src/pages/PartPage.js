import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const PARTS_URL = 'http://localhost:8080/api/parts';
const SUPPLIERS_URL = 'http://localhost:8080/api/suppliers';

const MB_CODES = ['Buy', 'Make', 'Buy-Make'];

function PartPage() {
  const [parts, setParts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [mbCode, setMbCode] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchParts();
    fetchSuppliers();
  }, []);

  const fetchParts = async () => {
    const response = await axios.get(PARTS_URL);
    setParts(response.data);
  };

  const fetchSuppliers = async () => {
    const response = await axios.get(SUPPLIERS_URL);
    setSuppliers(response.data);
  };

  const onMbCodeChange = (value) => {
    setMbCode(value);
    form.setFieldsValue({ supplier: null });
  };

  const isSupplierDisabled = mbCode === 'Make' || mbCode === null;

  const onFinish = async (values) => {
    const payload = {
      partNumber: values.partNumber,
      description: values.description,
      mbCode: values.mbCode,
      supplier: isSupplierDisabled ? null : { id: values.supplierId },
    };
    await axios.post(PARTS_URL, payload);
    form.resetFields();
    setMbCode(null);
    fetchParts();
  };

  const deletePart = async (id) => {
    await axios.delete(`${PARTS_URL}/${id}`);
    fetchParts();
  };

  const columns = [
    { title: 'Parça No', dataIndex: 'partNumber', key: 'partNumber' },
    { title: 'Tanım', dataIndex: 'description', key: 'description' },
    { title: 'MB Kodu', dataIndex: 'mbCode', key: 'mbCode' },
    {
      title: 'Firma',
      key: 'supplier',
      render: (_, record) => record.supplier ? record.supplier.name : '-',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => deletePart(record.id)}>Sil</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <h2>Parça Yönetimi</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: '20px' }}>
        <Form.Item name="partNumber" rules={[{ required: true, message: 'Parça no zorunlu' }]}>
          <Input placeholder="Parça No" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Tanım" />
        </Form.Item>
        <Form.Item name="mbCode" rules={[{ required: true, message: 'MB kodu zorunlu' }]}>
          <Select placeholder="MB Kodu" style={{ width: 120 }} onChange={onMbCodeChange}>
            {MB_CODES.map(code => (
              <Select.Option key={code} value={code}>{code}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="supplierId">
          <Select
            placeholder="Firma"
            style={{ width: 150 }}
            disabled={isSupplierDisabled}
          >
            {suppliers.map(s => (
              <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Ekle</Button>
        </Form.Item>
      </Form>
      <Table dataSource={parts} columns={columns} rowKey="id" />
    </div>
  );
}

export default PartPage;