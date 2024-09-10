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

const UpdateServiceModal = ({ isOpen, currentData, onClose }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDes, setServiceDes] = useState("");

  //--------------------image uploader----------------------

  const [mainImage, setMainImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImagesLoader, setMainImagesLoader] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [currentMain, setCurrentMain] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    setDataToInputs();
  }, [isOpen]);

  const setDataToInputs = () => {
    setServiceName(currentData.name);
    setServiceDes(
      currentData.description != null ? currentData.description : ""
    );
    currentData.files?.map(async (f, index) => {
      if (f.isDefault) {
        await setCurrentMain([f]);
      }
    });
  };

  const handleUpdateService = () => {
    let isValidated = false;
    if (serviceName === "") {
      customToastMsg("Service name cannot be empty");
    } else if (serviceDes === "") {
      customToastMsg("Service description cannot be empty");
    } else if (countDescription(serviceDes) > desMaxLimit) {
      customToastMsg("Service description limit exceed", 2);
    } else if (mainImage.length === 0) {
      customToastMsg("Select service image first", 2);
    } else {
      isValidated = true;
    }

    const data = {
      name: serviceName,
      description: serviceDes,
      files: mainImage?.id,
    };

    if (isValidated) {
      popUploader(dispatch, true);
      updateService(currentData.id, data)
        .then((resp) => {
          onClose();
          clearFields();
          popUploader(dispatch, false);
          customToastMsg("Service updated successfully", 1);
        })
        .catch((err) => {
          popUploader(dispatch, false);
          handleError(err);
        });
    }
  };

  const clearFields = () => {
    setServiceName("");
    setServiceDes("");
    setMainImages([]);
  };

  const getMainIdValues = async (data) => {
    let temp = {};
    data.map((mediaFile, index) => {
      temp = {
        id:
          mediaFile?.customId === undefined && mediaFile.originFileObj
            ? mediaFile?.response?.data?.id
            : mediaFile?.customId,
        isDefault: true,
      };
    });
    await setMainImages(temp);
    await setIsUploading(true);
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
        Update Service
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col sm="12">
            <Form className="mt-2">
              <Row>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="serviceName">Service Name</Label>
                    <Input
                      type="text"
                      name="serviceName"
                      id="serviceName"
                      placeholder="Eg: Fast Delivery"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <div>
                  <div className="d-flex justify-content-between">
                    {" "}
                    <Label>Service Description</Label>
                    {countDescription(serviceDes) > desMaxLimit ? (
                      <span class="text-count  text-danger">
                        {countDescription(serviceDes)} of {desMaxLimit}{" "}
                        Characters
                      </span>
                    ) : (
                      <span class="text-count text-muted">
                        {countDescription(serviceDes)} of {desMaxLimit}{" "}
                        Characters
                      </span>
                    )}
                  </div>
                  <CKEditor
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setServiceDes(data);
                    }}
                    config={{
                      toolbar: {
                        items: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "|",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "alignment",
                          "|",
                          "indent",
                          "outdent",
                          "|",
                          "fontColor",
                          "fontSize",
                          "fontBackgroundColor",
                          "|",
                          "undo",
                          "redo",
                          "|",
                          "cut",
                          "copy",
                          "paste",
                          "|",
                          "removeFormat",
                          "|",
                          "blockQuote",
                          "horizontalLine",
                          "|",
                          "code",
                          "|",
                          "specialCharacters",
                          "|",
                        ],
                      },
                    }}
                    editor={ClassicEditor}
                    data={serviceDes}
                    onReady={(editor) => {}}
                  />
                </div>
              </FormGroup>

              <Row>
                <Col sm={12} md={12} lg={6}>
                  <Row>
                    <h5 className="fs-15 mb-1"> Update Service Images</h5>
                    <p className="text-muted">
                      Update service image.{" "}
                      <small className="text-primary">
                        <b>(Add a PNG image for best view in customer page)</b>{" "}
                      </small>
                    </p>

                    <CustomImageUploader
                      getIds={(data, ids) => getMainIdValues(data, ids)}
                      isMainImage={true}
                      initialData={currentMain}
                    />
                    {mainImagesLoader && (
                      <Alert message="Uploading..." type="info" />
                    )}
                    {!mainImagesLoader && showImageError && (
                      <Alert
                        message="Change Images and Try Again"
                        type="error"
                      />
                    )}
                  </Row>
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
          Cancel
        </Button>{" "}
        <Button color="primary" onClick={handleUpdateService}>
          Update Service
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateServiceModal;
