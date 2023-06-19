import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from 'react'
import {db} from './firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
function ExamList() {
    const [exams, setExams]=useState([])
    const userCollectionRef = collection(db, "exam")
    useEffect(() => {
        const getExams = async () => {
        const data = await getDocs(userCollectionRef)
        setExams(data.docs.map((doc)=>(
            {
            ...doc.data(),
            id:doc.id
            }
        )))
        }
        getExams()
    },[])
  return (
    <div>
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
              <TableCell> <a href='http://google.com'> <Button variant="contained" endIcon={<CreateIcon />}>
              Start
            </Button></a></TableCell>
              </TableRow>
          )
      })
    }
    </TableBody>
  </Table>
    </div>
  )
}

export default ExamList