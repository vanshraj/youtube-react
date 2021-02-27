import React, {Component} from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {
Card, Button, Col, Spinner, Alert,
Row, Badge, Image } from 'react-bootstrap';

class Home extends Component {
  state = {
    videos:[],
    loaded:false
  }
  componentDidMount(){
    this.getVideos();
  }

  getVideos(){
    axios.get('http://localhost:3000/api').then((res) =>{
      console.log(res.data.data);
      this.setState({
        videos: res.data.data,
        loaded: true
      });
    });
  }

  fetchTrending(){
      this.setState({
        loaded: false
      });
      axios.get('http://localhost:3000/api/add').then((res) =>{
        console.log(res.data.updated);
        this.getVideos();
      });
  }

  deleteAll(){
      this.setState({
        loaded: false
      });
      axios.delete('http://localhost:3000/api').then((res) =>{
        console.log(res.data.result);
        this.getVideos();
      });
  }

  render() {
    let videosContainer;
    let spinnerCont;
    if(!this.state.loaded) {//loading
      spinnerCont = (
         <Spinner className="ml-4" animation="border" variant="success" />
      );
    }
   if(this.state.videos.length === 0) { //not found
     videosContainer = (
       <Col md={12}>
         <Alert variant="warning">No Videos stored, click fetch button.</Alert>
       </Col>
     );
    } else {
      videosContainer = this.state.videos.map((video) => {
        return(
          <Card key={video.yid}>
            <Card.Body>
              <Row>
                <Col xs={12} md={4}>
                <Card.Img src={video.thumbnails.high.url} alt={video.title} />
                <div className="box">
                  <span className="mr-1">{video.likes} </span> <Badge color="secondary" className="mr-2"><AiFillLike /></Badge>
                  <span className="mr-1">{video.dislikes} </span> <Badge color="secondary"><AiFillDislike /></Badge>
                </div>
                </Col>
                <Col xs={12} md={8}>
                  <Link to={`/${video.yid}`}>
                    <Card.Title tag="h5">{video.title}</Card.Title>
                  </Link>
                  <Card.Subtitle tag="h6" className="mb-2 text-muted">{video.views} views</Card.Subtitle>
                  <Card.Subtitle tag="h6" className="mb-2 text-muted">
                    <Row className="box">
                      <Col xs={2} md={1}><Image roundedCircle fluid src={video.channel_thumb.default.url} alt={video.channelTitle} /></Col>
                      <Col xs={10} md={11}>{video.channelTitle}</Col>
                    </Row>
                  </Card.Subtitle>
                  <Card.Text>{video.description.substr(0, 200) + '...'}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }

    return (
      <div className="App container">
        <Row className="mt-4 mb-4" >
          <Button className="ml-4" variant="primary" onClick={this.fetchTrending.bind(this)}>Get trending videos</Button>
          <Button className="ml-4" variant="danger" onClick={this.deleteAll.bind(this)}>Delete all videos</Button>
          {spinnerCont}
        </Row>
        <Row>
          {videosContainer}
        </Row>
      </div>
    );
  }
}

export default Home;
