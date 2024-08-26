import { Tag } from "antd";
import moment from "moment";
import parse from "html-react-parser";

export const StaffTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role ",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Status",
    key: "status",
    width: "8%",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={status === 1 ? "success" : status === 2 ? "error" : "default"}
        key={status}
      >
        {status === 1 ? "Active" : status === 2 ? "Inactive" : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: "15%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const CustomerTableColumns = [
  {
    title: " Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Contact No",
    key: "contactNo",
    dataIndex: "contactNo",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Status",
    key: "status",
    width: "14%",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={status === 1 ? "success" : status === 2 ? "error" : "default"}
        key={status}
      >
        {status === 1 ? "Active" : status === 2 ? "Inactive" : "none"}
      </Tag>
    ),
  },
];

export const RoleTableColumns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "index",
    render: (text, record, index) => (
      <div style={{ marginRight: "2px !important" }}>
        <span>{index + 1}</span>
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role Status",
    key: "role_status",
    dataIndex: "role_status",
    render: (role_status) => (
      <Tag
        color={
          role_status === 1
            ? "success"
            : role_status === 2
            ? "error"
            : "default"
        }
        key={role_status}
      >
        {role_status === 1 ? "Active" : role_status === 2 ? "Inactive" : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const CategoriesTableColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",

    render: (text, record) => (
      <div
        style={{
          maxWidth: 150,
          minWidth: 100,
        }}
      >
        {record.image}
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => {
      let displayText = "";

      if (typeof text === "string") {
        displayText = text.slice(0, 550);

        if (text.length > 550) {
          const lastSpaceIndex = displayText.lastIndexOf(" ");
          displayText = displayText.slice(0, lastSpaceIndex) + "...";
        }
      } else {
        displayText = "Invalid description";
      }

      return (
        <div
          style={{
            maxWidth: 800,
            minWidth: 200,
          }}
        >
          {parse(displayText)}
        </div>
      );
    },
  },
  {
    title: "Categories Status",
    key: "categories_status",
    width: "15%",
    dataIndex: "categories_status",
    render: (categories_status) => (
      <Tag
        color={
          categories_status === 1
            ? "success"
            : categories_status === 2
            ? "error"
            : "default"
        }
        key={categories_status}
      >
        {categories_status === 1
          ? "ACTIVE"
          : categories_status === 2
          ? "INACTIVE"
          : "none"}
      </Tag>
    ),
  },

  {
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const BranchTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Facilities",
    dataIndex: "facilities",
    key: "facilities",
  },
  {
    title: "URL",
    key: "url",
    dataIndex: "url",
  },

  {
    title: "Action",
    key: "action",
    width: "24%",
    render: (text, record) => <div>{record.action}</div>,
  },
];
