import { Button, Col, Row, Form } from "react-bootstrap";
import { ACTIVITY_TYPES } from "~constantes/datas";
import { useFormActivity } from "~hooks/useEmploiDuTemps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Style from '~assets/styles/Activity.module.css';
import Image from "next/image";
import ENDPOINT from "~constantes/enpoint";

type CreateEmploiDuTempsType = {
  toUpdate?: any,
  submitActivity: Function
}

const CreateEmploiDuTemps = ({
  toUpdate = null,
  submitActivity = () => {}
}: CreateEmploiDuTempsType) => {
  const {
    body,
    handleAddSponsor,
    handleRemoveSponsor,
    handleChangeValueForm,
    handleDateChange,
    pickerRef,
    handleFilePicker,
    posters,
    deleteImage
  } = useFormActivity(toUpdate)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    submitActivity(
      {
        body,
        posters
      }, 
      body.id
    )
  }

  const uploadFile = () => {
    if(pickerRef) pickerRef.current.click()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTheme">
        <Form.Label>Title *</Form.Label>
        <Form.Control 
          type="text" 
          value={body.title}
          onChange={(e) => handleChangeValueForm('title', e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea"
          value={body.description} 
          onChange={(e) => handleChangeValueForm('description', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIntervenant">
        <Form.Label>Intervenant(e)</Form.Label>
        <Form.Control 
          type="text" 
          value={body.intervenant}
          onChange={(e) => handleChangeValueForm('intervenant', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLieu">
        <Form.Label>Locale</Form.Label>
        <Form.Control 
          type="text" 
          value={body.locale}
          onChange={(e) => handleChangeValueForm('locale', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLieu">
        <Form.Label>Sponsors</Form.Label>
        {
          body.sponsors.map((sponsor: any, index: any) => (
            <Row
              key={`activity-sponsor-${index}`}
            >
              <Col 
                lg={body.sponsors.length > 1 ? 11 : 12}
                className={Style.marginBottom5}
              >
                <Form.Control 
                  type="text" 
                  value={sponsor}
                  onChange={(e) => handleChangeValueForm('sponsors', e.target.value, index)}
                />
              </Col>
              {
                body.sponsors.length > 1 && (
                  <Col 
                    lg={1}
                  >
                    <Button 
                      title="Supprimer sponsor"
                      variant="danger"
                      onClick={() => handleRemoveSponsor(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                  </Col>
                )
              }
            </Row>
          ))
        }
        <div className={Style.btnAddSponsorContainer}>
          <Button 
            title="Ajouter un nouveau sponsor"
            onClick={handleAddSponsor}
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Select 
          aria-label="Select type"
          value={body.type}
          onChange={(e) => handleChangeValueForm('type', parseInt(e.target.value))}
        >
          {
            ACTIVITY_TYPES.map((activityType, index) => (
              <option key={`activity-type-${index}`} value={activityType.value}>
                {activityType.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date de début</Form.Label>
        <Row>
          <Col>
            <Form.Control 
              type="date"
              value={body.startDate.split(' ')[0] || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value, 'date')}
            />
          </Col>
          <Col>
            <Form.Control 
              type="time"
              value={body.startDate.split(' ')[1] || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value, 'time')}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date de fin</Form.Label>
        <Row>
          <Col>
            <Form.Control 
              type="date"
              value={body.endDate.split(' ')[0] || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value, 'date')}
            />
          </Col>
          <Col>
            <Form.Control 
              type="time"
              value={body.endDate.split(' ')[1] || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value, 'time')}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIsPublic">
        <Form.Label>Posters</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFilePicker}
          className="d-none"
          ref={pickerRef}
        />

        <div className="row">
          {
            posters.map((image: any, index: number) => (
              <div className={Style.imagePickerContainer} key={`image-picked-${index}`}>
                <div className={Style.imagePicker}>
                  <Image
                    src={image.src || `${ENDPOINT.MEDIA_PATH}${image.contentUrl}`}
                    layout='fill'
                    objectFit='contain'
                  />

                  <FontAwesomeIcon 
                    title="Supprimer image"
                    icon={faTrash} 
                    color="black"
                    className={Style.imagePickerDeleteItem}
                    size="lg"
                    onClick={() => deleteImage(index)}
                  />
                </div>
              </div>
            ))
          }
          
          <div 
            className={Style.imagePickerContainer} 
            title="Ajouter image"
            onClick={uploadFile}
            style={{ cursor: 'pointer' }}
          >
            <div className={Style.imagePicker}>
              <FontAwesomeIcon 
                title="Upload image"
                icon={faPlus} 
                color="black"
                className={Style.imagePickerIcon}
              />
            </div>
          </div>
        </div>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CreateEmploiDuTemps;