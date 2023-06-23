import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from 'react'
import {db} from './firebase'
import {collection, getDocs } from 'firebase/firestore'
import Pdf from './Pdf';
function ExamList() {
    const [exams, setExams]=useState([])
    const [data, setData]=useState('')
    const [isShown, setIsShown] = useState(false);
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
    console.log(data);
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
              <TableCell><Button></Button>  <Button variant="contained" onClick={()=> 
                {
                setData(ex.invoice)
                setIsShown(true);
                }
              } endIcon={<CreateIcon />}>
              Start
            </Button></TableCell>
              </TableRow>
          )
      })
    }
    </TableBody>
  </Table>
{isShown && (
    <div>
      <h2>Download Hallticket</h2>
    </div>
  )}
  {isShown && <Pdf data={data}/>}
    </div>
  )
}

export default ExamList