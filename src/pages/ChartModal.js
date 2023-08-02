import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const ChartModal = ({...props})  =>{

    const {show, dialogshow} = props;
   
    const handleClose = () => dialogshow(false);
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {show}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.children
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
  }
  
  export default ChartModal;