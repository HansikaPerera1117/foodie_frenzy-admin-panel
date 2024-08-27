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

const InquiryModal = ({ isOpen, currentData, onClose }) => {
  

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
        Inquiry
      </ModalHeader>
      <ModalBody>
      
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            onClose();
            clearFields();
          }}
        >
          Cancel
        </Button>{" "}
       
      </ModalFooter>
    </Modal>
  );
};

export default InquiryModal;
