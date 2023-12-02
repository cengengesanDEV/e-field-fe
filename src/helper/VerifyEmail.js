import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../utils/Axios'

function VerifyEmail() {

    const navigate = useNavigate()
    const params = useParams()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        verifyEmail(params.id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    },[])



  return (
    <>
        <h1>Email success di verifikasi</h1>
        <Button loading={loading} type='primary' onClick={(e) => navigate('/')} >to Login</Button>
    </>
  )
}

export default VerifyEmail