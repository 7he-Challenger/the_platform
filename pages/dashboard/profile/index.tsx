import React, { useMemo, useState } from "react";
import type { NextPage } from 'next';
import { AdminLayout } from "~layout";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faFloppyDisk, faKey, faLock, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { getOneUser, updateOneUser } from "~repositories/user";
import { getSession } from "next-auth/react";
import { User, UserType } from "~models/user";
import { useFormData } from "~logics/useFormData";
import _ from "lodash";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { setToast } from "~store/toast";
import { ROLE_TYPES } from "~constantes/user-roles";
import { USER_TYPES } from "~constantes/user-types";
import { ProfilePictureSection } from "~components/profile/ProfilePictureSection";
import ENDPOINT from "~constantes/enpoint";
import { EditPasswordForm } from "~components/profile/EditPasswordForm";
import { useRouter } from "next/router";

const Profile: NextPage = (props : any) => {
  const { user } = props
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [showPasswordModal , setShowPasswordModal] = useState(false)
  const [temporaryPicture, setTemporaryPicture] = useState<string | null>(null)

  const {formData,getTextFieldProps, changedField, handleInputChange, setFormData} = useFormData<User>({
    formData: user
  })

  const userRoles = useMemo(()=>ROLE_TYPES.find(item => item.value === user?.role),[user])
  const userTypes = useMemo(()=>USER_TYPES.find(item => item.value === user?.userType),[user])

  const dispatch = useAppDispatch();
  const handleUpdate = async () => {
      dispatch(setLoadingTreatment(true));

      try {
          const session: any = await getSession();
          let data = _.pick(formData, changedField || []);
          const result = await updateOneUser(
              session.accessToken,
              session?.user?.id,
              data as UserType
          );
          if (result.status === 200) {
              dispatch(
                  setToast({
                      show: true,
                      message: "Vos modifications ont été prise en compte",
                  })
              );
              setFormData(v => (_.omit(v, "picture")))
              router.replace(router.asPath)
          }
      } catch (error) {
          console.log("Error Occured :", error);
      } finally {
          dispatch(setLoadingTreatment(false));
          setEditMode(false);
      }
  };

  const handlePictureChanges = (b64picture: string, file: File) => {
      setTemporaryPicture(b64picture)
      setEditMode(true)
      handleInputChange("picture", file)
  }

  return (
    <AdminLayout>
      <div className="flex-column" style={{ rowGap: "50px" }}>
        <div className="full-height flex-space-between profile-header-infos" >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              columnGap: "16px",
              flex:1
            }}
          >
            <ProfilePictureSection src={temporaryPicture || (formData?.cover?.contentUrl ? ENDPOINT.MEDIA_PATH+(formData?.cover?.contentUrl||"") : undefined)} onPictureChanges={handlePictureChanges}/>
            
            <div
              className="flex-center"
              style={{ flexDirection: "column", height: "100%", alignItems:"flex-start", gap:"30px" }}
            >
              <div className="user-role-type-pr">
                <h3>{user?.firstname || ""} {user?.lastname || ""}</h3>
                <span>
                  <FontAwesomeIcon icon={userRoles?.icon || faUserGroup} /> {userRoles?.name || ""}
                </span>
                <span style={{marginInline:"8px"}} className="dash-role-type">-</span>
                <span>
                  <FontAwesomeIcon icon={userTypes?.icon || faEllipsis} /> {userTypes?.name || ""}
                </span>
              </div>
            </div>
          </div>

          <div style={{flex:1, display:"flex", justifyContent:"flex-end"}}>
            { editMode ? (
              <Button variant="primary" style={{height:"40px"}} onClick={()=>handleUpdate()}>
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-1"/> Enregistrer les modifications
              </Button> ) 
              : 
              (
                <Button variant="success" style={{height:"40px"}} onClick={()=>setEditMode(true)}>
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-1"/> Modifier mes informations
                </Button>
              )
            }
            
          </div>
        </div>
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>Informations de connexion</Accordion.Header>
            <Accordion.Body>
              <Form style={{display:"flex", columnGap:"50px", flexWrap:"wrap"}}>
                <Form.Group className="mb-3 edit-profile-field" controlId="formBasicEmail">
                  <Form.Label>Nom d&apos;utilisateur ou email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" {...getTextFieldProps("username")} disabled={!editMode}/> 
                </Form.Group>
                <Form.Group className="mb-3 edit-profile-field" style={{flexDirection:"column", display:"flex"}} controlId="formBasicEmail">
                  <Form.Label>Mot de Passe</Form.Label>
                  <Button variant="secondary" className="edit-pwd-btn" style={{height:"37.94px", alignSelf:"center"}} onClick={()=>setShowPasswordModal(true)} >
                    <FontAwesomeIcon icon={faLock} className="mr-1"/> Modifiez mon mot de passe 
                  </Button>
                  {/* <Form.Control type="password" placeholder="Enter password" value={"**********"} disabled={true} style={{cursor:"pointer"}}/> */}
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Informations personnelles</Accordion.Header>
            <Accordion.Body>
                <Form style={{display:"flex", columnGap:"50px", flexWrap:"wrap"}}>
                    <Form.Group className="mb-3 edit-profile-field" controlId="formBasicEmail">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control type="text" placeholder="Nom" {...getTextFieldProps("lastname")} disabled={!editMode}/> 
                    </Form.Group>
                    <Form.Group className="mb-3 edit-profile-field" controlId="formBasicEmail">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control type="text" placeholder="Prénom" {...getTextFieldProps("firstname")} disabled={!editMode}/>
                    </Form.Group>
                </Form>
            </Accordion.Body>
            <Accordion.Body>
                <Form style={{display:"flex", columnGap:"50px", flexWrap:"wrap"}}>
                    <Form.Group className="mb-3 edit-profile-field" controlId="formBasicEmail">
                      <Form.Label>Adresse</Form.Label>
                      <Form.Control type="text" placeholder="Adresse" {...getTextFieldProps("userInfo.address")} disabled={!editMode}/> 
                    </Form.Group>
                    <Form.Group className="mb-3 edit-profile-field" controlId="formBasicEmail">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" placeholder="Phone" {...getTextFieldProps("userInfo.phone")} disabled={!editMode}/>
                    </Form.Group>
                </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Modal 
          show={showPasswordModal} 
          onHide={()=>setShowPasswordModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                Modifier Votre Mot de Passe 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <EditPasswordForm onClose={()=>setShowPasswordModal(false)}/>
          </Modal.Body>
        </Modal>
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
  
}


export default Profile;
