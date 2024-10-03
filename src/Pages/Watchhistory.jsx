import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { deleteHistoryAPI, getHistoryAPI } from '../../service/allAPI';

function Watchhistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);
 
  const getHistory = async()=>{
    const result = await getHistoryAPI()
    console.log(result);
    if(result.status==200){
      setHistory(result.data)
    }else{
      console.log('api failed');
      console.log(result.message);
      
      
    }
    
  }
  // console.log(history);
  const removeHistory = async(id)=>{
    await deleteHistoryAPI(id)
    getHistory()

  }
  
  


  return (
    <div className="history-section">
         <div className="d-flex justify-content-end">
          <Link 
            to={'../home'} 
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '30px'
            }}
          >
            Back to Home <i className="fa-solid fa-arrow-right"></i>
          </Link>
    </div>

      <h3 className="history-title">Watch History</h3>
            <Table striped bordered hover className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Video URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           { 
             history?.length>0?history.map((video,index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{video.title}</td>
              <td>{video.timeStamp}</td>
              <td>
                <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </td>
              <td>
                <Button onClick={()=>removeHistory(video?.id)} variant="danger" >
                  Delete
                </Button>
              </td>
            </tr>
             )):<p>Nothing to show</p>
           }
        </tbody>
      </Table>

      <style jsx>{`
        .history-section {
          padding: 20px;
          background-color: black;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }

        .history-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .history-table {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .history-table th,
        .history-table td {
          text-align: center;
          vertical-align: middle;
        }

        .history-table a {
          color: #007bff;
          text-decoration: none;
        }

        .history-table a:hover {
          color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default Watchhistory;
