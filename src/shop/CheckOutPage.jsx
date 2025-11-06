import { Button, Modal } from "react-bootstrap";

import React, { useState } from "react";

const CheckOutPage = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa");

  //HANDLE TAB CHANGE
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="modelCard">
      {/* REACT CUSTOM COMPONENT<BUTTON></BUTTON> */}
      <Button varient="primary" className="py-2" onClick={ handleShow}>
        Proceed to CheckOut
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment</h5>
          <div className="modal-content">
            <div className="modal-body">
                <div className="tabs-mt-3">
                    <ul className="nav nav-tabs" id="myTab">
                         <li className="nav-item">
                            <a>visa</a>
                         </li>
                    </ul>

                </div>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOutPage;
