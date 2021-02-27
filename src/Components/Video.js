import React, {Component} from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {
Card, Button, Col, Spinner, Alert,
Row, Badge, Image } from 'react-bootstrap';

class Video extends Component {
  state = {
    video:null,
    loaded:false
  }
  componentWillMount() {
    axios.get(`http://localhost:3000/api/${this.props.match.params.yid}`).then((res) =>{
      this.setState({
        video: res.data.data,
        loaded: true
      });
    });
  }

  render() {
    let video = this.state.video;
    let vidCont;
    if(video != null){ //video loaded
      vidCont = (
        <Card>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
              <Card.Img top thumbnail src={video.thumbnails.high.url} alt={video.title} />
              <div className="box">
                <span className="mr-1">{video.likes} </span> <Badge color="secondary" className="mr-2"><AiFillLike /></Badge>
                <span className="mr-1">{video.dislikes} </span> <Badge color="secondary"><AiFillDislike /></Badge>
              </div>
              </Col>
              <Col xs={6} md={8}>
                <Link to={`/${video.yid}`}>
                  <Card.Title tag="h5">{video.title}</Card.Title>
                </Link>
                <Card.Subtitle tag="h6" className="mb-2 text-muted">{video.views} views</Card.Subtitle>
                <Card.Subtitle tag="h6" className="mb-2 text-muted">
                  <Row className="box">
                    <Col xs={1} md={1}><Image roundedCircle fluid src={video.channel_thumb.default.url} alt={video.channelTitle} /></Col>
                    <Col xs={11} md={11}>{video.channelTitle}</Col>
                  </Row>
                </Card.Subtitle>
                <Card.Text>{video.description.substr(0, 200) + '...'}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card> );
    } else if(this.state.loaded) { //not found
      vidCont = (
        <Col md={12}>
          <Alert variant="warning">No Video found</Alert>
        </Col>
      );
    } else { //loading
        vidCont = (
          <Col md={12}>
            <Spinner animation="grow" />
          </Col>
        );
    }
    return (
      <div className="App container">
        <Row className="mt-4 mb-4" >
          <h3>Go to home page.. </h3>
          <Link to={'/'}>
            <Button className="ml-4" color="primary" >Home</Button>
          </Link>
        </Row>
        <Row>
          {vidCont}
        </Row>
      </div>
    );
  }
}

export default Video;
