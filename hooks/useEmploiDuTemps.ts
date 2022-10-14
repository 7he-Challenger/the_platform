import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { isNull } from "util";
import { RESPONSE_ATTR } from "~constantes/response-attr";
import { alertErrorOccured, alertErrorToken } from "~lib/alert";
import { logOut } from "~lib/auth";
import { ActivityType } from "~models/activity";
import { deleteActivity, getActivities, GetActivitiesQueryType, saveActivities } from "~repositories/activities";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";
import { setToast } from "~store/toast";

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
  const [query, setQuery] = useState<GetActivitiesQueryType>({
    page: 1
  })

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
        const activity = await saveActivities(token, body, id)
        
        // treatment after save activity
        await loadActivity(token)
        hideCreate()
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
        dispatch(setToast({
          show: true,
          message: 'Activité enregistré'
        }))
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

        // TODO treatment after delete activity
        await loadActivity(token)
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
        dispatch(setToast({
          show: true,
          message: 'Activité supprimé'
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
    handleNavigatePage
  }
}

/**
 * logics hooks for the create/update form activity
 * @param toUpdate 
 */
export const useFormActivity = (
  toUpdate?: any
) => {
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
    start_date: '',
    end_date: ''
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

    tmpBody.start_date = !tmpBody.start_date ? moment().format('YYYY-MM-DD hh:mm') : moment(tmpBody.start_date).format('YYYY-MM-DD hh:mm')
    tmpBody.end_date = !tmpBody.end_date ? moment().format('YYYY-MM-DD hh:mm') : moment(tmpBody.end_date).format('YYYY-MM-DD hh:mm')

    setBody(tmpBody)
  }, [])

  return {
    body,
    handleAddSponsor,
    handleRemoveSponsor,
    handleChangeValueForm,
    handleDateChange
  }
}

export default useEmploiDuTemps