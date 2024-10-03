import React, { useState } from 'react';
import Add from '../Components/Add';
import View from '../Components/View';
import Category from '../Components/Category';
import { Link } from 'react-router-dom';

function Home() {
  const [uploadVideoResponse, setUploadVideoResponse] = useState(null);
  const [dropVideoResponse,setDropVideoResponse] = useState({})

  return (
    <>  
      <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
        <div className="add-videos">
          <Add setUploadVideoResponse={setUploadVideoResponse} />
        </div>
        <Link to={'./watch-history'} className="ml-auto watch-history-link">
          Watch-History <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="container-fluid w-100 mt-5 mb-5 row">
        <div className="all-videos col-lg-9">
          <h1>All Videos</h1>
          <View uploadVideoResponse={uploadVideoResponse} setDropVideoResponse={setDropVideoResponse} />
        </div>
        <div className="all-videos col-lg-3">
          <Category dropVideoResponse={dropVideoResponse} />
        </div>
      </div>

      <style jsx>{`
        .watch-history-link {
          text-decoration: none;
          color: white;
          font-size: 30px;
          font-weight: bold;
          transition: color 0.3s;
        }
        .watch-history-link:hover {
          color: #00aaff;
        }
      `}</style>
    </>
  );
}

export default Home;
