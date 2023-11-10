import React, { useEffect, useState } from "react";
// import Navbar from "../../components/parents/Navbar";
// import Footer from "../../components/parents/Footer";
import {
  Button,
  Card,
  Col,
  Row,
  Steps,
  Typography,
  Input,
  DatePicker,
  Upload,
} from "antd";
import TitleName from "../../components/childern/TitleName";
import css from "../../styles/Payment.module.css";
import Sample from "../../assets/chair.jpg";
import locale from "antd/es/date-picker/locale/id_ID";
import dayjs from "dayjs";
import { getDetailField } from "../../utils/Axios";
import { useParams } from "react-router-dom";

function Payment() {
  const [bookingTime, setBookingTime] = useState({
    clockIn: null,
    clockOut: null,
  });
  const [forceDisable, setForceDisable] = useState(null);
  const [val, setVal] = useState({});
  const { Title } = Typography;
  const [date, setDate] = useState(new Date());
  const [fieldData, setFieldData] = useState(null);
  const [hour,setHour] = useState([])
  const params = useParams();

  const onChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  const onChangeDate = (date) => {
    console.log(new Date());
    setDate(date);
  };

  useEffect(() => {
    getField();
  }, [date]);
  

  const getField = async () => {
    try {
      const dataField = await getDetailField(params.id, date)
      await setFieldData(dataField.data.data);
      const dataHour = []
      console.log(dataField)
      for (let i = dataField.data.data.field.start_hour; i <= dataField.data.data.field.end_hour; i++) {
        dataHour.push(i)
      }
      setBookingTime({ ...bookingTime, clockIn: null, clockOut: null })
      setHour(dataHour)
    } catch (error) {
      console.log({ error });
    }
  };

  const handleTimeBooking = (e) => {
    const clock = e;
    if (clock == bookingTime.clockIn) {
      setForceDisable(null);
      setBookingTime({ ...bookingTime, clockIn: null, clockOut: null });
    } else if (clock == bookingTime.clockOut) {
      setBookingTime({ ...bookingTime, clockOut: null });
    } else if (bookingTime.clockIn == null) {
      setForceDisable(clock);
      setBookingTime({ ...bookingTime, clockIn: clock });
    } else {
      setBookingTime({ ...bookingTime, clockOut: clock });
    }
  };

  console.log("CLOCK", bookingTime);

  return (
    <>
      {/* <Navbar /> */}

      <div className="w-100">
        <Row>
          {/* Kiri */}
          <Col span={5}>
            <div className="p-4">
              <TitleName size={4} label="Information" />
              <hr />
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "12px",
                  color: "black",
                  marginTop: "20px",
                }}
              >
                <p>{fieldData?.field?.description||'-'}</p>
              </div>
            </div>
          </Col>

          {/* Kanan */}
          <Col
            span={19}
            style={{ borderLeft: "2px solid #69b1ff", margin: "10px auto" }}
          >
            <div className="p-4">
              <div className="me-4 my-4">
                <p className={css.fontStyle}>Payment Fields Soccer Jakarta</p>
                <hr style={{ color: "#69b1ff" }} />
                <Steps
                  size="small"
                  current={1}
                  items={[
                    {
                      title: "Booking soccer fields",
                    },
                    {
                      title: "Booking payment",
                    },
                    {
                      title: "Success booking",
                    },
                  ]}
                />
              </div>
              <div className="">
                <Row gutter={[20, 20]}>
                  <Col span={12}>
                    <TitleName size={5} label="Detail soccer fields" />
                    <div className="d-flex flex-row flex-wrap w-100 gap-3">
                     {fieldData && <img
                        src={fieldData.field.image_cover}
                        alt=""
                        width={150}
                        height={100}
                        style={{
                          borderRadius: "20px",
                          boxShadow: "5px 5px 20px 2px #262626",
                        }}
                      />}
                      {fieldData?.images && fieldData.images.map((images) => (
                        <img
                          src={images}
                          alt=""
                          width={150}
                          height={100}
                          style={{
                            borderRadius: "20px",
                            boxShadow: "5px 5px 20px 2px #262626",
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-4">
                      <TitleName size={4} label="Description" />
                      <Row>
                        <Col style={{ fontFamily: "Tilt Neon" }} span={7}>
                          <p>- Futsal Name</p>
                          <p>- City</p>
                          <p>- Schedule</p>
                          <p>- Price</p>
                        </Col>
                        <Col style={{ fontFamily: "Tilt Neon" }} span={1}>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                        </Col>
                        <Col style={{ fontFamily: "Tilt Neon" }} span={16}>
                          <p>{fieldData?.field?.name || '-'}</p>
                          <p>{fieldData?.field?.city || '-'}</p>
                          <p>{`${fieldData?.field?.start_hour || '-'}:00 - ${fieldData?.field?.end_hour || '-'}:00`}</p>
                          <p>{`${fieldData?.field?.price || '-'} / hour`}</p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span={12} style={{ borderLeft: "1px solid grey" }}>
                    <TitleName size={4} label="Playing schedule" />
                    <DatePicker
                      onChange={onChangeDate}
                      value={dayjs(date)}
                      locale={locale}
                      allowClear={false}
                    />
                    <hr style={{ color: "#69b1ff" }} />
                    <div className="d-flex flex-row flex-wrap w-100 gap-3">
                      {hour.length>0 && hour.map((clock, index) => (
                        <Button
                          key={index + 1}
                          onClick={(e) => handleTimeBooking(clock)}
                          type="primary"
                          disabled={(fieldData.booking && fieldData.booking.includes(clock)) || clock < forceDisable}
                          danger={
                            bookingTime.clockIn == clock ||
                            bookingTime.clockOut == clock
                          }
                        >
                          {clock}:00
                        </Button>
                      ))}
                    </div>
                    <hr style={{ color: "#69b1ff" }} />
                    <TitleName
                      size={5}
                      label={`Clock in : ${bookingTime.clockIn ?? "-"}${
                        bookingTime.clockIn ? ":00" : ""
                      }`}
                    />
                    <TitleName
                      size={5}
                      label={`Clock Out : ${bookingTime.clockOut ?? "-"}${
                        bookingTime.clockOut ? ":00" : ""
                      }`}
                    />
                  </Col>
                </Row>
                <Row gutter={[20, 20]} className="mt-5">
                  <Col span={8}>
                    <Card
                      title="Information Booking"
                      bordered={true}
                      headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                      bodyStyle={{
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                      }}
                    >
                      <div className="py-2">
                        <Title level={5}>Username</Title>
                        <Input placeholder="Username Booking" />
                      </div>
                      <div className="py-2">
                        <Title level={5}>No Identity</Title>
                        <Input placeholder="Number Identity" disabled />
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      title="Schedule"
                      bordered={true}
                      headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                      bodyStyle={{
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                      }}
                    >
                      <div className="py-2">
                        <Title level={5}>Clock In</Title>
                        <Input placeholder="Clock in" disabled />
                      </div>
                      <div className="py-2">
                        <Title level={5}>Clock Out</Title>
                        <Input placeholder="Clock out" disabled />
                      </div>
                      <div className="py-2">
                        <Title level={5}>Date</Title>
                        <Input placeholder="Date" disabled />
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      title="Payment Method"
                      bordered={true}
                      headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                      bodyStyle={{
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                      }}
                    >
                      <div className="py-2">
                        <Title level={5}>Transfer</Title>
                        <p>BCA 4104021123 a/n Muhammad farisan H</p>
                      </div>
                      <div className="py-2">
                        <Title level={5}>Upload Payment</Title>
                        <Upload>
                          <Button type="primary" style={{ width: "100%" }}>
                            upload
                          </Button>
                        </Upload>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Button type="primary">Payment</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Payment;
