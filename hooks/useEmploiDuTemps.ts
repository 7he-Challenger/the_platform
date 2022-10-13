import { useEffect, useState } from "react";
import { listsActivities } from "~constantes/datas";

/**
 * logics hooks for emploi du temps page
 */
const useEmploiDuTemps = () => {
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

  // useEffect(() => {
  //   setActivities(prev => listsActivities)
  // }, [])

  return {
    showCreate,
    hideCreate,
    create,
    toUpdate,
    activities
  }
}

export default useEmploiDuTemps