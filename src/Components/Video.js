import React, {Component} from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {
Card, Button, Col, Spinner, Alert,
Row, Badge, Image } from 'react-bootstrap';
import parse from 'html-react-parser';

class Video extends Component {
  state = {
    video:null,
    loaded:false
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API}api/${this.props.match.params.yid}`).then((res) =>{
      console.log(parse(res.data.data.player));
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
              <Col xs={12} md={8}>
                <Col xs={12} md={12}>
                  <div className="video-container">
                    <iframe src={parse(video.player).props.src+"?&autoplay=1&mute=1"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true"></iframe>
                  </div>
                </Col>
                <Col xs={12} md={12}>
                <div className="box float-left">
                  <span className="mr-1">{video.likes} </span> <Badge color="secondary" className="mr-2"><AiFillLike /></Badge>
                  <span className="mr-1">{video.dislikes} </span> <Badge color="secondary"><AiFillDislike /></Badge>
                </div>
                <div className="box float-right">
                  <span className="mr-1">{video.views} views</span>
                </div>
                </Col>
              </Col>
              <Col xs={12} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title tag="h5">{video.title}</Card.Title>
                  <Card.Subtitle tag="h6" className="mb-2 text-muted">
                    <Row className="box">
                      <Col xs={2} md={2}><Image roundedCircle fluid src={video.channel_thumb.default.url} alt={video.channelTitle} /></Col>
                      <Col xs={10} md={10}>{video.channelTitle}<br/>{video.subs} subs</Col>
                    </Row>
                  </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card>
              <Card.Body>
                  <Row >
                  <Col xs={12} md={12} >
                    <Card.Title tag="h5">Description</Card.Title>
                    <Card.Text className="text-justify">{video.description}</Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
            </Card>
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
      <div className="container">
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
