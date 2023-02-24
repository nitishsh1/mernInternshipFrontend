import React, { useEffect, useState } from 'react'
import './Profile.css'
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import {MdEmail,MdLocationPin} from "react-icons/md"
import {GoDeviceMobile,GoPerson,GoCalendar} from "react-icons/go"
import { useParams } from 'react-router-dom';
import Spiner from '../../components/Spinner/Spiner';
import { BASE_URL } from '../../services/helper';
import moment from 'moment'
import { singleuserget } from '../../services/Apis';

const Profile = () => {
  const [showspin, setShowSpin] = useState(true);
  const [userProfile ,setUserProfile] = useState({})

  const id = useParams()

  const userProfileGet = async () => {
    const response = await singleuserget(id)
    if(response.status === 200) {
      setUserProfile(response.data)
    }
  }

  useEffect(() => {
    userProfileGet()
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

  return (
    <>
    {
      showspin ? <Spiner/>:<div className="container">
        <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userProfile.profile}`} alt="user profile" />
                </div>
              </div>
            </Row>
            <div className="text-center">
            <h3>{userProfile.fname+userProfile.lname}</h3>
            <h4><MdEmail className='email'/>&nbsp;:- <span>{userProfile.email}</span> </h4>
            <h5><GoDeviceMobile/>&nbsp;:- <span>{userProfile.mobile}</span> </h5>
            <h4><GoPerson/>&nbsp;:- <span>{userProfile.gender}</span> </h4>
            <h4><MdLocationPin className='location'/>&nbsp;:- <span>{userProfile.location}</span> </h4>
            <h4>Status&nbsp;:- <span>{userProfile.status}</span> </h4>
            <h5><GoCalendar className='calendar'/> Date Created &nbsp;:- <span>{moment(userProfile.createdAt).format("DD-MM-YYYY")}</span> </h5>
            <h5><GoCalendar className='calendar'/> Date Updated &nbsp;:- <span>{moment(userProfile.updatedAt).format("DD-MM-YYYY")}</span> </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    }
      
    </>
  )
}

export default Profile