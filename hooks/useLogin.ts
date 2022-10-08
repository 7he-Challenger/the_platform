import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import COOKIES_KEY from "~constantes/cookies";
import ENDPOINT from "~constantes/enpoint";
import INPUT_VALIDATION from "~constantes/input-validation";
import axios from "~lib/axios";
import { setCookiesData } from "~lib/cookies";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
// import { useSnackbar } from 'nextjs-toast'

/**
 * hooks logis page login
 */
const useLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const snackbar = useSnackbar()

  /**
   * state input validator
   * using to display error input login
   */
  const [invalideUser, setInvalidUser] = useState<string | null>(null);
  const [invalidePassword, setInvalidePassword] = useState<string | null>(null);

  /**
   * state input handler
   */
  const [emailValue, setEmail] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');
 

  /**
   * Method to handle rule on user email change
   * @param user 
   */
  const handleUserChangeRule = (user: string) => {
    const result = emailRule(user);

    switch(result){
      case INPUT_VALIDATION.FIELD_REQUIRED: 
        setInvalidUser("Champs obligatoire");
        break
      // case INPUT_VALIDATION.EMAIL_FORM_ERROR:
        // setInvalidUser("Email format invalide")
        // break
      default:
        setInvalidUser(null);
        break
    }

    return result
  }

  /**
   * Method to handle rule on user password change
   * @param password 
   */
  const handlePasswordChangeRule = (password: string) => {
    const result = passwordRule(password);

    switch(result){
      case INPUT_VALIDATION.FIELD_REQUIRED: 
        setInvalidePassword("Champs obligatoire");
        break
      // case PASSWORD_LENGTH_ERROR:
      //   setInvalidePassword(PASSWORD_LENGTH_ERROR)
        // break
      default:
        setInvalidePassword(null);
        break
    }

    return result
  }

  /**
   * Method handle input email change
   * @param email 
   */
  const handleInputEmail = (email: string) => {
    setEmail(email)
  }

  /**
   * Method handle input password change
   * @param password 
   */
  const handleInputPassword = (password: string) => {
    setPassword(password)
  }

  /**
   * Method check if input form valid
   */
  const checkInputForm = () => {
    const email = handleUserChangeRule(emailValue)
    const password = handlePasswordChangeRule(passwordValue)

    return (
      !email
      && !password
    ) ? true : false
  }

  /**
   * Method submit login
   */
  const submitLogin = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    dispatch(setLoadingTreatment(true))
    try{
      if(checkInputForm()){
        const body = {
          username: emailValue,
          password: passwordValue
        }

        const result = await axios.post(
          ENDPOINT.LOGIN,
          body
        )

        if(result.data){
          const {
            token,
            user
          } = result.data

          setCookiesData(COOKIES_KEY.TOKEN_SESSION, token)
          setCookiesData(COOKIES_KEY.USER_INFO, user)
        }
      }
    }catch(e){
      console.log('error cores')
      alert('An error has occured')
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  }

  useEffect(() => {
    // snackbar.showMessage(
    //   "This is the Massage",
    //   "error",
    //   "filled",
    // );
  }, [])

  return {
    invalideUser,
    invalidePassword,
    handleInputEmail,
    handleInputPassword,
    emailValue,
    passwordValue,
    submitLogin
  }
}

// rule for user email input
const emailRule = (value: string) => {
  // const pattern = new RegExp(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/, 'i');

  if(value == null || value == '') return INPUT_VALIDATION.FIELD_REQUIRED;
  // if(!pattern.test(value)) return INPUT_VALIDATION.EMAIL_FORM_ERROR;
  return false;
}

// rule for user password input
const passwordRule: any = (value: string) => {
  if(value == null || value == '') return INPUT_VALIDATION.FIELD_REQUIRED;
  // if(value.length < 8) return PASSWORD_LENGTH_ERROR
  return false;
}

export default useLogin;