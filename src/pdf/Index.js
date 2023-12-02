import React, { useState } from 'react';
import { Button, message } from 'antd';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { PdfAdmin } from '../utility/axios';
import { useSelector } from 'react-redux';




const Index = (props) => {
  return (
    <div>
      <PDFDownloadLink document={<MyPDFDocument data={props.data}  />} fileName={`${props.fileName}.pdf`}>
        <Button type='primary' disabled={!props.idkaryawan || !props.fileName || !props.data}>Download PDF</Button>
      </PDFDownloadLink>
    </div>
  );
}

const MyPDFDocument = (props) => {

  const data = props.data ?? {}

  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  
  
  return (
    <Document>
      <Page size='A4'>
  
        <View style={{padding:'20px', width:'100%'}}>
  
        {/* Kop surat */}
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', fontWeight:'bold', gap:'5px'}}>
          <Text style={{fontSize:'12px'}}>PT CV DUA SODARA PLASTI</Text>
          <Text style={{fontSize:'10px'}}>Jl. Raya Bekasi No.9, RT.1/RW.2, Rw. Terate, Kec. Cakung</Text>
          <Text style={{fontSize:'10px'}}>Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13920</Text>
          <View style={{border:'1px solid black', width:'100%'}}></View>
        </View>
  
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'10px'}}>
          <Text style={{fontWeight:'bold', textDecoration:'underline', fontSize:'8px'}}>SLIP GAJI</Text>
          <Text style={{fontSize:'8px'}}>Periode 25 Juni 2023 - 25 Juli 2023 </Text>
        </View>
  
        <View style={{display:'flex', flexDirection:'column', marginTop:'10px', fontSize:'8px', gap:'5px'}}>
          <Text>Nama : {data.fullname ?? '-'}</Text>
          <Text>Email : {data.email ?? '-'}</Text>
          <Text>NIK : {data.nik ?? '-'}</Text>
          <Text>Birth Date : {data.birth_date ?? '-'}</Text>
          <Text>Address : {data.address ?? '-'}</Text>
          <Text>Nomor Rekening : {data.norek ?? '-'}</Text>
          <Text>Bank : {data.bank_name ?? '-'}</Text>
          <Text>Alamat : {data.address}</Text>
          <Text>Basic Salary : {costing(data.basic_salary) ?? '-'}</Text>
          <Text>Overtime Salary : {data.overtime_salary ?? '-'}</Text>
          <Text>Status Salary : {data.status ?? '-'}</Text>
          <Text>Date Paid : {data.date_paid ?? '-'}</Text>
        </View>
  
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:'50px', fontSize:'10px'}}>
          <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Text style={{height:'80px'}}>Name Karyawan</Text>
            <Text>{data.fullname ?? '.......'}</Text>
          </View>
          <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Text style={{height:'80px'}}>Name HRD</Text>
            <Text>..........................</Text>
          </View>
        </View>
  
        </View>
  
      </Page>
    </Document>
  );
}

export default Index;