import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "components/services/auth.service";

type Props = {};

type State = {
    lastname: string,
    firstname: string,
    username: string,
    email: string,
    password: string,
    phonenumber: string,
    successful: boolean,
    message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
        lastname: "",
        firstname: "",
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        successful: false,
        message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
        lastname: Yup.string()
            .required("This field is required!"),

        firstname: Yup.string()
            .required("This field is required!"),

        username: Yup.string()
            .test(
            "len",
            "The username must be between 3 and 20 characters.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
            )
            .required("This field is required!"),

        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),

        phonenumber: Yup.string()
            .required("This field is required!"),

        password: Yup.string()
            .test(
            "len",
            "The password must be between 6 and 40 characters.",
            (val: any) =>
                val &&
                val.toString().length >= 6 &&
                val.toString().length <= 40
            )
            .required("This field is required!"),
    });
  }

  handleRegister(formValue: { lastname: string; firstname: string; username: string; email: string; phonenumber: string; password: string }) {
    const { lastname, firstname, username, email, phonenumber, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
        lastname,
        firstname,
        username,
        email,
        phonenumber,
        password
        ).then(
        response => {
            this.setState({
            message: response.data.message,
            successful: true
            });
        },
        error => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({
            successful: false,
            message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
        lastname: "",
        firstname: "",
        username: "",
        email: "",
        phonenumber: "",
        password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div >
                  <div className="form-group">
                    <label htmlFor="lastname"> Last Name </label>
                    <Field name="lastname" type="text" className="form-control" />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname"> First Name </label>
                    <Field name="firstname" type="text" className="form-control" />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phonenumber"> Phonenumber </label>
                    <Field name="phonenumber" type="number" className="form-control" />
                    <ErrorMessage
                      name="phonenumber"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}