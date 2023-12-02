import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '../api/getAllUser';
import { useSelector } from 'react-redux';
import { Button, Table, Tooltip } from 'antd';
import {
  DeleteOutlined,
  ForwardOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

export default function UserTable({ name }) {
  const [users, setUsers] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsloading] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Identity Number',
        dataIndex: 'no_identity',
        key: 'no_identity',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Account Number',
        dataIndex: 'no_rekening',
        key: 'no_rekening',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Address',
        dataIndex: 'fullAddress',
        key: 'fullAddress',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Account Status',
        dataIndex: 'status_acc',
        key: 'status_acc',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <Tooltip placement='top' title='Suspend'>
              <Button
                type='primary'
                style={{ backgroundColor: '#ffb73f' }}
                disabled={
                  record.status_acc === 'pending' ||
                  record.status_acc === 'suspended'
                }
                icon={<PoweroffOutlined />}
              />
            </Tooltip>
            <Tooltip placement='top' title='Unsuspend'>
              <Button
                type='primary'
                style={{ backgroundColor: 'green' }}
                disabled={
                  record.status_acc === 'pending' ||
                  record.status_acc === 'active'
                }
                icon={<ForwardOutlined />}
              />
            </Tooltip>
            <Tooltip placement='top' title='Delete'>
              <Button
                type='primary'
                danger
                disabled={record.status_acc === 'pending'}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const getData = useCallback(
    async (name = '') => {
      try {
        setIsloading(true);
        const response = await getAllUsers(token, name);
        const usersList = response.data.data.map((data, index) => ({
          ...data,
          key: data.id,
          fullAddress:
            !data?.address || !data?.location
              ? '-'
              : `${data?.address}, ${data?.location}`,
        }));
        setUsers(usersList);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    getData(name);
  }, [name, getData]);

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={isLoading}
      scroll={{ x: 'max-content' }}
    />
  );
}
