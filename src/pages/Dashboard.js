import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ImageUser from '../assets/avatar_removebg-preview.png'
import { Col, Row, Select, Typography } from 'antd'
import axios from 'axios'
import BarChartComponent from './Owner/components/BarChartComponent'
import priceFormatter from '../utils/priceFormatter'
import moment from 'moment'


function Dashboard() {
    const profile = useSelector(state => state.auth.profile)
    const token = useSelector(state => state.auth.token)
    const [data, setData] = useState([])

    useEffect(() => {
      getIncomes()
    },[])

    const getIncomes = (year = new Date().getFullYear()) => {
      axios.get(`https://e-field.vercel.app/api/dashboard/incomes?year=${year}`, {headers:{'x-access-token' : token}})
      .then((res) => setData(res.data.data))
      .catch((err) => console.log('err',err))
    }


  return (
    <>
        {/* <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{height:'70vh', width:'100%'}}>
          <img src={ImageUser} alt="defaultImages" width={200} height={200} />
            <p style={{ fontFamily: "Tilt Neon", marginBottom:'10px' }}>Hello, {email}</p>
        </div> */}
        <div className="container py-5 px-2">
          <Row>
            <Col span={8} className='d-flex flex-column align-items-start justify-content-center'>
              <img src={profile.image || ImageUser} alt="defaultImages" style={{borderRadius:'20px'}} width={350} height={350} />
              {/* <p style={{ fontFamily: "Tilt Neon", marginBottom:'10px', fontSize:'16px' }}>Hello, {profile.full_name || 'please input name in your profile'}</p> */}
            </Col>
            <Col span={16}>
              <Typography.Title level={3} style={{fontFamily: "Tilt Neon"}}>INCOME</Typography.Title>
              <p style={{fontFamily: "Tilt Neon", fontSize:'16px'}}>Select Years</p>
              <Select style={{width:'200px', margin:'10px 0'}} onChange={(e) => getIncomes(e)} placeholder={new Date().getFullYear()}>
                <Select.Option value='2023'>2023</Select.Option>
                <Select.Option value='2024'>2024</Select.Option>
              </Select>
              <Row >
                <Col span={12}>
                  <div className="d-flex flex-column" style={{fontFamily: "Tilt Neon"}}>
                  {data.map(e => (
                    <p>{e.month} : {priceFormatter(e.income)}</p>
                  ))}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="" style={{height:'300px', width:'400px'}}>
                    <BarChartComponent data={data} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    </>
  )
}

export default Dashboard