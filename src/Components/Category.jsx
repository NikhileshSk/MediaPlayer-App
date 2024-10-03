import React, { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { addCategoryAPI, deleteCategoryAPI, getCategoryAPI, getSingleVideoAPI, updateCategoryAPI } from '../../service/allAPI';
import VideoCard from './VideoCard'; // Import the VideoCard component for displaying videos

function Category({dropVideoResponse}) {
  // State to manage the new category input field
  const [categoryName, setCategoryName] = useState(''); 

  // State to store the list of categories fetched from the API
  const [allCategories, setAllCategories] = useState([]); 

  // State to handle modal visibility (for adding a new category)
  const [show, setShow] = useState(false); 

  // Function to open the modal
  const handleShow = () => setShow(true);

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to handle the addition of a new category
  const handleAdd = async () => {
    // Check if the category name input is not empty
    if (categoryName) {
      // Call the API to add a new category
      const result = await addCategoryAPI({ categoryName, allVideos: [] });
      
      // Check if the API response is successful
      if (result.status >= 200 && result.status < 300) {
        // Close the modal and reset the category name input field
        handleClose();
        setCategoryName('');
        // Fetch the updated list of categories
        getCategories(); 
      } else {
        alert(result.message); // Show an error message if adding fails
      }
    } else {
      alert('Please add a category name'); // Show an alert if the input is empty
    }
  };

  // Function to fetch all categories from the API
  const getCategories = async () => {
    const { data } = await getCategoryAPI(); // Fetch categories from API
    setAllCategories(data); // Store the fetched categories in the state
  };

  // Use the useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, [dropVideoResponse]);

  // Function to handle category deletion
  const removeCategory = async (id) => {
    await deleteCategoryAPI(id); // Call the API to delete the category
    getCategories(); // Refresh the list of categories after deletion
  };

  // Function to handle drag over event on a category
  const dragOver = (e) => {
    console.log('Video card dragging over the category');
    e.preventDefault(); // Prevent default behavior to allow dropping
  };

  // Function to handle the drop event when a video is dropped into a category
  const videoDropped = async (e, categoryId) => {
    const VideoId = e.dataTransfer.getData('VideoId'); // Get the video ID from the dragged data
    console.log('Video ID: ' + VideoId + ', Category ID: ' + categoryId);
    
    // Fetch the video data using its ID
    const { data: videoData } = await getSingleVideoAPI(VideoId);


    // Update the categories with the dropped video added to the relevant category
    const updatedCategories = allCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          allVideos: [...category.allVideos, videoData], // Add the dropped video to the category
        };
      }
      return category;
    });

    setAllCategories(updatedCategories); // Update the state with modified categories
    await updateCategoryAPI(categoryId, updatedCategories.find(c => c.id === categoryId)); // Update the category in the API
  };

      // Function to handle the start of dragging the video card
      const videoDragStarted = (e, VideoId, categoryId) => {
        let datashare = { VideoId, categoryId };
        e.dataTransfer.setData('data', JSON.stringify(datashare)); // Store the video and category data in drag event
      };
  
  return (
    <div>
      {/* Button to trigger modal for adding a new category */}
      <div className="d-grid">
        <button className="btn btn-info" onClick={handleShow}>
          Add Category
        </button>
      </div>

      {/* List all categories dynamically */}
      <div className="mt-5">
        {allCategories?.length > 0 ? (
          allCategories.map((category, index) => (
            <div 
              key={category.id || index} 
              className="category-container border rounded mb-3 p-3 d-flex flex-column" 
              droppable="true" 
              onDragOver={(e) => dragOver(e)} 
              onDrop={e => videoDropped(e, category.id)}
            >
              {/* Display category name */}
              <h5>{category.categoryName}</h5>
              <div className="videos-container mt-3">
                {/* Display videos within the category if any exist */}
                {category?.allVideos?.length > 0 ? (
                  <Row>
                    {category.allVideos.map((video) => (
                      <Col sm={12} draggable onDragStart={e => videoDragStarted(e, video.id, category.id)}>
                        {/* Use the VideoCard component to display video data */}
                        <VideoCard video={video} insideCategory={true} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No videos in this category.</p> // Message when there are no videos
                )}
              </div>
              {/* Button to delete a category */}
              <button onClick={() => removeCategory(category.id)} className="btn mt-3">
                <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </div>
          ))
        ) : (
          <p>No categories found.</p> // Message when no categories are present
        )}
      </div>

      {/* Modal for adding a new category */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form to input a new category name */}
          <Form>
            <FloatingLabel controlId="floatingTitle" label="Category" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)} // Update state when input changes
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to cancel and close the modal */}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* Button to add the new category */}
          <Button onClick={handleAdd} variant="primary">
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Inline CSS to style video cards inside the category */}
      <style>
        {`
          .category-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .videos-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 10px;
          }

          .videos-container .col-sm-12 {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}

export default Category;
