import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import './ExamPage.css'
import { db } from './firebase'
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
const userCollectionRef = collection(db, "exam")

function ExamPage() {
    const [invoice, setInvoice]=useState('')
    const [exams, setExams]=useState([])
    const handleGet= async(e) => {
            e.preventDefault()
            const db=getFirestore()
            const colRef=collection(db,'exam')
            const q=query(colRef, where('invoice','==',invoice))
            onSnapshot(q,(snapshot)=>{
                let exam =[]
                snapshot.docs.map((doc)=>{
                    exam.push({...doc.data(), id: doc.id})
                })
                setExams(exam)
            })

        }
  return (

    <div>
    <div className='exampage'>
    <TextField id="outlined-basic" label="Enter Reg No(Invoice No)" variant="outlined" className='text'onChange={e => setInvoice(e.target.value)}/>
    <Button variant="contained" color="success" onClick={handleGet}>Get Details</Button>
    </div>
    <div className='table'>
    <Table>
    <TableHead>
      <TableCell>Invoice No</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Exam Name</TableCell>
      <TableCell>Exam Link</TableCell>
    </TableHead>
    <TableBody>
    {
      exams.map((ex)=>{
          return (
              <TableRow>
              <TableCell>{ex.invoice}</TableCell>
              <TableCell>{ex.name}</TableCell>
              <TableCell>{ex.examname}</TableCell>
              <TableCell> <a href={ex.exam}> <Button variant="contained" endIcon={<CreateIcon />}>
              Start
            </Button></a></TableCell>
              </TableRow>
          )
      })
    }
    </TableBody>
  </Table>
  </div>
    </div>
  )
}

export default ExamPage