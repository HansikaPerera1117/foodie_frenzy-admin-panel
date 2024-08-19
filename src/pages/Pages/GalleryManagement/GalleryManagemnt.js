import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";
import { Plus } from "react-feather";
import {
  customSweetAlert,
  customToastMsg,
  handleError,
  popUploader,
} from "../../../common/commonFunctions";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { getAllGalleryImages } from "../../../service/galleryService";
import defaultCategoryImg from "../../../assets/images/default-category-img.png";
import Viewer from "react-viewer";

const GalleryManagement = () => {
  document.title = "Gallery | Restaurant";

  const [galleryList, setGalleryList] = useState([]);
  const [visible, setVisible] = useState(false);

  //-------------------------- pagination --------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecodes, setTotalRecodes] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    loadAllGallery(currentPage);
  }, []);

  const loadAllGallery = (currentPage) => {
    let temp = [];
    popUploader(dispatch, true);
    getAllGalleryImages(currentPage)
      .then((resp) => {
        resp?.data?.records.map((gallery, index) => {
          temp.push({
            src: (
              <div
                className="object-fit-cover d-flex justify-content-center"
                key={index}
              >
                {gallery?.files && gallery.files.length > 0 ? (
                  gallery.files.map((img, index) => {
                    if (img?.isDefault) {
                      return (
                        <img
                          key={index}
                          src={img?.imageSizes?.original}
                          alt="logo"
                          className="object-fit-cover"
                          width="100%"
                          height="auto"
                          onError={(e) => (e.target.src = defaultCategoryImg)}
                        />
                      );
                    }
                  })
                ) : (
                  <img
                    src={defaultCategoryImg}
                    alt="placeholder"
                    className="object-fit-cover"
                    width="70%"
                    height="auto"
                  />
                )}
              </div>
            ),

            action: (
              <>
                {/* {checkPermission(DELETE_CATEGORY) && ( */}
                <Button
                  color="danger"
                  className="m-2"
                  outline
                  onClick={(e) => {
                    deleteGalleryImage(category?.id);
                  }}
                >
                  <span>Remove</span>
                </Button>
                {/* )} */}
              </>
            ),
          });
        });
        setGalleryList(temp);
        setCurrentPage(resp?.data?.currentPage);
        setTotalRecodes(resp?.data?.totalRecords);
        popUploader(dispatch, false);
      })
      .catch((err) => {
        popUploader(dispatch, false);
        handleError(err);
      });
  };

  const deleteGalleryImage = (cateId) => {
    customSweetAlert("Are you sure to delete this image?", 0, () => {
      popUploader(dispatch, true);
      deleteGalleryImage(cateId)
        .then(() => {
          popUploader(dispatch, false);
          customToastMsg("Gallery image deleted successfully", 1);
          loadAllGallery(currentPage);
        })
        .catch((err) => {
          popUploader(dispatch, false);
          handleError(err);
        })
        .finally();
    });
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const onChangePagination = (page) => {
    setCurrentPage(page);
    loadAllGallery(page);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <h4 className="mt-3">Gallery Management</h4>

          <Card>
            <Row className="d-flex my-4 mx-1 justify-content-end">
              {/* {checkPermission(CREATE_CATEGORY) && ( */}
              <Col sm={12} md={3} lg={3} xl={3}>
                <Button color="primary" className="w-100">
                  <Plus size={24} /> Add New Gallery Image
                </Button>
              </Col>
              {/* )} */}
            </Row>

            <Row>
              {galleryList.map((image) => {
                <Col sm={3} md={3} lg={3} xl={3}>
                  <button
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    show
                  </button>
                  <Viewer
                    visible={visible}
                    onClose={() => {
                      setVisible(false);
                    }}
                    images={[{ src: { image }, alt: "gallery image" }]}
                  />
                </Col>;
              })}
            </Row>

            <Row>
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
                  showTotal={(total) => `Total ${total} items`}
                />
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default GalleryManagement;
