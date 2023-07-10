import React, { useEffect, useState, createRef } from 'react';
import axios from 'axios';

//video player
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

//custom css
import './react-video-gallery.css';

// var express = require('express')
// var cors = require('cors')
// var app = express()
// app.use(cors)



const ReactVideoGallery = ( ) => {
    const[model, setModel] = useState(false);
    
    let data  = [
        {
            id: 1,
            thumbnail: "images/BigBuckBunny.jpg",
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            id: 2,
            thumbnail: "images/ElephantsDream.jpg",
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        },
        {
            id: 2,
            thumbnail: "images/ForBiggerBlazes.jpg",
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        }
    ]
    const [jsonData, setJsonData] = useState([]);
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
          const response = await axios.get('http://localhost:8000/api/videos/', {mode:'cors'});
          console.log(response.data)
          setJsonData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <>
           <h1 style={{textAlign: 'center'}}>Video Gallery</h1>
           <div className="gallery">
                {jsonData.map((item, index)=>{
                    let divRef = createRef(null);
                    const openModel = () =>{
                        divRef.current.classList.remove('video');
                        divRef.current.classList.add('model');
                        setModel(true);
                    }
                    const closeModel = () =>{
                        divRef.current.classList.add('video');
                        divRef.current.classList.remove('model');
                        setModel(false);
                    }
                    return(
                        <div  ref={divRef} className="video" key={index}> 
                            {model && <button className="model-close-btn" onClick={()=>closeModel()}>X</button>}
                            <div className="video-container" onClick={()=>openModel()}>
                                <Video
                                     style={{width: '100%'}}  
                                     autoPlay={model} 
                                     controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                     poster={item.thumbnail} 
                                >
                                    <source src={item.videoUrl} type="video/webm"/>
                                </Video>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    );
};



export default ReactVideoGallery;

