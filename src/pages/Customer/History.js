import { Button, Col, Collapse, Row, Select } from "antd";
import React from "react";

function History() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <div className="p-4">
        <Select style={{ width: "20%" }} placeholder='History status'>
          <Select.Option>asd</Select.Option>
          <Select.Option>asd</Select.Option>
        </Select>
      </div>

      <div className="p-4">
        <Collapse defaultActiveKey={["1"]} accordion onChange={onChange} >
          <Collapse.Panel header="Acil Futsal Jakarta Utara" key="1"  style={{backgroundColor:'#e6f7ff', fontFamily: "Tilt Neon"}}>
            <Row>
              <Col span={5} style={{ fontFamily: "Tilt Neon" }}>
                <p>No. Identity</p>
                <p>Name</p>
                <p>Email</p>
                <p>Phone Number</p>
                <p>Gender</p>
                <p>City</p>
                <p>Alamat</p>
                <p>Status</p>
              </Col>
              <Col span={1} style={{ fontFamily: "Tilt Neon" }}>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </Col>
              <Col span={12} style={{ fontFamily: "Tilt Neon" }}>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
                <p>{"-"}</p>
              </Col>
              <Col span={6} className="d-flex flex-row align-items-center justify-content-end">
                <Button type="primary">Bukti Payment</Button>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </div>
    </>
  );
}

export default History;
