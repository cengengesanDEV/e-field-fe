import { Button, Col, Collapse, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";

function History() {
  const [status, setStatus] = useState("pending");
  const [collapse, setCollapse] = useState(1);

  // onChange status di select
  const changeStatus = (key) => {
    setStatus(key ?? "pending");
  };

  // onChange buka tutup collapse nya
  const changeTabCollapse = (e) => {
    setCollapse(e);
  };

  // untuk membuka activeKey collapse ke tab 1 jika merubah status
  useEffect(() => {
    setCollapse(["1"]);
  }, [status]);

  return (
    <>
      <div className="px-4 pt-4">
        <Typography.Title level={3} className="" underline>
          Information History Payment
        </Typography.Title>
      </div>

      <div className="p-4">
        <Select
          showSearch
          placeholder="History status"
          value={status}
          onChange={changeStatus}
          allowClear
          style={{ width: "200px" }}
          options={[
            {
              value: "pending",
              label: "Menunggu konfirmasi",
            },
            {
              value: "success",
              label: "Sudah dikonfirmasi",
            },
          ]}
        />
        <hr />

        {/* Table Collapse */}
        <Collapse defaultActiveKey={["1"]} accordion activeKey={collapse} onChange={(e) => changeTabCollapse(e)}>
          {["1", "2",'3'].map((e, i) => (
            <Collapse.Panel header="Acil Futsal Jakarta Utara" key={e} activeKey="1" style={{ backgroundColor: "#1677ff", fontFamily: "Tilt Neon" }}>
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
                <Col span={6} className="d-flex flex-row align-activeKey-center justify-content-end">
                  <Button type="primary">Bukti Payment</Button>
                </Col>
              </Row>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
}

export default History;
