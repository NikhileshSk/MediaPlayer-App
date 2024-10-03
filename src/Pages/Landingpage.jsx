import React from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigateByUrl =useNavigate()
  return (
    <>
      {/* Main Section */}
      <Row className='ps-4 mt-5 align-items-center justify-content-between w-100' style={{ color: '#fff', backgroundColor: '#000' }}>
        <Col xs={12} md={6} lg={5}>
          <h1 style={{ fontSize: '40px', color: '#fff' }}> Welcome to <span className='text-warning'>Media Player</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ipsum culpa, earum veritatis reiciendis in quasi quisquam ea debitis quod ipsam, ipsa sequi temporibus porro magni commodi? Quaerat, error magni!</p>
          <button className='btn btn-light mt-4' onClick={()=>navigateByUrl('./home')}>Get Started</button>
        </Col>

        <Col xs={12} md={6} lg={5}>
          <img 
            className='img-fluid' 
            src="https://media.tenor.com/11u8gg1tMs4AAAAM/music-rock.gif" 
            width={'300px'}
            alt="Media Player" 
          />
        </Col>
      </Row>

      {/* Features Section */}
      <Container className="mb-5 mt-5 d-flex align-items-center justify-content-center flex-column" style={{ color: '#fff', backgroundColor: '#000' }}>
        <h3>Features</h3>
        <Row className="mb-5 mt-5 w-100 d-flex justify-content-around">
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '22rem', backgroundColor: '#333' }} className="p-4">
              <Card.Img variant="top" height="300px" src="https://i.pinimg.com/originals/e4/63/4d/e4634da841c0ed906e77cab9b6b733ef.gif" />
              <Card.Body>
                <Card.Title className="text-white">Managing Videos</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '22rem', backgroundColor: '#333' }} className="p-4">
              <Card.Img variant="top" height="300px" src="https://cdn.dribbble.com/users/1366755/screenshots/6493370/player.gif" />
              <Card.Body>
                <Card.Title className="text-white">Categorized Video</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '22rem', backgroundColor: '#333' }} className="p-4">
              <Card.Img variant="top" height="300px" src="https://i.pinimg.com/originals/9d/9f/d1/9d9fd1e40f9ddcac105b3c99766db95a.gif" />
              <Card.Body>
                <Card.Title className="text-white">Watch History</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className='conbtainer border rounded p-5 border-light mb-5 d-flex align-items-center justify-content-between w-100'>
        <div className="col-lg-5">
          <h4 className='text-warning'>Simple, Powerful And Fast</h4>
          <h6 className='mb-5 mt-3'><span className='text-warning fw-bolder'>PLAY EVERYTHING</span>: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vel quia nam, tempora expedita earum nobis laboriosam unde dolor, perspiciatis et nihil itaque illum minus explicabo? Veniam modi sunt dolores?</h6>
          <h6 className='mb-5 mt-3'><span className='text-warning fw-bolder'>CATEGORIZE VIDEOS</span>: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vel quia nam, tempora expedita earum nobis laboriosam unde dolor, perspiciatis et nihil itaque illum minus explicabo? Veniam modi sunt dolores?</h6>
          <h6 className='mb-5 mt-3'><span className='text-warning fw-bolder'>MANAGING VIDEOS</span>: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vel quia nam, tempora expedita earum nobis laboriosam unde dolor, perspiciatis et nihil itaque illum minus explicabo? Veniam modi sunt dolores?</h6>
        </div>
        <div className="video col-lg-5 col-md-8 col-xs-12 }">
        <iframe width="520" height="315" src="https://www.youtube.com/embed/e1BHIY9p2WU?si=wjIybXveUAYHqQsB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
