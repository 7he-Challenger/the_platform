import React, { useEffect } from "react";
import type { NextPage } from 'next'

import { AdminLayout } from "~layout";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { getOneUser, updateOneUser } from "~repositories/user";
import { getSession, GetSessionParams } from "next-auth/react";
import { User } from "~models/user";
import { useFormData } from "~logics/useFormData";

const Profile : NextPage = (props : any) => {
  const { user } = props
  
  const {formData,getTextFieldProps} = useFormData<User>({
    formData: user
  })
  
  const handleUpdate = async () => {
    const session:any = await getSession();
    updateOneUser(session.accessToken,session?.user?.id,formData)
  }

  return (
    <AdminLayout>
      <div className="flex-column" style={{ rowGap: "50px" }}>
        <div className="full-height flex-space-between" >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              columnGap: "15px",
              flex:1
            }}
          >
            <Image
              src="http://xsgames.co/randomusers/avatar.php?g=male"
              className="picture-profile"
              roundedCircle
              fluid
            />
            <div
              className="flex-center"
              style={{ flexDirection: "column", height: "100%", alignItems:"flex-start", gap:"30px" }}
            >
              <div>
                <h3>{user?.firstname || "Jean"} {user?.lastname || "Christophe"}</h3>
                <span>
                  <FontAwesomeIcon icon={faUserGroup} /> Membre
                </span>
              </div>
              <p>
                Est irure enim enim incididunt dolor non laboris do ea eu enim
                et laboris nostrud.
              </p>
            </div>
          </div>

          <div style={{flex:1, display:"flex", justifyContent:"flex-end"}}>
            <Button variant="primary" style={{height:"40px"}} onClick={()=>handleUpdate()}>
              <FontAwesomeIcon icon={faFloppyDisk} className="mr-1"/> Enregistrer les modifications
            </Button>
          </div>
        </div>
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>Informations de connexion</Accordion.Header>
            <Accordion.Body>
              <Form style={{display:"flex", columnGap:"50px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Informations personnelles</Accordion.Header>
            <Accordion.Body>
                <Form style={{display:"flex", columnGap:"50px"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control type="text" placeholder="Nom" {...getTextFieldProps("lastname")}/> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control type="text" placeholder="Prénom" {...getTextFieldProps("firstname")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Pseudo</Form.Label>
                      <Form.Control type="text" placeholder="Prénom" {...getTextFieldProps("username")}/>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Adresse</Form.Label>
                      <Form.Control type="text" placeholder="Adresse" {...getTextFieldProps("userInfo.address")}/> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" placeholder="Phone" {...getTextFieldProps("userInfo.phone")}/>
                    </Form.Group>
                </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </AdminLayout>
  );
};
export const getServerSideProps = async (context: any) => {
  const session:any = await getSession(context);
  try {
  const data: User  = await getOneUser(session.accessToken, session?.user?.id);
    return {
      props: {
        user: data || {},
      }
    }
  }catch(e){
    console.log(e)
    return {
      props: {
        user: {},
      },
    };
  }
  
};


export default Profile;
