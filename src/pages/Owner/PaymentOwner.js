import { Table, Typography, Space, Tag, Select, Input } from "antd";
import React from "react";

function PaymentOwner() {
  const columns = [
    {
      title: "no",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <div className="p-4">
        <div>
          <Typography.Title level={3} className="my-3" underline>
            Confirm Payment
          </Typography.Title>

          <Select
            showSearch
            placeholder="History status"
            // value={status}
            // onChange={changeStatus}
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


          <div className="d-flex flex-row align-items-center justify-content-start gap-2 my-3">
          <Typography.Title level={5} className="">search : </Typography.Title>
            <Input placeholder="search name" style={{ width: "200px" }} />
            <Select
              showSearch
              placeholder="type field"
              // value={status}
              // onChange={changeStatus}
              allowClear
              style={{ width: "200px" }}
              options={[
                {
                  value: "grass",
                  label: "Grass",
                },
                {
                  value: "matras",
                  label: "Matras",
                },
              ]}
            />
          </div>

          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
}

export default PaymentOwner;
