import React from "react";
// import ExpenseContext from "../../store/expense-context";
import {useSelector} from 'react-redux';
import classes from './SavedProfile.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const SavedProfile = (prop) => {

  // const expctx = useContext(ExpenseContext);
  const fullName = useSelector(state=>state.auth.fullName);
  const profilePhoto = useSelector(state=>state.auth.profilePhoto);

  return (
    <Container fluid>
      <Row>
        <Col lg={6} md={7} sm={9} xs={10}  style={{margin:'auto'}}>
        <Card className="mt-3">
        <Card.Header style={{textAlign:'center'}}><h3>Your profile</h3></Card.Header>
        <Card.Body>
       <main className={classes.main} >
         <div className={classes.main_div}>
             <p className={classes.main_span}>Your Name </p>
           <span className={classes.main_name}>{fullName}</span>
         </div>
         <div className={classes.photo_div}>
             <span>Your Profile photo</span>
           <img src={profilePhoto} alt="UserPhoto"></img>
         </div>
         <Button variant = "danger" className="mb-3" size="sm" onClick={prop.editButton} >EDIT</Button>
       </main>
       </Card.Body>
       </Card>
        </Col>
      </Row>
      </Container>
    // <React.Fragment>
    //   <h1 className={classes.title}>Your Profile</h1>
    //   <main className={classes.main} >
    //     <div className={classes.main_div}>
    //         <span className={classes.main_span}>Your Name : </span>
    //       <span className={classes.main_name}>{fullName}</span>
    //     </div>
    //     <div className={classes.photo_div}>
    //         <span>Your Profile photo</span>
    //       <img src={profilePhoto} alt="UserPhoto"></img>
    //     </div>
    //     <button onClick={prop.editButton}  className={classes.edit_button}>EDIT</button>
    //   </main>
    // </React.Fragment>
  );
};

export default SavedProfile;