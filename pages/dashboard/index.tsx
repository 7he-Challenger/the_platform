import type { NextPage } from 'next'
import { AdminLayout } from '~layout'
import {
  Card, Col, Row,
} from 'react-bootstrap'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import React from 'react'
import { usePresenceStatistics, useStatistics } from '~hooks/useStatistics'
import LoadingSection from '~components/loading-section'

Chart.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Filler,
  Legend,
  ArcElement
)

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const Home: NextPage = () => {
  const {
    dataYear,
    dataMonth,
    dataTypes,
    options,
    loading: loadingUser
  } = useStatistics();

  const {
    options: optionPresence,
    dataPresence,
    dataAveragePresence,
    loading: loadingPresence
  } = usePresenceStatistics()

  return (
    <AdminLayout>
      <Row>
        <Col lg={6} className="position-relative">
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">
                    Statistique membres inscrits par année
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '40px',
                }}
              >
                <Bar 
                  options={options} 
                  data={dataYear} 
                />
              </div>
            </Card.Body>
          </Card>
          {
            loadingUser && (
              <LoadingSection />
            )
          }
        </Col>

        <Col lg={6} className="position-relative">
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">
                    Statistique membres inscrits par mois cette année
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '40px',
                }}
              >
                <Bar 
                  options={options} 
                  data={dataMonth} 
                />
              </div>
              
            </Card.Body>
          </Card>
          {
            loadingUser && (
              <LoadingSection />
            )
          }
        </Col>

        <Col lg={12} className="position-relative">
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">
                    Statistique activités membres (étudiants, employés, etc ...)
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '40px',
                  height: '600px'
                }}
                className="d-flex justify-content-center"
              >
               <div
                  style={{
                    width: '600px'
                  }}
               >
                <Pie 
                  options={options} 
                  data={dataTypes} 
                />
               </div>
              </div>
            </Card.Body>
          </Card>
          {
            loadingUser && (
              <LoadingSection />
            )
          }  
        </Col>

        <Col lg={12} className="position-relative">
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">
                    Statistique présence membres 
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '40px',
                  height: '200px'
                }}
                className="d-flex justify-content-center"
              >
                <Line
                  data={dataPresence}
                  options={optionPresence}
                />
              </div>
            </Card.Body>
          </Card>
          {
            loadingPresence && (
              <LoadingSection />
            )
          }
        </Col>

        <Col lg={12} className="position-relative">
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">
                    Statistique présence moyenne des membres par mois cette année
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '40px',
                  height: '200px'
                }}
                className="d-flex justify-content-center"
              >
                <Line
                  data={dataAveragePresence}
                  options={optionPresence}
                />
              </div>
            </Card.Body>
          </Card>
          {
            loadingPresence && (
              <LoadingSection />
            )
          } 
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default Home
