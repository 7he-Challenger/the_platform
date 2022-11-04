import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isAnyArrayBuffer } from "util/types";
import { RESPONSE_ATTR } from "~constantes/response-attr";
import { alertErrorOccured, alertErrorToken } from "~lib/alert";
import { logOut } from "~lib/auth";
import { formatQueryUserParams } from "~lib/format-user";
import { UserType } from "~models/user";
import { deleteUser, getUsers, GetUsersQueryType, saveUsers } from "~repositories/users";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { setToast } from "~store/toast";

const initialeQuery = {
  page: 1,
  firstname: null,
  lastname: null
}

/**
 * logics hooks for member page
 */
const useMember = (
  listUsers: Array<any>,
  total: number
) => {
  const dispatch = useAppDispatch()
  const { data, status }: any = useSession()

  /**
   * state query params
   */
  const [query, setQuery] = useState<GetUsersQueryType>(initialeQuery)
  const [filtered, setFiltered] = useState(false)

  /**
   * state for create mode
   * create state is for showing modal
   * toUpdate state is for updating
   */
  const [create, setCreate] = useState(false);
  const [toUpdate, setToUpdate] = useState<any>(null);

  /**
   * state list users
   */
  const [members, setMembers] = useState<Array<any>>(listUsers)
  const [totalItem, setTotalItem] = useState(total)

  /**
   * show modal create
   */
  const showCreate = () => setCreate(true)

  /**
   * hide modal create
   */
  const hideCreate = () => {
    setCreate(false)
    setToUpdate(null)
  }

  /**
   * edit user
   * show modal
   * @param user 
   */
  const handleEditUser = (user: any) => {
    setToUpdate((prev: any) => ({ ...prev, ...user }))
    showCreate()
  }

  /**
   * handle submit save user
   * @param body 
   * @param id 
   */
  const handleSaveUser = async (
    body: any,
    id?: any
  ) => {
    if(confirm("Sauvegarder le membre ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const user = await saveUsers(token, body, id)
        
        // treatment after save user
        await loadUser(token)
        hideCreate()
      }catch(e: any){
        console.log('error method save user', e)
        if(e.response && e.response.status == 401){
          alertErrorToken()
          logOut()
        }else{
          alertErrorOccured()
        }
      }finally{
        dispatch(setLoadingTreatment(false))
        dispatch(setToast({
          show: true,
          message: 'Membre enregistré'
        }))
      }
    }
  }

  const handleCancelUser = async (
    id: any,
    toggling: boolean = false
  ) => {
    if(
      confirm(
        toggling == false
          ? "Annuler le membre ?"
          : "Confirmer le membre ?"
      )
    ){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const body = members.find(item => item.id == id)
        body.isEnable = toggling
        const user = await saveUsers(token, body, id)
        
        // treatment after save user
        await loadUser(token)
        hideCreate()
      }catch(e: any){
        console.log('error method cancel user', e)
        if(e.response && e.response.status == 401){
          alertErrorToken()
          logOut()
        }else{
          alertErrorOccured()
        }
      }finally{
        dispatch(setLoadingTreatment(false))
        dispatch(setToast({
          show: true,
          message: 'Membre annulé'
        }))
      }
    }
  }

  /**
   * handle submit delete user
   * @param id 
   */
  const handleDeleteUser = async (
    id: any
  ) => {
    if(confirm("Supprimer le membre ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const result = await deleteUser(token, id)

        await loadUser(token)
      }catch(e: any){
        console.log('error method delete user', e)
        if(e.response && e.response.status == 401){
          alertErrorToken()
          logOut()
        }else{
          alertErrorOccured()
        }
      }finally{
        dispatch(setLoadingTreatment(false))
        dispatch(setToast({
          show: true,
          message: 'Membre supprimé'
        }))
      }
    }
  }

  /**
   * handle click on page to fetch data depending that page
   * @param page 
   */
  const handleNavigatePage = async (page: number) => {
    setQuery((prev: any) => ({
      ...prev,
      page
    }))

    dispatch(setLoadingTreatment(true))
    try{
      const token = data ? data.accessToken : null
      await loadUser(token, {
        ...query,
        page
      })
    }catch(e: any){
      console.log('error method delete user', e)
      if(e.response && e.response.status == 401){
        alertErrorToken()
        logOut()
      }else{
        alertErrorOccured()
      }
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  } 

  /**
   * method handle filter change
   * @param input 
   * @param value 
   */
  const handleFilterChange = (
    input: string, 
    value: string
  ) => {
    setQuery((prev: any) => {
      let tmpPrev = { ...prev }
      tmpPrev[input] = value
      return {
        ...prev,
        ...tmpPrev
      }
    })
  }

  /**
   * method submit filter form
   * @param queryFilter 
   */
  const submitFilter = async () => {
    const token = data ? data.accessToken : null
    dispatch(setLoadingTreatment(true))
    try{
      setFiltered(true)
      const queryFilter = formatQueryUserParams(query)
      await loadUser(token, {
        ...queryFilter,
        page: 1
      })
    }catch(e: any){
      console.log('error method filter user', e)
      if(e.response && e.response.status == 401){
        alertErrorToken()
        logOut()
      }else{
        alertErrorOccured()
      }
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  }

  /**
   * method reset filter
   * edited params avoid load user if filter not submited
   * @param edited 
   */
  const resetFilter = async () => {
    const token = data ? data.accessToken : null
    dispatch(setLoadingTreatment(true))
    
    try{
      setQuery(initialeQuery)
      const queryFilter = formatQueryUserParams(initialeQuery)
      if(filtered){
        await loadUser(token, {
          ...queryFilter
        })
        setFiltered(false)
      }
    }catch(e: any){
      console.log('error method filter user', e)
      if(e.response && e.response.status == 401){
        alertErrorToken()
        logOut()
      }else{
        alertErrorOccured()
      }
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  }

  /**
   * load user with query provided
   * @param token 
   * @param query 
   */
  const loadUser = async (
    token: string,
    query?: GetUsersQueryType
  ) => {
    const result = await getUsers(token, query)
    setMembers(result[RESPONSE_ATTR.data])
    setTotalItem(result[RESPONSE_ATTR.total])
  }

  return {
    showCreate,
    hideCreate,
    create,
    toUpdate,
    members,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    totalItem,
    query,
    handleNavigatePage,
    handleCancelUser,
    submitFilter,
    resetFilter,
    handleFilterChange
  }
}

/**
 * logics hooks for the create/update form user
 * @param toUpdate 
 */
export const useFormUser = (
  toUpdate?: any
) => {
  /**
   * initial data for the user form
   */
  const initialeData: UserType = {
    id: null,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    role: 1,
    userType: 1,
    userInfo: {
      address: '',
      phone: ''
    },
    createdAt: moment().format('YYYY-MM-DD hh:mm')
  }

  /**
   * state of form body user
   * init to toUPdate or initialeData
   */
  const [body, setBody] = useState<any>(
    toUpdate 
      ? { ...initialeData,...toUpdate }
      : { ...initialeData } 
  )

  /**
   * method handle value change of each form
   * input for the attribut to change
   * value for the value of change
   * index for the attribut with array 
   * @param input 
   * @param value 
   * @param index 
   */
  const handleChangeValueForm = (
    input: string,
    value: any,
    index?: number
  ) => {
    setBody((prev: any) => {
      let tmpPrev = { ...prev }

      if(index != null){
        tmpPrev[input][index] = value
      }else{
        tmpPrev[input] = value
      }

      return {
        ...prev,
        ...tmpPrev
      }
    })
  }

  /**
   * method handle value change of each form
   * input for the attribut to change
   * value for the value of change
   * index for the attribut with array 
   * @param input 
   * @param value 
   * @param index 
   */
   const handleChangeOtherValueForm = (
    object: string,
    input: string,
    value: any,
    index?: number
  ) => {
    setBody((prev: any) => {
      let tmpPrev = { ...prev }
      
      tmpPrev[object][input] = value

      return {
        ...prev,
        ...tmpPrev
      }
    })
  }

  /**
   * method handle value change of date input
   * type for date or time input
   * @param input 
   * @param value 
   * @param type 
   */
  const handleDateChange = (
    input: string,
    value: string,
    type: string
  ) => {
    setBody((prev: any) => {
      let tmpPrev = { ...prev }
      let tmpDate = tmpPrev[input].split(' ')
      let index = type == 'time' ? 1 : 0
      tmpDate[index] = value
      tmpPrev[input] = tmpDate.join(' ')

      return {
        ...prev,
        ...tmpPrev
      }
    })
  }

  /**
   * check body change
   * if has data check sponsors data
   * if length == 0 push an empty string
   */
  // useEffect(() => {
  //   if(body && body.sponsors.length == 0){
  //     let tmpBody = { ...body }
  //     tmpBody.sponsors.push('')

  //     setBody((prev: any) => ({
  //       ...prev,
  //       ...tmpBody
  //     }))
  //   }
  // }, [body])

  /**
   * initiate body
   * set default format date and time
   */
  useEffect(() => {
    let tmpBody = toUpdate 
      ? { ...initialeData,...toUpdate }
      : { ...initialeData }

    tmpBody.createdAt = !tmpBody.createdAt ? moment().format('YYYY-MM-DD hh:mm') : moment(tmpBody.createdAt).format('YYYY-MM-DD hh:mm')

    setBody(tmpBody)
  }, [])

  return {
    body,
    handleChangeValueForm,
    handleChangeOtherValueForm
  }
}

export default useMember