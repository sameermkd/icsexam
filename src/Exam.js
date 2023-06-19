import { collection, getDocs } from 'firebase/firestore'
import {db} from './firebase'
import React, { useEffect, useState } from 'react'

function Exam() {
    const [exam, setExams]=useState([])
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
        {
            exam.map((ex)=>{
                return (
                    <>
                    {ex.name}
                    {ex.exam}
                    </>
                )
            })
        }
    </div>
  )
}

export default Exam