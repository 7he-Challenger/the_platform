import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export const ProfilePictureSection = (props: Props) => {

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0]
        const reader = new FileReader();
        reader.onload = (event: any) => {
            props?.onPictureChanges?.(event.target.result, file!);
        }
        reader.readAsDataURL(file!);
    }

  return (
    <div style={{position:"relative"}} className="pdp-wrapper">
      <Image
        src={props?.src || '/assets/img/avatars/default.png'}
        className="picture-profile"
        alt="profile picture"
        roundedCircle
        fluid
      />
      <label className="profile-picture-edit-icon" htmlFor="profile-picture-edit-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none" width={"25"} height="25">
          <path
            d="M20.4539 4.86447C20.903 4.41538 20.903 3.6669 20.4539 3.24084L17.7594 0.546291C17.3333 0.0971999 16.5848 0.0971999 16.1358 0.546291L14.017 2.65356L18.3352 6.97175L20.4539 4.86447ZM0.0606079 16.6214V20.9396H4.37879L17.1145 8.19235L12.7964 3.87417L0.0606079 16.6214Z"
            fill="#0c63e4"
          />
        </svg>
      </label>
      <Form.Control 
          type="file" 
          onChange={handleFileChange}
          accept="image/*"
          className="d-none"
          id="profile-picture-edit-icon"
        />
    </div>
  );
};


type Props = {
  src?: string;
  onPictureChanges?: (b64picture: string, file : File) => void;
};
