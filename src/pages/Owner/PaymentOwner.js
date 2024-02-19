import {
  Table,
  Typography,
  Space,
  Tag,
  Select,
  Input,
  message,
  Button,
  Dropdown,
  Modal,
  Row,
  Col,
  DatePicker,
  Descriptions,
  Empty,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeStatusPaymentOwner, editPaymentSchedule, getDetailField, getHistoryOwner } from '../../utils/Axios';
import moment from 'moment/moment';
import priceFormatter from '../../utils/priceFormatter';
import locale from 'antd/es/date-picker/locale/id_ID';
import dayjs from 'dayjs';
import {
  PlusCircleOutlined,
  FundViewOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { checkAvailability, formatHour, makeSchedule } from '../../utils/makeSchedule';

function PaymentOwner() {
  const [field, setField] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [image, setImage] = useState('');
  const [id, setId] = useState(null);
  const [fieldId, setFieldId] = useState(null);
  const [dataConfirm, setDataConfirm] = useState({});
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState({
    clockIn: null,
    clockOut: null,
  });

  const [availableHour, setAvailableHour] = useState([]);

  const [hour, setHour] = useState([]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getPayment();
  }, [status, filter]);

  const getPayment = async () => {
    try {
      setLoading(true);
      const response = await getHistoryOwner(token, status, filter?.name || '', filter?.type || '');
      setField(response.data.data);
      setLoading(false);
    } catch (error) {
      message.info('can`t load data or server maintanance');
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'no',
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      width: 50,
    },
    {
      title: 'no Identity',
      dataIndex: 'noIdentity',
      key: '2',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Name Account',
      dataIndex: 'nameAccount',
      key: '3',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: '4',
      width: 150,
    },
    {
      title: 'Name Booking',
      dataIndex: 'nameBooking',
      key: '5',
      width: 150,
    },
    {
      title: 'Name Field',
      dataIndex: 'nameField',
      key: '6',
      width: 150,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: '7',
      width: 130,
    },
    {
      title: 'Schedule hours',
      dataIndex: 'scheduleHours',
      key: '8',
      width: 130,
    },
    {
      title: 'Schedule date',
      dataIndex: 'scheduleDate',
      key: '9',
      width: 130,
    },
    {
      title: 'Type Field',
      dataIndex: 'type',
      key: '10',
      width: 100,
    },
    {
      title: 'Total Payment',
      dataIndex: 'totalPayment',
      key: '11',
      width: 150,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: '12',
      width: 120,
      fixed:'right',
      render : (e) => (
        (status == "success") ? <Tag color='success'>Full Payment</Tag> :  <Tag color={e.isDp ? 'error' : "success"}>{e.isDp ? 'down payment' : 'full payment'}</Tag>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: '13',
      width: 220,
      fixed: 'right',
      render: (e) => (
        <Space size={[8, 16]}>
          <Space direction='vertical' size={'small'}>
            <Button
              onClick={() => {
                setShowView(true);
                setImage(e.image_payment);
              }}
              style={{ backgroundColor: '#ffb73f', width: '100%' }}
              icon={<FundViewOutlined />}
            >
              View
            </Button>
            {e.status == 'pending' ? (
              <Button
                onClick={() => handleShowChangeSchedule(e)}
                type='dashed'
                style={{ width: '100%' }}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            ) : null}
          </Space>
          <Space direction='vertical' size={'small'}>
            {e.status == 'pending' ? (
              <Button
                onClick={() => {
                  setShowConfirm(true);
                  setId(e.id);
                  setDataConfirm(e);
                }}
                type='primary'
                style={{ width: '100%' }}
                icon={<CheckCircleOutlined />}
              >
                Confirm
              </Button>
            ) : null}
            {e.status == 'pending' ? (
              <Button
                onClick={() => {
                  setShowCancel(true);
                  setId(e.id);
                }}
                type='primary'
                danger
                style={{ width: '100%' }}
                icon={<CloseCircleOutlined />}
              >
                Cancel
              </Button>
            ) : null}
          </Space>
        </Space>
      ),
    },
  ];

  const handlePaymentStatus = async (value) => {
    await changeStatusPaymentOwner(token, id, { status: value });
    await getPayment();
    setDataConfirm({});
    setShowConfirm(false);
    setShowCancel(false);
  };

  const handleShowChangeSchedule = async (e) => {
    try {
      setBookingDate(e.play_date);
      setFieldId(e.field_id);
      setId(e.id);
      await fetchDetailFIeld(e.field_id, e.play_date);
      setShowChange(true); // show modals
    } catch (error) {
      console.log(error);
      message.info('failed load data');
    }
  };

  const onChangeDate = async (date, dateString) => {
    setBookingDate(dateString);
    await fetchDetailFIeld(fieldId, date.format('YYYY-MM-DD '));
  };

  const fetchDetailFIeld = useCallback(async (id, play_date) => {
    const res = await getDetailField(id, moment(play_date).format('YYYY-MM-DD'), true);
    const field = res.data.data.field;

    setHour(makeSchedule(field.start_hour, field.end_hour));
    setAvailableHour(res.data.data.dataValue);
  }, []);

  const patchSchedule = async () => {
    try {
      const body = {
        play_date: bookingDate,
        start_play: bookingTime.clockIn,
        end_play: bookingTime.clockOut,
      };
      const res = await editPaymentSchedule(token, id, body);
      // console.log(res.data)
      getPayment();
      setShowChange(false);
      setFieldId(null);
      message.success('Success edit data');
    } catch (error) {
      message.info('Failed edit data');
      setShowChange(false);
    }
  };

  const selectSchedule = useCallback(
    (hour) => {
      if (!bookingTime.clockIn && !bookingTime.clockOut) {
        setBookingTime({ clockIn: hour, clockOut: null });
        return;
      }
      if (hour < bookingTime.clockIn) {
        setBookingTime({ clockIn: hour, clockOut: null });
        return;
      }
      if (hour === bookingTime.clockIn) {
        setBookingTime({ clockIn: null, clockOut: null });
        return;
      }
      if (hour > bookingTime.clockIn) {
        const { isAvailable, booked } = checkAvailability({ clockIn: bookingTime.clockIn, clockOut: hour }, availableHour);
        if (!isAvailable) {
          notification.error({ message: `jam ${booked} sudah dipesan`, description: 'Silahkan Pilih jadwal yang lain' });
          return;
        }
        setBookingTime((prev) => ({ ...prev, clockOut: hour }));
      }
    },
    [bookingTime, availableHour]
  );

  const isButtonSelected = useCallback(
    (hour) => {
      return (
        bookingTime.clockIn === hour ||
        bookingTime.clockOut === hour ||
        (hour > bookingTime.clockIn && hour < bookingTime.clockOut)
      );
    },
    [bookingTime]
  );

  return (
    <>
      <div className='p-4'>
        <div>
          <Typography.Title level={3} className='my-3' underline>
            Confirm Payment
          </Typography.Title>

          <Select
            showSearch
            placeholder='History status'
            value={status}
            onChange={(e) => setStatus(e || 'pending')}
            allowClear
            style={{ width: '200px' }}
            options={[
              {
                value: 'pending',
                label: 'Menunggu konfirmasi',
              },
              {
                value: 'success',
                label: 'Sudah dikonfirmasi',
              },
              {
                value: 'cancel',
                label: 'Canceled',
              },
            ]}
          />
          <hr />

          <div className='d-flex flex-row align-items-center justify-content-start gap-2 my-3'>
            <Typography.Title level={5} className=''>
              search :{' '}
            </Typography.Title>
            <Input
              placeholder='search Name Booking'
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              style={{ width: '200px' }}
            />
            <Select
              showSearch
              placeholder='type field'
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e || '' })}
              allowClear
              style={{ width: '200px' }}
              options={[
                {
                  value: 'Grass',
                  label: 'Grass',
                },
                {
                  value: 'Matras',
                  label: 'Matras',
                },
              ]}
            />
          </div>

          {field.length > 0 ? (
            <Table
              scroll={{
                x: 1500,
                y: 300,
              }}
              loading={loading}
              columns={columns}
              dataSource={field?.map((e, i) => ({
                key: i + 1,
                no: i + 1,
                noIdentity: e.no_identity,
                nameAccount: e.full_name,
                phoneNumber: e.phone_number,
                nameBooking: e.username,
                nameField: e.name,
                city: e.city,
                scheduleHours: `${e.start_play}:00 - ${e.end_play}:00`,
                scheduleDate: moment(e.play_date).format('DD-MM-YYYY'),
                type: e.type,
                totalPayment: priceFormatter(e.total_payment),
                action: e,
                status: e,
              }))}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>

      {/* Modal Confirm */}
      <Modal
        title='Confirm'
        open={showConfirm}
        onOk={() => {
          handlePaymentStatus('success');
        }}
        onCancel={() => setShowConfirm(false)}
      >
        <p>{`Price = ${priceFormatter(dataConfirm.total_payment)}`}</p>
        <p>{`Payment price = ${priceFormatter(dataConfirm.total_dp)}`}</p>
        <p>{`Total Payment = ${priceFormatter(dataConfirm.total_payment - dataConfirm.total_dp)} (${
          dataConfirm.isDp ? 'down payment' : 'full payemnt'
        })`}</p>
        <p style={{ fontWeight: 'bold' }}>Are u sure want to confirm this payment ?</p>
      </Modal>

      {/* Modal Cancel */}
      <Modal
        title='Cancel'
        open={showCancel}
        onOk={() => {
          handlePaymentStatus('cancel');
        }}
        onCancel={() => setShowCancel(false)}
      >
        <p>Are u sure want to cancel this payment ?</p>
      </Modal>

      {/* Modal View */}
      <Modal
        title='Evidence of transfer'
        open={showView}
        okText={'oke'}
        closeIcon={false}
        onOk={() => setShowView(false)}
        onCancel={() => setShowView(false)}
      >
        <div className='w-100 d-flex justify-content-center'>
          <img src={image} alt='buktiTransfer' width={350} height={300} />
        </div>
      </Modal>

      <Modal
        title='Change Schedule'
        open={showChange}
        okText={'oke'}
        closeIcon={false}
        onOk={() => patchSchedule()}
        onCancel={() => setShowChange(false)}
        width={'100%'}
      >
        <Row>
          <Col span={12}>
            <div className='p-4'>
              <DatePicker
                onChange={onChangeDate}
                value={dayjs(bookingDate)}
                locale={locale}
                allowClear={false}
                disabledDate={(current) => {
                  const date = new Date();
                  date.setDate(date.getDate() - 1);
                  return current && current < dayjs(date).endOf('day');
                }}
              />
              <hr />
              <div className='d-flex flex-row flex-wrap w-100 gap-3'>
                {/* Button Booking */}
                {hour.map((hour) => (
                  <Button
                    onClick={() => selectSchedule(hour)}
                    type='primary'
                    disabled={!availableHour.includes(hour)}
                    key={hour}
                    style={{
                      backgroundColor: isButtonSelected(hour) ? '#ffb73f' : '',
                    }}
                  >
                    {formatHour(hour)}
                  </Button>
                ))}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Descriptions title='Information Booking'>
              <Descriptions.Item label='Play Date'>{moment(bookingDate).format('DD-MM-YYYY')}</Descriptions.Item>
            </Descriptions>
            <Descriptions title=''>
              <Descriptions.Item label='Start Play'>
                {!bookingTime.clockIn ? '-' : `${bookingTime.clockIn}:00`}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title=''>
              <Descriptions.Item label='End Play'>
                {!bookingTime.clockOut ? '-' : `${bookingTime.clockOut}:00`}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default PaymentOwner;
