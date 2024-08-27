import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import {
  countDescription,
  customSweetAlert,
  customToastMsg,
  handleError,
  popUploader,
} from "../../../common/commonFunctions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { Alert } from "antd";
import CustomImageUploader from "../upload/ImageUploader";
import { desMaxLimit } from "../../../common/util";
import { updateService } from "../../../service/serviceService";
import { MessageBox } from "react-chat-elements";
import { sendInquiryResponse } from "../../../service/inquiryService";
import chatBg from "../../../assets/images/inquiryChatBg.jpg";

const InquiryModal = ({ isOpen, currentData, onClose }) => {
  const [customerInquiry, setCustomerInquiry] = useState("");

  let dispatch = useDispatch();

  // useEffect(() => {
  //   setDataToInputs();
  // }, [isOpen]);

  // const setDataToInputs = () => {
  //   setCustomerInquiry(currentData.name);
  // };

  const handleUpdateService = () => {
    let isValidated = false;
    if (customerInquiry === "") {
      customToastMsg("Inquiry response cannot be empty");
    } else {
      isValidated = true;
    }

    const data = {
      response: customerInquiry,
    };

    if (isValidated) {
      popUploader(dispatch, true);
      sendInquiryResponse(currentData.id, data)
        .then((resp) => {
          onClose();
          clearFields();
          popUploader(dispatch, false);
          customToastMsg("Inquiry response send successfully", 1);
        })
        .catch((err) => {
          popUploader(dispatch, false);
          handleError(err);
        });
    }
  };

  const clearFields = () => {
    setCustomerInquiry("");
  };

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      toggle={() => {
        onClose();
        clearFields();
      }}
    >
      <ModalHeader
        toggle={() => {
          onClose();
          clearFields();
        }}
      >
        Customer Inquiry
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Label for="customerName">Customer</Label>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <Label for="customerName" className="fw-semibold">
                      {currentData?.customer?.firstName
                        .charAt(0)
                        .toUpperCase() +
                        currentData?.customer?.firstName
                          .slice(1)
                          .toLowerCase() +
                        " " +
                        (currentData?.customer?.lastName
                          .charAt(0)
                          .toUpperCase() +
                          currentData?.customer?.lastName
                            .slice(1)
                            .toLowerCase())}
                    </Label>
                  </Col>

                  <Col sm={12} md={12} lg={12} xl={12}>
                    <Label for="supplierContactNo">
                      {currentData?.customer?.contactNo}
                    </Label>
                  </Col>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <Label for="supplierContactNo">
                      {currentData?.customer?.email}
                    </Label>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
          <Label for="supplierName" className="fw-semibold">
            Inquiry
          </Label>

          <div
            className="position-relative"
            id="users-chat"
            style={{
              backgroundImage: { chatBg },
              backgroundColor: "#fffaee",
              height: 300,
              borderRadius: 20,
            }}
          >
            <div
              className="chat-conversation p-3 p-lg-4"
              id="chat-conversation"
              style={{ height: 300 }}
            >
              <ul
                className="list-unstyled chat-conversation-list"
                id="users-conversation"
              >
                <li
                  className={
                    currentData?.question?.sendBy === "CUSTOMER"
                      ? "chat-list left"
                      : "chat-list right"
                  }
                >
                  <div className="conversation-list">
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <MessageBox
                          position={
                            currentData?.question?.sendBy === "CUSTOMER"
                              ? "left"
                              : "right"
                          }
                          type={"text"}
                          titleColor={
                            currentData?.question?.sendBy === "CUSTOMER"
                              ? "#8717ae"
                              : currentData?.question?.sendBy === "LEADER"
                              ? "#efb921"
                              : "green"
                          }
                          title={currentData?.question?.sendBy}
                          text="Sorry!! Somthing wrong in media fromat"
                          data={{
                            audioURL: currentData?.question?.file?.path,
                          }}
                        />
                      </div>
                      <div className="conversation-name">
                        <small className="text-muted time">
                          {currentData?.question?.createdAt}{" "}
                        </small>{" "}
                        <span className="text-success check-message-icon">
                          <i className="ri-check-double-line align-bottom"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  className={
                    currentData?.reply?.sendBy === "LEADER"
                      ? "chat-list right"
                      : "chat-list left"
                  }
                ></li>
              </ul>
            </div>
            <div
              className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
              id="copyClipBoard"
              role="alert"
            >
              Message copied
            </div>
          </div>
        </Row>

        <Row>
          <Col sm="12">
            <Form className="mt-2">
              <Row>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="customerInquiry">Response</Label>
                    <Input
                      type="text"
                      name="customerInquiry"
                      id="customerInquiry"
                      placeholder="Enter your response"
                      value={customerInquiry}
                      onChange={(e) => setCustomerInquiry(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            onClose();
            clearFields();
          }}
        >
          Close
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => {
            onClose();
            clearFields();
          }}
        >
          Cancel
        </Button>{" "}
        <Button color="primary" onClick={handleUpdateService}>
          Send Inquiry Response
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InquiryModal;
