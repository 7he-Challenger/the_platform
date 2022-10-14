import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { RESPONSE_ATTR } from "~constantes/response-attr";
import { alertErrorOccured, alertErrorToken } from "~lib/alert";
import { logOut } from "~lib/auth";
import { ActivityType } from "~models/activity";
import { deleteActivity, getActivities, saveActivities } from "~repositories/activities";
import { useAppDispatch } from "~store/hooks";
import { setLoadingTreatment } from "~store/loading-overlay";

/**
 * logics hooks for emploi du temps page
 */
const useEmploiDuTemps = (
  listsActivities: Array<any>,
  total: number
) => {
  const dispatch = useAppDispatch()
  const { data, status }: any = useSession()
  // const { accessToken: token } = data as any

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
      }
    }
  }

  const loadActivity = async (token: string) => {
    const result = await getActivities(token)
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
    handleDeletActivity
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
    type: 1
  }

  /**
   * state of form body activity
   * init to toUPdate or initialeData
   */
  const [body, setBody] = useState(
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
   * check body change
   * if has data check sponsors data
   * if length == 0 push an empty string
   */
  useEffect(() => {
    if(body){
      let tmpBody = { ...body }
      if(tmpBody.sponsors.length == 0){
        tmpBody.sponsors.push('')
        setBody((prev: any) => ({
          ...prev,
          ...tmpBody
        }))
      }
    }
  }, [body])

  return {
    body,
    handleAddSponsor,
    handleRemoveSponsor,
    handleChangeValueForm
  }
}

export default useEmploiDuTemps