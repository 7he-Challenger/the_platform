import moment from "moment";
import { useEffect, useState } from "react";

const years = ['2017', '2018', '2019', '2020', '2021', '2022'];
const months = moment.monthsShort()
const types = ['Etudiants', 'Travaillants', 'Etudiant et travaillant']
const initialLabel = {
 labels: [],
 datasets: []   
}

const useStatistics = () => {
  const [labelsYear, setLabelYear] = useState<Array<any>>(years);
  const [labelsMonth, setLabelMonth] = useState<Array<any>>(months);
  const [labesType, setLabelTypes] = useState<Array<any>>(types);
  const [dataYear, setDataYear] = useState<any>(initialLabel)
  const [dataMonth, setDataMonth] = useState<any>(initialLabel)
  const [dataTypes, setDataTypes] = useState<any>(initialLabel)

  const options: any = {
    responsive: true
  }

  useEffect(() => {
    setDataYear({
      labels: labelsYear,
      datasets: [
        {
          label: 'Membre inscrit',
          data: years.map(() => (10)),
          backgroundColor: 'rgba(18, 200, 255, 0.5)',
        }
      ]
    })

    setDataMonth({
      labels: labelsMonth,
      datasets: [
        {
          label: 'Membre inscrit',
          data: labelsMonth.map(() => (10)),
          backgroundColor: 'rgba(18, 200, 255, 0.5)',
        }
      ]
    })

    setDataTypes({
      labels: labesType,
      datasets: [
        {
          data: labesType.map(item => (10)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [])

  return {
    dataYear,
    dataMonth,
    dataTypes,
    options
  }
}

export default useStatistics;