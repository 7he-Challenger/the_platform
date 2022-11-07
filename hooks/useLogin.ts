import { SyntheticEvent, useState } from "react";
import INPUT_VALIDATION from "~constantes/input-validation";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { alertErrorOccured } from "~lib/alert";

/**
 * hooks logis page login
 */
const useLogin = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
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
   * state credential
   * using display error if error credential
   */
  const [errorCredential, setErrorCredential] = useState<string>('');

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
        setErrorCredential('')
        const result: any = await signIn('login', {
          username: emailValue,
          password: passwordValue,
          redirect: false
        })
        if(result.status == 401){
          setErrorCredential('Username ou password invalide')
        }else if(!result.error){
          router.push('/dashboard')
        }
      }
    }catch(e){
      console.log('error login submit', e)
      alertErrorOccured()
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  }

  return {
    invalideUser,
    invalidePassword,
    handleInputEmail,
    handleInputPassword,
    emailValue,
    passwordValue,
    submitLogin,
    errorCredential
  }
}

// rule for user email input
export const emailRule = (value: string) => {
  // const pattern = new RegExp(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/, 'i');

  if(value == null || value == '') return INPUT_VALIDATION.FIELD_REQUIRED;
  // if(!pattern.test(value)) return INPUT_VALIDATION.EMAIL_FORM_ERROR;
  return false;
}

// rule for user password input
export const passwordRule: any = (value: string) => {
  if(value == null || value == '') return INPUT_VALIDATION.FIELD_REQUIRED;
  // if(value.length < 8) return PASSWORD_LENGTH_ERROR
  return false;
}

export default useLogin;