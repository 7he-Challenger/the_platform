import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useMemo } from "react";
import { Form, FormControlProps, InputGroup } from "react-bootstrap";

export const PasswordField = (props: Props) => {
  const [show, setShow] = React.useState(false);
  const hasError = useMemo(()=> !_.isEmpty(props?.inputProps?.errorMessage?.trim()), [props?.inputProps?.errorMessage])
  
  return (
    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>{props?.label}</Form.Label>
        <InputGroup className="mb-3" hasValidation>
        <Form.Control
            type={show ? "text" : "password"}
            required
            isInvalid={hasError}
            {...props?.inputProps}
            />
        <InputGroup.Text className="eye-password" onClick={()=>setShow(!show)}>
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye}/>
        </InputGroup.Text>
        {
          hasError && 
          <Form.Control.Feedback type="invalid">
            {props?.inputProps?.errorMessage}
          </Form.Control.Feedback>
        }
      </InputGroup>
     
    </Form.Group>
  );
};

type Props = {
    label: string;
    inputProps?: FormControlProps & {errorMessage?: string}
}