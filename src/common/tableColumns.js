import { Tag } from "antd";
import moment from "moment";

export const StaffTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "14%",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "23%",
    ellipsis: true,
  },
  {
    title: "Role ",
    dataIndex: "roleName",
    key: "roleName",
    width: "15%",
    ellipsis: true,
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
    width: "15%",
    ellipsis: true,
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
        // style={{ pointerEvents: "none" }}
      >
        {status === 1 ? "Active" : status === 2 ? "Inactive" : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>{record.action}</div>,
  },
];

