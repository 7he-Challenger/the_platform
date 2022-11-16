import { faTemperature4 } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RESPONSE_ATTR } from "~constantes/response-attr";
import { alertErrorOccured, alertErrorToken } from "~lib/alert";
import { logOut } from "~lib/auth";
import { formatQueryActivityParams, formatQueryRegistrationsParams } from "~lib/format";
import { ActivityType } from "~models/activity";
import { deleteActivity, getActivities, GetActivitiesQueryType, saveActivities, saveInscriptionEvent } from "~repositories/activities";
import { uploadFiles } from "~repositories/media";
import { deleteRegistrations, GetRegistrationQueryType, getRegistrations, updateInscriptionEvent } from "~repositories/registration";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { setToast } from "~store/toast";

const initialeQuery = {
  page: 1,
  'startDate[before]': null,
  'startDate[after]': null,
  'order[id]': 'desc',
  title: null,
  isPublic: null
}

/**
 * logics hooks for emploi du temps page
 */
const useEmploiDuTemps = (
  listsActivities: Array<any>,
  total: number
) => {
  const dispatch = useAppDispatch()
  const { data, status }: any = useSession()

  /**
   * state query params
   */
  const [query, setQuery] = useState<GetActivitiesQueryType>(initialeQuery)
  const [filtered, setFiltered] = useState(false)

  /**
   * state for create mode
   * create state is for showing modal
   * toUpdate state is for updating
   */
  const [create, setCreate] = useState(false);
  const [toUpdate, setToUpdate] = useState<any>(null);

  /**
   * state list activities
   */
  const [activities, setActivities] = useState<Array<any>>(listsActivities)
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
   * edit activity
   * show modal
   * @param activity 
   */
  const handleEditActivity = (activity: any) => {
    setToUpdate((prev: any) => ({ ...prev, ...activity }))
    showCreate()
  }

  /**
   * handele submit save activity
   * @param body 
   * @param id 
   */
  const handleSaveActivity = async (
    body: any,
    id?: any
  ) => {
    if(confirm("Enregistrer l'activité ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const medias = await uploadFiles(token, body.posters)
        const tmpBody = { ... body.body}
        tmpBody.posters = tmpBody.posters.map((item: any) => item['@id'])
        medias.forEach((item: any) => tmpBody.posters.push(item))
        const activity = await saveActivities(token, tmpBody, id)
        
        // treatment after save activity
        await loadActivity(token)
        hideCreate()
        dispatch(setToast({
          show: true,
          message: 'Activité enregistré'
        }))
      }catch(e: any){
        console.log('error method save activity', e)
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
  }

  const handleCancelActivity = async (
    id: any,
    toggling: boolean = false
  ) => {
    if(
      confirm(
        toggling == false
          ? "Annuler l'activité ?"
          : "Confirmer l'activité ?"
      )
    ){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const body = activities.find(item => item.id == id)
        body.isEnable = toggling
        const activity = await saveActivities(token, body, id)
        
        // treatment after save activity
        await loadActivity(token)
        hideCreate()
        dispatch(setToast({
          show: true,
          message: 'Activité annulé'
        }))
      }catch(e: any){
        console.log('error method cancel activity', e)
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
  }

  /**
   * handle submit delete activity
   * @param id 
   */
  const handleDeletActivity = async (
    id: any
  ) => {
    if(confirm("Supprimer l'activité ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const result = await deleteActivity(token, id)

        await loadActivity(token)
        dispatch(setToast({
          show: true,
          message: 'Activité supprimé'
        }))
      }catch(e: any){
        console.log('error method delete activity', e)
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
      await loadActivity(token, {
        ...query,
        page
      })
    }catch(e: any){
      console.log('error method delete activity', e)
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
      const queryFilter = formatQueryActivityParams(query)
      await loadActivity(token, {
        ...queryFilter,
        page: 1
      })
    }catch(e: any){
      console.log('error method filter activity', e)
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
   * edited params avoid load activity if filter not submited
   * @param edited 
   */
  const resetFilter = async () => {
    const token = data ? data.accessToken : null
    dispatch(setLoadingTreatment(true))
    
    try{
      setQuery(initialeQuery)
      const queryFilter = formatQueryActivityParams(initialeQuery)
      if(filtered){
        await loadActivity(token, {
          ...queryFilter
        })
        setFiltered(false)
      }
    }catch(e: any){
      console.log('error method filter activity', e)
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
   * load activity with query provided
   * @param token 
   * @param query 
   */
  const loadActivity = async (
    token: string,
    query?: GetActivitiesQueryType
  ) => {
    const result = await getActivities(token, query)
    setActivities(result[RESPONSE_ATTR.data])
    setTotalItem(result[RESPONSE_ATTR.total])
  }

  return {
    showCreate,
    hideCreate,
    create,
    toUpdate,
    activities,
    handleEditActivity,
    handleSaveActivity,
    handleDeletActivity,
    totalItem,
    query,
    handleNavigatePage,
    handleCancelActivity,
    submitFilter,
    resetFilter,
    handleFilterChange
  }
}

/**
 * logics hooks for the create/update form activity
 * @param toUpdate 
 */
export const useFormActivity = (
  toUpdate?: any
) => {
  const pickerRef = useRef<any>(null)
  /**
   * initial data for the activity form
   */
  const initialeData: ActivityType = {
    id: null,
    title: '',
    description: '',
    locale: '',
    intervenant: '',
    sponsors: [],
    type: 1,
    startDate: '',
    endDate: '',
    isPublic: true,
    posters: [],
    seats: 0
  }

  /**
   * state of form body activity
   * init to toUPdate or initialeData
   */
  const [body, setBody] = useState<any>(
    toUpdate 
      ? { ...initialeData,...toUpdate }
      : { ...initialeData } 
  )

  const [posters, setPosters] = useState<Array<any>>([])

  /**
   * method to add new sponsor item
   */
  const handleAddSponsor = () => {
    setBody((prev: any) => {
      let tmpPrev = { ...prev }
      tmpPrev.sponsors.push('')
      return {
        ...prev,
        ...tmpPrev
      }
    })
  }

  /**
   * method to remove a sponsor item
   * @param index 
   */
  const handleRemoveSponsor = (index: number) => {
    setBody((prev: any) => {
      let tmpPrev = { ...prev }
      tmpPrev.sponsors.splice(index, 1)
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
  const handleChangeValueForm = useCallback((
    input: string,
    value: any,
    index?: number
  ) => {
    setBody((prev: any) => {
      let tmpPrev = JSON.parse(JSON.stringify(prev))
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
  }, [body])

  /**
   * method handle value change of date input
   * type for date or time input
   * @param input 
   * @param value 
   * @param type 
   */
  const handleDateChange = useCallback((
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
  }, [body])

  /**
   * handle input type file change
   * @param input 
   * @param value 
   */
  const handleFilePicker = (
    e: any
  ) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setPosters((prev: any) => {
        const tmp = [...prev]
        tmp.push({
          src: event.target.result,
          file
        })
        return tmp
      })
    }
    
    reader.readAsDataURL(file)
  }

  const deleteImage = (i: number) => {
    setPosters((prev: any) => {
      const tmp = [...prev]
      tmp.splice(i, 1)
      return tmp
    })

    if(body.posters[i]){
      setBody((prevBody: any) => {
        const tmpBody = {...prevBody}
        tmpBody.posters.splice(i, 1)
        return tmpBody
      })
    }
  }

  /**
   * check body change
   * if has data check sponsors data
   * if length == 0 push an empty string
   */
  useEffect(() => {
    if(body && body.sponsors.length == 0){
      let tmpBody = { ...body }
      tmpBody.sponsors.push('')

      setBody((prev: any) => ({
        ...prev,
        ...tmpBody
      }))
    }
  }, [body])

  /**
   * initiate body
   * set default format date and time
   */
  useEffect(() => {
    let tmpBody = toUpdate 
      ? { ...initialeData,...toUpdate }
      : { ...initialeData } 

    tmpBody.startDate = !tmpBody.startDate ? moment().format('YYYY-MM-DD hh:mm') : moment(tmpBody.startDate).format('YYYY-MM-DD hh:mm')
    tmpBody.endDate = !tmpBody.endDate ? moment().format('YYYY-MM-DD hh:mm') : moment(tmpBody.endDate).format('YYYY-MM-DD hh:mm')

    setBody(tmpBody)
    setPosters(tmpBody.posters)
  }, [])

  return {
    body,
    handleAddSponsor,
    handleRemoveSponsor,
    handleChangeValueForm,
    handleDateChange,
    pickerRef,
    posters,
    handleFilePicker,
    deleteImage
  }
}

/**
 * hooks logics form inscription event
 * @param activity 
 */
export const useFormInscriptionEvent = (
  activity: any
) => {
  const dispatch = useAppDispatch()
  /**
   * initial data body inscription event
   */
  const initialeData = {
    email: '',
    seatNumber: 1,
    event: activity['@id']
  }

  /**
   * state of form body
   */
  const [body, setBody] = useState<any>(initialeData)
  const [alertInscription, setAlert] = useState<string | null>(null)

  const resetForm = () => setBody(initialeData)

  /**
   * methods handle input change
   * @param input 
   * @param value 
   */
  const handleChangeValueForm = useCallback((
    input: string,
    value: any
  ) => {
    setBody((prev: any) => {
      let tmpPrev = JSON.parse(JSON.stringify(prev))
      tmpPrev[input] = value
      return {
        ...prev,
        ...tmpPrev
      }
    })
  }, [body])

  /**
   * method handle submit form
   */
  const submitInscription = async (e: any) => {
    e.preventDefault()

    if(confirm(`Valider l'inscription à l'event ${activity.title} ?`)){
      dispatch(setLoadingTreatment(true))
    }

    try{
      setAlert(null)
      const registration = await saveInscriptionEvent(body)
      resetForm()
      setAlert('Inscription fait avec succès')
    }catch(e: any){
      console.log('error method save activity', e)
      alertErrorOccured()
    }finally{
      dispatch(setLoadingTreatment(false))
    }
  }

  return {
    handleChangeValueForm,
    body,
    submitInscription,
    alertInscription
  }
}

export const useEventInscriptionGesture = (
  listInscription: Array<any>,
  total: number,
  listsActivities: Array<any>
) => {
  const dispatch = useAppDispatch()
  const { data, status }: any = useSession()
  const initialQuery = {
    page: 1,
    event: null
  }

  /**
   * state for create mode
   * create state is for showing modal
   * toUpdate state is for updating
   */
  const [create, setCreate] = useState(false);
  const [toUpdate, setToUpdate] = useState<any>(null);

  /**
   * state query params
   */
  const [query, setQuery] = useState<GetActivitiesQueryType>(initialQuery)
  const [filtered, setFiltered] = useState(false)

  /**
   * state list activities and inscription
   */
  const [activities, setActivities] = useState<Array<any>>(listsActivities)
  const [registrations, setRegistraions] = useState<Array<any>>(listInscription)
  const [totalItem, setTotalItem] = useState(total)

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
      await loadRegistrations(token, {
        ...query,
        page
      })
    }catch(e: any){
      console.log('error method delete activity', e)
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
      const queryFilter = formatQueryRegistrationsParams(query)
      await loadRegistrations(token, {
        ...queryFilter,
        page: 1
      })
    }catch(e: any){
      console.log('error method filter registration', e)
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
   * edited params avoid load activity if filter not submited
   * @param edited 
   */
  const resetFilter = async () => {
    const token = data ? data.accessToken : null
    dispatch(setLoadingTreatment(true))
    
    try{
      setQuery(initialeQuery)
      const queryFilter = formatQueryRegistrationsParams(initialeQuery)
      if(filtered){
        await loadRegistrations(token, {
          ...queryFilter
        })
        setFiltered(false)
      }
    }catch(e: any){
      console.log('error method filter registration', e)
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

  const loadRegistrations = async (
    token: string,
    query?: GetRegistrationQueryType
  ) => {
    const result = await getRegistrations(token, query)
    setRegistraions(result[RESPONSE_ATTR.data])
    setTotalItem(result[RESPONSE_ATTR.total])
  }

  const countRegistrationByEvent = (
    eventId: number
  ) => {
    return registrations.reduce((acc, item) => {
      if(item.event.id == eventId) acc += item.seatNumber
      return acc
    }, 0)
  }

  /**
   * handle submit delete activity
   * @param id 
   */
  const handleDeleteRegistrations = async (
    id: any
  ) => {
    if(confirm("Supprimer l'inscription ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        const result = await deleteRegistrations(token, id)

        await loadRegistrations(token)
        dispatch(setToast({
          show: true,
          message: 'Inscription supprimé'
        }))
      }catch(e: any){
        console.log('error method delete registrations', e)
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
  }

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
   * edit registration
   * show modal
   * @param registration 
   */
  const handleEditRegistrations = (registration: any) => {
    setToUpdate((prev: any) => ({ ...prev, ...registration }))
    showCreate()
  }

  /**
   * handele submit save activity
   * @param body 
   * @param id 
   */
  const handleSaveRegistration = async (
    body: any,
    id?: any
  ) => {
    if(confirm("Enregistrer l'inscription ?")){
      dispatch(setLoadingTreatment(true))
      try{
        const token = data ? data.accessToken : null
        await updateInscriptionEvent(token, body, id)
        
        // treatment after save activity
        await loadRegistrations(token)
        hideCreate()
        dispatch(setToast({
          show: true,
          message: 'Activité enregistré'
        }))
      }catch(e: any){
        console.log('error method save activity', e)
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
  }

  return {
    handleNavigatePage,
    query,
    resetFilter,
    submitFilter,
    handleFilterChange,
    activities,
    registrations,
    totalItem,
    countRegistrationByEvent,
    handleDeleteRegistrations,
    create,
    toUpdate,
    hideCreate,
    handleEditRegistrations,
    handleSaveRegistration
  }
}

/**
 * logics hooks for the update form registration
 * @param toUpdate 
 */
 export const useFormRegistration = (
  toUpdate: any
) => {
  /**
   * initial data for the activity form
   */
  const initialeData = {
    email: toUpdate.email,
    seatNumber: toUpdate.seatNumber,
    event: toUpdate.event['@id']
  }

  /**
   * state of form body registration
   * init to toUPdate or initialeData
   */
  const [body, setBody] = useState<any>(initialeData)

  /**
   * method handle value change of each form
   * input for the attribut to change
   * value for the value of change
   * index for the attribut with array 
   * @param input 
   * @param value 
   * @param index 
   */
  const handleChangeValueForm = useCallback((
    input: string,
    value: any
  ) => {
    setBody((prev: any) => {
      let tmpPrev = JSON.parse(JSON.stringify(prev))
      tmpPrev[input] = value
      return {
        ...prev,
        ...tmpPrev
      }
    })
  }, [body])

  return {
    body,
    handleChangeValueForm,
    toUpdate
  }
}

export default useEmploiDuTemps