import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Label,
  Input,
  Button,
} from "reactstrap";
import {
  checkPermission,
  customSweetAlert,
  customToastMsg,
  handleError,
  popUploader,
} from "../../../common/commonFunctions";
import classnames from "classnames";
import { Table } from "antd";
import { Pagination } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment"; // Import moment
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import Select from "react-select";
import * as reservationService from "../../../service/reservationService";
import {
  ReservationListTableColumns,
  ReservationReportTableColumns,
} from "../../../common/tableColumns";
import { FileText } from "react-feather";
import Cookies from "js-cookie";
import * as constants from "../../../common/constants";
import axios from "axios";

const ReservationReport = () => {
  document.title = "Table Reservation Report | Restaurant";

  const history = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const [reservationList, setReservationList] = useState([]);
  const [searchReservationCode, setSearchReservationCode] = useState("");
  const [searchCustomerEmail, setSearchCustomerEmail] = useState("");
  const [searchCustomerContactNo, setSearchCustomerContactNo] = useState("");
  const [searchDateRange, setSearchDateRange] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchList, setBranchList] = useState([]);

  //-------------------------- pagination --------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecodes, setTotalRecodes] = useState(0);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    loadAllReservations(currentPage);
  }, []);

  const loadAllReservations = async (currentPage) => {
    let temp = [];
    clearFiltrationFields();
    popUploader(dispatch, true);
    await reservationService
      .getAllReservations(currentPage)
      .then((resp) => {
        console.log(resp);
        resp?.data?.records.map((ord, index) => {
          temp.push({
            orderCode: ord?.orderCode,
            cusEmail: ord?.billingDetail[0]?.email,
            contactNo: ord?.billingDetail[0]?.contactNo,
            orderDate: moment(ord?.billingDetail[0]?.createdAt).format(
              "YYYY-MM-DD"
            ),
            total: parseFloat(ord?.netTotal).toFixed(2),
            status: ord?.status,
          });
        });
        setReservationList(temp);
        setCurrentPage(resp?.data?.currentPage);
        setTotalRecodes(resp?.data?.totalRecords);
        popUploader(dispatch, false);
      })
      .catch((err) => {
        console.log(err);
        popUploader(dispatch, false);
        handleError(err);
      })
      .finally();
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      history("/report-management");
      setSelectedStatus(type);
      debounceHandleSearchReservationFiltration(
        searchReservationCode,
        searchCustomerContactNo,
        selectedBranch,
        searchCustomerEmail,
        searchDateRange,
        type,
        1
      );
    }
  };

  const handleSearchReservationFiltration = (
    reservationCode,
    contact,
    branch,
    email,
    dateRange,
    Status,
    currentPage
  ) => {
    if (
      !reservationCode &&
      !contact &&
      (branch === undefined || branch === null || branch === "") &&
      !email &&
      (dateRange === undefined || dateRange === null || dateRange === "") &&
      (Status === undefined || Status === null || Status === "")
    ) {
      loadAllReservations(currentPage);
    } else {
      let startDate = "";
      let endDate = "";

      if (dateRange && dateRange.length === 2) {
        startDate = moment(dateRange[0]).format("YYYY-MM-DD");
        endDate = moment(dateRange[1]).format("YYYY-MM-DD");
      }

      setReservationList([]);
      let data = {
        reservationCode: reservationCode,
        contact: contact,
        branch: branch,
        email: email,
        startDate: startDate,
        endDate: endDate,
        status: Status === undefined ? "" : Status === null ? "" : Status,
      };

      console.log(data);

      let temp = [];
      popUploader(dispatch, true);
      reservationService
        .reservationsFiltration(data, currentPage)
        .then((resp) => {
          console.log(resp);
          resp?.data?.records.map((ord, index) => {
            temp.push({
              orderCode: ord?.orderCode,
              cusEmail: ord?.billingDetail[0]?.email,
              contactNo: ord?.billingDetail[0]?.contactNo,
              orderDate: moment(ord?.billingDetail[0]?.createdAt).format(
                "YYYY-MM-DD"
              ),
              total: parseFloat(ord?.netTotal).toFixed(2),
              status: ord?.status,
            });
          });
          setReservationList(temp);
          setCurrentPage(resp?.data?.currentPage);
          setTotalRecodes(resp?.data?.totalRecords);
          popUploader(dispatch, false);
        })
        .catch((err) => {
          handleError(err);
          popUploader(dispatch, false);
        });
    }
  };

  const debounceHandleSearchReservationFiltration = React.useCallback(
    debounce(handleSearchReservationFiltration, 500),
    []
  );

  const downloadReservationDataExcel = async () => {
    popUploader(dispatch, true);
    let startDate = "";
    let endDate = "";

    if (searchDateRange && searchDateRange.length === 2) {
      startDate = moment(searchDateRange[0]).format("YYYY-MM-DD");
      endDate = moment(searchDateRange[1]).format("YYYY-MM-DD");
    }

    let access_token = Cookies.get(constants.ACCESS_TOKEN);
    await axios
      .get(
        // `https://api.eazykitchen.lk/api/excel-report/report/orders?orderId=${searchOrderId}&contactNo=${searchCustomerContactNo}&orderStatus=${selectedStatus}&deliverySlot=${selectedDeliverySlot}&paymentType=${selectedPaymentType}&paymentStatus=${selectedPaymentStatus}&deliveryStartDate=${startDate}&deliveryEndDate=${endDate}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `reservation_detail_report.xlsx`);
        document.body.appendChild(link);
        link.click();
        popUploader(dispatch, false);
        customToastMsg("Excel file download successfully", 1);
      })
      .catch((err) => {
        popUploader(dispatch, false);
        handleError(err);
      });
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPage(page);

    if (
      !searchReservationCode &&
      !searchCustomerContactNo &&
      (selectedBranch === undefined ||
        selectedBranch === null ||
        selectedBranch === "") &&
      !searchCustomerEmail &&
      (searchDateRange === undefined ||
        searchDateRange === null ||
        searchDateRange === "") &&
      (selectedStatus === undefined ||
        selectedStatus === null ||
        selectedStatus === "")
    ) {
      loadAllReservations(page);
    } else {
      debounceHandleSearchReservationFiltration(
        searchReservationCode,
        searchCustomerContactNo,
        selectedBranch,
        searchCustomerEmail,
        searchDateRange,
        selectedStatus,
        page
      );
    }
  };

  const clearFiltrationFields = () => {
    setActiveTab("1");
    setSearchReservationCode("");
    setSearchCustomerEmail("");
    setSearchDateRange("");
    setSelectedStatus("");
  };

  return (
    <div className="mx-3">
      <div className="row mt-3">
        <h4>Table Reservation Report</h4>
      </div>
      <Row className="d-flex mb-4 mx-1 justify-content-end">
        <Col sm={12} md={3} lg={3} xl={3}>
          <Button
            color="primary"
            className="w-100"
            onClick={downloadReservationDataExcel}
          >
            <FileText size={24} /> Download Excel Report
          </Button>
        </Col>
      </Row>
      <div>
        <Nav className="nav-tabs nav-tabs-custom nav-primary" role="tablist">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggleTab("1", "");
              }}
              href="#"
            >
              <i className="ri-store-2-fill me-1 align-bottom"></i> All
              Reservations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggleTab("2", "PENDING");
              }}
              href="#"
            >
              <i className="ri-restart-line me-1 align-bottom"></i>
              Pending
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggleTab("3", "ACCEPT");
              }}
              href="#"
            >
              <i className="ri-checkbox-circle-fill me-1 align-bottom"></i>{" "}
              Accept
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggleTab("4", "REJECTED");
              }}
              href="#"
            >
              <i className="ri-error-warning-fill me-1 align-bottom"></i>{" "}
              Rejected
            </NavLink>
          </NavItem>
        </Nav>

        <Row className="mt-3">
          <Col sm={12} md={6} lg={4} xl={4} xxl={4}>
            <Label>Search By Reservation Code</Label>
            <Input
              placeholder="ORD-000000"
              value={searchReservationCode}
              className="mb-3"
              onChange={(e) => {
                debounceHandleSearchReservationFiltration(
                  e.target.value,
                  searchCustomerContactNo,
                  selectedBranch,
                  searchCustomerEmail,
                  searchDateRange,
                  selectedStatus,
                  1
                );
                setSearchReservationCode(e.target.value);
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4} xl={4} xxl={4}>
            <Label>Search By Customer Contact No</Label>
            <Input
              placeholder="Enter contact no"
              type="number"
              value={searchCustomerContactNo}
              onChange={(e) => {
                debounceHandleSearchReservationFiltration(
                  searchReservationCode,
                  e.target.value,
                  selectedBranch,
                  searchCustomerEmail,
                  searchDateRange,
                  selectedStatus,
                  1
                );
                setSearchCustomerContactNo(e.target.value);
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4} xl={4} xxl={4}>
            <Label for="exampleEmail">Search by Branch</Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              isClearable
              onChange={(e) => {
                setSelectedBranch(
                  e?.value === undefined ? "" : e === null ? "" : e.value
                );
                debounceHandleSearchReservationFiltration(
                  searchReservationCode,
                  searchCustomerContactNo,
                  e?.value === undefined ? "" : e === null ? "" : e.value,
                  searchCustomerEmail,
                  searchDateRange,
                  selectedStatus,
                  1
                );
              }}
              options={branchList}
            />
          </Col>
          <Col sm={12} md={6} lg={6} xl={4} xxl={4}>
            <Label>Search By Customer Email</Label>
            <Input
              placeholder="Enter customer email"
              value={searchCustomerEmail}
              type="email"
              onChange={(e) => {
                debounceHandleSearchReservationFiltration(
                  searchReservationCode,
                  searchCustomerContactNo,
                  selectedBranch,
                  e.target.value,
                  searchDateRange,
                  selectedStatus,
                  1
                );
                setSearchCustomerEmail(e.target.value);
              }}
            />
          </Col>

          <Col sm={12} md={12} lg={6} xl={4} xxl={4}>
            <Label>Search By Reserved Date Range</Label>
            <RangePicker
              style={{ height: 40, width: "100%", borderRadius: 4 }}
              onChange={(selectedDates) => {
                if (selectedDates) {
                  const formattedDates = selectedDates.map((date) =>
                    date ? date.format("YYYY-MM-DD") : null
                  );
                  debounceHandleSearchReservationFiltration(
                    searchReservationCode,
                    searchCustomerContactNo,
                    selectedBranch,
                    searchCustomerEmail,
                    formattedDates,
                    selectedStatus,
                    1
                  );
                  setSearchDateRange(formattedDates);
                } else {
                  setSearchDateRange("");
                  debounceHandleSearchReservationFiltration(
                    searchReservationCode,
                    searchCustomerContactNo,
                    selectedBranch,
                    searchCustomerEmail,
                    "",
                    selectedStatus,
                    1
                  );
                }
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={12} lg={12}>
            <Table
              className="mx-3 my-4"
              pagination={false}
              columns={ReservationReportTableColumns}
              dataSource={reservationList}
              scroll={{ x: "fit-content" }}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col
            className=" d-flex justify-content-end"
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Pagination
              className="m-3"
              current={currentPage}
              onChange={onChangePagination}
              defaultPageSize={15}
              total={totalRecodes}
              showSizeChanger={false}
              showTotal={(total) => `Total ${total} items`}
            />
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default ReservationReport;
