import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { addHistoryAPI, deleteSingleVideoAPI } from '../../service/allAPI'

function VideoCard({ video, setDeleteVideoResponse,insideCategory }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  
  const handleShow = async () => {
    setShow(true)
    const { title, videoLink } = video
    
    let today = new Date()
    let timeStamp = new Intl.DateTimeFormat('en-us', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(today)

    let videoHistory = { title, videoLink, timeStamp }
    await addHistoryAPI(videoHistory)
  }

  const removeVideo = async (id) => {
    await deleteSingleVideoAPI(id)
    setDeleteVideoResponse(true)  // Trigger the delete response state in the parent
  }
  const dragStarted = (e,id)=>{
    console.log('Drag started....Video id:'+id);
    e.dataTransfer.setData("videoId",id)
    
  }

  return (
    <div>
      <Card style={{ width: '15rem', height: '23rem', marginTop: '10px' }}onDragStart={e=>dragStarted(e,video?.id)} >
        <Card.Img style={{ height: '15rem' }} variant="top" src={video.imgUrl} onClick={handleShow} />
        <Card.Body>
          <Card.Title>{video.title}</Card.Title>
        {insideCategory?null:  <button onClick={() => removeVideo(video.id)} className='btn'>
            <i className='fa-solid fa-trash text-danger'></i>
          </button>}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{video.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="315"
            src={`${video.videoLink}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default VideoCard
