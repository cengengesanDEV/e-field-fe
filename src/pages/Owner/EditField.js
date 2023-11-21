import { Button, Card, Col, Empty, Input, InputNumber, Row, Select, Space, Table, Tag, TimePicker, Typography, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFieldUserId } from "../../utils/Axios";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Open - Close",
    dataIndex: "openClose",
    key: "openClose",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function EditField() {
  const navigate = useNavigate();
  const { Title } = Typography;
  const profile = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.token);

  const temp = [];
  for (let index = 1; index <= 24; index++) {
    temp.push({ value: index, label: `${index}:00` });
  }

  const [field, setField] = useState([]);
  const [val, setVal] = useState({});
  const [clock, setClock] = useState(temp);

  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  useEffect(() => {
    getField();
  }, []);

  const getField = () => {
    getFieldUserId(token)
      .then((res) => setField(res.data.data))
      .catch((err) => console.log(err));
  };

  const onChange = (e, flag) => {
    if (flag == "type") {
      setVal({ ...val, ["type"]: e });
    } else if (flag == "city") {
      setVal({ ...val, ["city"]: e });
    } else if (flag == "open") {
      if (e) {
        setVal({ ...val, ["start_hour"]: e });
        setClock(clock?.slice(e - 1));
      } else {
        setVal({ ...val, ["end_hour"]: "", ["start_hour"]: "" });
        setClock(temp);
      }
    } else if (flag == "close") {
      setVal({ ...val, ["end_hour"]: e });
    } else if (flag == "number") {
      setVal({ ...val, ["price"]: e });
    } else {
      setVal({ ...val, [e.target.name]: e.target.value });
    }
    // console.log("vals",e)
  };

  const onChangeImageSingle = (e, type) => {
    if (type == "single") {
      console.log("imageSingle", e.target.files[0]);
      setVal({ ...val, ["image_cover"]: e.target.files[0] });
    } else {
      let images = [];
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(e.target.files[i]);
      }
      setVal({ ...val, ["images"]: images });
    }
  };

  const resetImage = () => {
    setVal({ ...val, images: null, image_cover: null });
  };

  return (
    <>
      <div className="p-4">
        <Button type="ghost" onClick={() => navigate("/fields")}>
          Add Field
        </Button>
        <Button type="primary">Edit Field</Button>

        <div className="my-4">
          <hr />
          <Row gutter={[20, 20]}>
            {/* Card 1 */}
            <Col span={6}>
              <Card
                title="Information Field"
                bordered={true}
                headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                bodyStyle={{
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                }}
              >
                <div className="py-2">
                  <Title level={5}>Name Field</Title>
                  <Input name="name" value={val.name} onChange={(e) => onChange(e)} placeholder="Name Field Booking" />
                </div>
                <div className="py-2">
                  <Title level={5}>Type Field</Title>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select Type Soccer Fields"
                    optionFilterProp="children"
                    value={val.type}
                    onChange={(e) => onChange(e, "type")}
                    autoClearSearchValue={true}
                    allowClear={true}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={[
                      {
                        name: "Grass",
                        value: "Grass",
                        label: "Grass",
                      },
                      {
                        name: "Matras",
                        value: "Matras",
                        label: "Matras",
                      },
                    ]}
                  />
                </div>
                <div className="py-2">
                  <Title level={5}>Open Field</Title>
                  {/* <Input name="start_hour" onChange={(e) => onChange(e)} placeholder="input hours only" /> */}
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="open field"
                    optionFilterProp="children"
                    value={val.start_hour}
                    onChange={(e) => onChange(e, "open")}
                    autoClearSearchValue={true}
                    allowClear={true}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={clock.map((val, index) => val)}
                  />
                </div>
                <div className="py-2">
                  <Title level={5}>Close Field</Title>
                  {/* <Input name="end_hour" onChange={(e) => onChange(e)} placeholder="input hours only" /> */}
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="close field"
                    optionFilterProp="children"
                    value={val.end_hour}
                    onChange={(e) => onChange(e, "close")}
                    autoClearSearchValue={true}
                    allowClear={true}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={clock.map((val, index) => val)}
                  />
                </div>
                <div className="py-2">
                  <Title level={5}>Description</Title>
                  <Input name="description" value={val.description} onChange={(e) => onChange(e)} placeholder="Description Booking" />
                </div>
                <div className="py-2">
                  <Title level={5}>Price</Title>
                  <Input
                    name="price"
                    value={costing(val?.price || 0)}
                    onChange={(e) => {
                      const values = e.target.value;
                      const parser = values.replace(/[^0-9]/g, "");
                      onChange(parser, "number");
                    }}
                    placeholder="price"
                  />
                </div>
              </Card>
            </Col>

            {/* Card 2 */}
            <Col span={6}>
              <Card
                title="Information Location"
                bordered={true}
                headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                bodyStyle={{
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                }}
              >
                <div className="py-2">
                  <Title level={5}>Location</Title>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select Location Soccer Fields"
                    optionFilterProp="children"
                    value={val.city}
                    onChange={(e) => onChange(e, "city")}
                    autoClearSearchValue={true}
                    allowClear={true}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={[
                      {
                        value: "jakarta utara",
                        label: "jakarta utara",
                      },
                      {
                        value: "jakarta selatan",
                        label: "jakarta selatan",
                      },
                      {
                        value: "jakarta barat",
                        label: "jakarta barat",
                      },
                      {
                        value: "jakarta timur",
                        label: "jakarta timur",
                      },
                      {
                        value: "jakarta pusat",
                        label: "jakarta pusat",
                      },
                    ]}
                  />
                </div>
                <div className="py-2">
                  <Title level={5}>Address</Title>
                  <Input name="address" value={val.address} onChange={(e) => onChange(e)} placeholder="Address Booking" />
                </div>
              </Card>
            </Col>

            {/* Card 3 */}
            <Col span={6}>
              <Card
                title="Information Image Fields"
                bordered={true}
                headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                bodyStyle={{
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                }}
              >
                <div className="py-2">
                  <Title level={5}>Image Field Cover</Title>
                  <label htmlFor="single-image" style={{ cursor: "pointer", backgroundColor: "#ffb73f", padding: "5px", borderRadius: "10px", fontFamily: "Tilt Neon" }}>
                    upload
                  </label>
                  <input type="file" id="single-image" style={{ display: "none" }} onChange={(e) => onChangeImageSingle(e, "single")} />
                </div>
                <div className="py-2  ">
                  <Title level={5}>Image Fields Detail</Title>
                  <label htmlFor="multi-image" style={{ cursor: "pointer", backgroundColor: "#ffb73f", padding: "5px", borderRadius: "10px", fontFamily: "Tilt Neon" }}>
                    upload
                  </label>
                  <input type="file" id="multi-image" multiple={true} style={{ display: "none" }} onChange={(e) => onChangeImageSingle(e, "")} />
                </div>

                <div className="py-2">
                  <Title level={5}>List Cover</Title>
                  <p style={{ wordBreak: "break-all" }}>{val?.image_cover?.name || val?.image_cover || "-"}</p>
                  <Title level={5}>List Detail</Title>
                  {(val?.images || val?.imagesDetail || []).map((values) => (
                    <p style={{ wordBreak: "break-all" }}>{values?.name || values || "-"}</p>
                  ))}
                </div>

                <div className="py-2">
                  <Button type="primary" danger onClick={resetImage}>
                    Reset Image
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Card 4 */}
            <Col span={6}>
              <Card
                title="Information Payment"
                bordered={true}
                headStyle={{ backgroundColor: "#ffb73f", color: "#FFF" }}
                bodyStyle={{
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='11' height='11' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='0' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3Ccircle cx='40' cy='20' r='1' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
                }}
              >
                <div className="py-2">
                  <Title level={5}>Bank & No Rekening</Title>
                  <Input placeholder="Atas nama" value={profile?.bank_name || "-"} readOnly />
                </div>
                <div className="py-2">
                  <Title level={5}>Name Indetity</Title>
                  <Input placeholder="Information Bank & No Rekening" value={profile?.no_rekening || "-"} readOnly />
                </div>
              </Card>
            </Col>
          </Row>

          <Typography.Title level={3} className="my-5" underline>
            Information Detail Fields
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={field.map((value, index) => ({
              key: index + 1,
              no: index + 1,
              name: value.name,
              openClose: `${value.start_hour}:00 - ${value.end_hour}:00`,
              type: value.type,
              city: value.city,
              address: value.address,
              price: costing(value?.price || 0),
              action: (
                <>
                  <Button type="primary" onClick={() => {setVal(value); window.scrollTo(0, 0)}} style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
}

export default EditField;