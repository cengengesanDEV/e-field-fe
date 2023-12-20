import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Tooltip } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { useDebounce } from '@uidotdev/usehooks';
import { getFieldsByOwnerId } from '../api/getFieldsByOwner';
import priceFormatter from '../../../utils/priceFormatter';

export default function TableFIeld({ name, owner, onSelect }) {
  const [fields, setFields] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsloading] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: 'Field Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text) => <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>,
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        align: 'center',
        render: (text) => <div style={{ textAlign: 'center' }}>{text ? text : '-'}</div>,
      },
      {
        title: 'Start Hour',
        dataIndex: 'start_hour',
        key: 'start_hour',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? `${text.toString().padStart(2, '0')}.00 WIB` : '-'}</div>
        ),
      },
      {
        title: 'end Hour',
        dataIndex: 'end_hour',
        key: 'end_hour',
        align: 'center',
        render: (text) => (
          <div style={{ textAlign: 'center' }}>{text ? `${text.toString().padStart(2, '0')}.00 WIB` : '-'}</div>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (text) => <div style={{ textAlign: 'center' }}>{text ? priceFormatter(text) : '-'}</div>,
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
            <Tooltip placement='top' title='Select'>
              <Button type='primary' icon={<SelectOutlined />} onClick={() => onSelect(record.id)} />
            </Tooltip>
          </div>
        ),
      },
    ],
    [onSelect]
  );
  const nameDebounce = useDebounce(name, 1000);
  const ownerDebounce = useDebounce(owner, 1000);
  const getData = useCallback(
    async (name = '', owner = '') => {
      try {
        setIsloading(true);
        const response = await getFieldsByOwnerId(token, name, owner);
        const fieldList = response.data.data.map((data) => ({
          ...data,
          key: data.id,
        }));
        setFields(fieldList);
      } catch (error) {
      } finally {
        setIsloading(false);
      }
    },
    [token]
  );
  useEffect(() => {
    getData(ownerDebounce, nameDebounce);
  }, [getData, nameDebounce, ownerDebounce]);

  return (
    <>
      <Table columns={columns} dataSource={fields} loading={isLoading} scroll={{ x: 'max-content' }} />
    </>
  );
}
