import React, { useRef } from 'react'
import {db} from './firebase'
import { addDoc, collection } from 'firebase/firestore'
function Home() {
    const nameRef = useRef()
    const examRef = useRef()
    const ref = collection(db,"exam")
    const handleSave = async(e) => {
        e.preventDefault()
        let data = {
            name:nameRef.current.value,
            exam:examRef.current.value,
        }
        try{
            addDoc(ref,data)
        } catch(e) {
            console.log(e)
        }
    }
  return (
    <div>
        <form onSubmit={handleSave}>
            Enter Name : <input type='text' ref={nameRef} />
            Exam Link : <input type='text' ref={examRef} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Home