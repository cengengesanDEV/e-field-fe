import React, { useState } from "react";
import Navbar from "../../components/parents/Navbar";
import Footer from "../../components/parents/Footer";
import { Button, Card, Col, Row, Steps, Typography, Input, DatePicker, Descriptions, Upload } from "antd";
import TitleName from "../../components/childern/TitleName";
import css from "../../styles/Payment.module.css";
import Sample from "../../assets/chair.jpg";

function Payment() {
  const [bookingTime, setBookingTime] = useState({
    clockIn: null,
    clockOut: null,
  });
  const [forceDisable, setForceDisable] = useState(null);
  const [val, setVal] = useState({});
  const { Title } = Typography

  const onChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
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
              <div style={{ fontStyle: "italic", fontSize: "12px", color: "black", marginTop: "20px" }}>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, ipsum, modi atque fuga ut dolorum corrupti, delectus alias quia eligendi quod quae provident!
                  Possimus quaerat officia animi sint! Repellendus, omnis amet. Alias velit voluptas optio magni necessitatibus repellat natus quas qui obcaecati maxime quia
                  placeat aut eum nobis laudantium, neque architecto et, id ab quaerat sint inventore esse. Quos vero odio modi
                </p>
              </div>
            </div>
          </Col>

          {/* Kanan */}
          <Col span={19} style={{ borderLeft: "2px solid #69b1ff", margin: "10px auto" }}>
            <div className="p-4">
              <div className="me-4 my-4">
                <p className={css.fontStyle}>Payment Fields Soccer Jakarta</p>
                <hr style={{color:'#69b1ff'}} />
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
                      <img src={Sample} alt="" width={150} height={100} style={{ borderRadius: "20px", boxShadow: "5px 5px 20px 2px #262626" }} />
                      <img src={Sample} alt="" width={150} height={100} style={{ borderRadius: "20px", boxShadow: "5px 5px 20px 2px #262626" }} />
                      <img src={Sample} alt="" width={150} height={100} style={{ borderRadius: "20px", boxShadow: "5px 5px 20px 2px #262626" }} />
                      <img src={Sample} alt="" width={150} height={100} style={{ borderRadius: "20px", boxShadow: "5px 5px 20px 2px #262626" }} />
                      <img src={Sample} alt="" width={150} height={100} style={{ borderRadius: "20px", boxShadow: "5px 5px 20px 2px #262626" }} />
                    </div>
                    <div className="mt-4">
                      <TitleName size={4} label="Description" />
                      <Row>
                        <Col style={{ fontFamily: 'Tilt Neon'}} span={7}>
                          <p>- Futsal Name</p>
                          <p>- Type</p>
                          <p>- Condition</p>
                          <p>- Schedule</p>
                          <p>- Price</p>
                        </Col>
                        <Col style={{ fontFamily: 'Tilt Neon'}} span={1}>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                        </Col>
                        <Col style={{ fontFamily: 'Tilt Neon'}} span={16}>
                          <p>Acil Futsal Club</p>
                          <p>Lapangan A</p>
                          <p>Grass</p>
                          <p>24 Hours</p>
                          <p>120.000 / hours</p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span={12} style={{ borderLeft: "1px solid grey" }}>
                    <TitleName size={4} label="Playing schedule" />
                    <DatePicker />
                    <hr style={{color:'#69b1ff'}} />
                    <div className="d-flex flex-row flex-wrap w-100 gap-3">
                      {["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"].map(
                        (clock, index) => (
                          <Button
                            key={index + 1}
                            onClick={(e) => handleTimeBooking(clock)}
                            type="primary"
                            disabled={clock < forceDisable}
                            danger={bookingTime.clockIn == clock || bookingTime.clockOut == clock}
                          >
                            {clock}:00
                          </Button>
                        )
                      )}
                    </div>
                    <hr style={{color:'#69b1ff'}} />
                    <TitleName size={5} label={`Clock in : ${bookingTime.clockIn ?? "-"}${bookingTime.clockIn ? ":00" : ""}`} />
                    <TitleName size={5} label={`Clock Out : ${bookingTime.clockOut ?? "-"}${bookingTime.clockOut ? ":00" : ""}`} />
                  </Col>
                </Row>
                <Row gutter={[20,20]} className="mt-5">
                  <Col span={8}>
                    <Card title="Information Booking" bordered={true} headStyle={{backgroundColor:'#ffb73f', color:'#FFF'}} bodyStyle={{background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`}}>
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
                    <Card title="Schedule" bordered={true} headStyle={{backgroundColor:'#ffb73f', color:'#FFF'}} bodyStyle={{background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`}}>
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
                    <Card title="Payment Method" bordered={true} headStyle={{backgroundColor:'#ffb73f', color:'#FFF'}} bodyStyle={{background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`}}>
                      <div className="py-2">
                        <Title level={5}>Transfer</Title>
                        <p>BCA 4104021123 a/n Muhammad farisan H</p>
                      </div>
                      <div className="py-2">
                      <Title level={5}>Upload Payment</Title>
                      <Upload>
                        <Button type="primary" style={{width:'100%'}}>upload</Button>
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
