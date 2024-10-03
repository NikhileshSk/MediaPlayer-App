import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { uploadVideoAPI } from '../../service/allAPI';

function Add({ setUploadVideoResponse }) {
  // State to hold the video details (id, title, imgUrl, videoLink)
  const [uploadVideo, setUploadVideo] = useState({
    id: '', title: '', imgUrl: '', videoLink: ''
  });

  // State to control the visibility of the Modal
  const [show, setShow] = useState(false);

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to open the modal
  const handleShow = () => setShow(true);

  // Function to extract the YouTube video link from the input and format it into an embeddable link
  const getYoutubeLink = (e) => {
    const { value } = e.target; // Get the input value from the event
    if (value.includes("v=")) { // Check if the input contains a YouTube video ID (after "v=")
      let vID = value.split("v=")[1].slice(0, 11); // Extract the video ID from the URL
      setUploadVideo({ ...uploadVideo, videoLink: `https://www.youtube.com/embed/${vID}` }); // Set the formatted video link
    } else {
      setUploadVideo({ ...uploadVideo, videoLink: "" }); // If invalid, set the video link to an empty string
    }
  }

  // Function to handle adding the video when the 'Upload' button is clicked
  const handleAdd = async () => {
    const { id, title, imgUrl, videoLink } = uploadVideo;

    // Validate that all fields are filled
    if (!id || !title || !imgUrl || !videoLink) {
      alert('Please Fill The Missing Details'); // Alert if any detail is missing
    } else {
      // Call the API to upload the video details
      const result = await uploadVideoAPI(uploadVideo);

      // Check if the response status indicates success
      if (result.status >= 200 && result.status <= 300) {
        handleClose(); // Close the modal on success
        alert('Video added successfully'); // Alert success message
        setUploadVideo({ id: "", title: "", imgUrl: "", videoLink: "" }); // Reset the input fields
        setUploadVideoResponse(result.data); // Update the parent component with the response data
      } else {
        console.log(result.message); // Log any error message from the API
      }
    }
  }

  return (
    <>
      {/* Section to display the upload title and the 'Upload' button */}
      <div className="d-flex align-items-center justify-content-between upload-section">
        <h5 className="upload-title"
          style={{
            backgroundColor: 'white',
            width: '150px',
            height: '40px',
            textAlign: 'center',
            paddingTop: '10px',
            borderRadius: '10px',
            fontSize: 'bold'
          }}>Upload Videos</h5>
        {/* Button to show the modal for uploading the video */}
        <button onClick={handleShow} className='btn upload-btn'>
          <i className="fa-solid fa-upload upload-icon"></i> {/* Upload icon */}
        </button>
      </div>

      {/* Modal for uploading video details */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="custom-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title">Upload Your Video</Modal.Title> {/* Modal Title */}
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {/* Input field for Video ID */}
          <FloatingLabel controlId="floatingInput" label="Video Id" className="mb-3">
            <Form.Control type="text" placeholder="Video Id" onChange={(e) => setUploadVideo({ ...uploadVideo, id: e.target.value })} />
          </FloatingLabel>

          {/* Input field for Video Title */}
          <FloatingLabel controlId="floatingTitle" label="Video Title" className="mb-3">
            <Form.Control type="text" placeholder="Video Title" onChange={(e) => setUploadVideo({ ...uploadVideo, title: e.target.value })} />
          </FloatingLabel>

          {/* Input field for Image URL */}
          <FloatingLabel controlId="floatingImageUrl" label="Image Url" className="mb-3">
            <Form.Control type="text" placeholder="Image Url" onChange={(e) => setUploadVideo({ ...uploadVideo, imgUrl: e.target.value })} />
          </FloatingLabel>

          {/* Input field for Video URL */}
          <FloatingLabel controlId="floatingVideoUrl" label="Video Url" className="mb-3">
            <Form.Control type="text" placeholder="Video Url" onChange={getYoutubeLink} />
          </FloatingLabel>
        </Modal.Body>

        {/* Modal footer with 'Close' and 'Upload' buttons */}
        <Modal.Footer className="modal-footer-custom">
          {/* Close button to close the modal without any action */}
          <Button variant="secondary" onClick={handleClose} className="close-btn">
            Close
          </Button>
          {/* Upload button to handle video addition */}
          <Button variant="primary" className="upload-btn-primary" onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
