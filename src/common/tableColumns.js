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

export const ServiceTableColumns = [
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
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const OfferTableColumns = [
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
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const InquiryTableColumns = [
  {
    title: "Customer Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },

  {
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const DeliveryOrderListTableColumns = [
  {
    title: "Order Code",
    dataIndex: "orderCode",
    key: "orderCode",
  },

  {
    title: "Customer Email",
    dataIndex: "cusEmail",
    key: "cusEmail",
  },

  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },

  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },

  {
    title: "Payment Type",
    key: "paymentType",
    width: "15%",
    dataIndex: "paymentType",
    render: (paymentType) => (
      <Tag
        color={
          paymentType === "ONLINE_PAYMENT"
            ? "processing"
            : paymentType === "CASH_ON_DELIVERY"
            ? "purple"
            : "default"
        }
        key={paymentType}
      >
        {paymentType === "ONLINE_PAYMENT"
          ? "ONLINE_PAYMENT"
          : paymentType === "CASH_ON_DELIVERY"
          ? "CASH_ON_DELIVERY"
          : "none"}
      </Tag>
    ),
  },
  {
    title: "Status",
    key: "status",
    width: "15%",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={
          status === "PENDING"
            ? "warning"
            : status === "PROCESSING"
            ? "processing"
            : status === "SHIPPED"
            ? "purple"
            : status === "DELIVERED"
            ? "success"
            : status === "CANCELLED"
            ? "error"
            : status === "REJECTED"
            ? "magenta"
            : "default"
        }
        key={status}
      >
        {status === "PENDING"
          ? "PENDING"
          : status === "PROCESSING"
          ? "PROCESSING"
          : status === "SHIPPED"
          ? "SHIPPED"
          : status === "DELIVERED"
          ? "DELIVERED"
          : status === "CANCELLED"
          ? "CANCELLED"
          : status === "REJECTED"
          ? "REJECTED"
          : "none"}
      </Tag>
    ),
  },

  {
    title: "Action",
    key: "action",

    render: (text, record) => <div>{record.action}</div>,
  },
];

export const DiningOrderListTableColumns = [
  {
    title: "Order Code",
    dataIndex: "orderCode",
    key: "orderCode",
  },

  {
    title: "Customer Email",
    dataIndex: "cusEmail",
    key: "cusEmail",
  },

  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },

  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },

  {
    title: "Payment Type",
    key: "paymentType",
    width: "15%",
    dataIndex: "paymentType",
    render: (paymentType) => (
      <Tag
        color={
          paymentType === "ONLINE_PAYMENT"
            ? "processing"
            : paymentType === "CASH_ON_DELIVERY"
            ? "purple"
            : "default"
        }
        key={paymentType}
      >
        {paymentType === "ONLINE_PAYMENT"
          ? "ONLINE_PAYMENT"
          : paymentType === "CASH_ON_DELIVERY"
          ? "CASH_ON_DELIVERY"
          : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const ReservationListTableColumns = [
  {
    title: "Reservation Code",
    dataIndex: "reservationCode",
    key: "reservationCode",
  },
  {
    title: "Name",
    dataIndex: "cusName",
    key: "cusName",
  },
  {
    title: "Customer Email",
    dataIndex: "cusEmail",
    key: "cusEmail",
  },

  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Reserved Date",
    dataIndex: "reservedDate",
    key: "reservedDate",
  },
  {
    title: "Reserved Time",
    dataIndex: "reservedTime",
    key: "reservedTime",
  },
  {
    title: "Person Count",
    dataIndex: "personCount",
    key: "personCount",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Status",
    key: "status",
    // width: "15%",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={
          status === "PENDING"
            ? "warning"
            : status === "ACCEPT"
            ? "success"
            : status === "REJECTED"
            ? "error"
            : "default"
        }
        key={status}
      >
        {status === "PENDING"
          ? "PENDING"
          : status === "ACCEPT"
          ? "ACCEPT"
          : status === "REJECTED"
          ? "REJECTED"
          : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>{record.action}</div>,
  },
];
