import React from "react";
import { Card, Container } from "reactstrap";
import { Tabs } from "antd";
import ReservationReport from "./ReservationReport";
import OrderReport from "./OrderReport";

const ReportManagement = () => {
  document.title = "Reports | Restaurant";
  const { TabPane } = Tabs;

  const onChangeeee = (key) => {
    console.log(key);
  };

  const tab = [
    {
      label: "Reservation Reports",
      key: "1",
      children: <ReservationReport />,
    },
    {
      label: "Order Reports",
      key: "2",
      children: <OrderReport />,
    },
    // {
    //   label: "Payment Reports",
    //   key: "2",
    //   children: <Permission />,
    // },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Tabs onChange={onChangeeee} type="card" className="mt-3">
          {tab.map((item) => (
            <TabPane tab={item.label} key={item.key}>
              <Card className="border-top-0">{item.children}</Card>
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default ReportManagement;
