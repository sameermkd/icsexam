import React, { useState } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
  } from "@react-pdf/renderer";
import { db } from './firebase'
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
const userCollectionRef = collection(db, "exam")
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      color: "black",
    },
    heading: {
        marginTop:"20px",
        fontSize:"40px",
        fontWeight:"bold",
        textAlign: "center"
    }, 
    subheading:{
        fontSize:"15px",
        fontWeight:"bold",
        textAlign: "center"
    },
    section: {
      margin: 10,
      padding: 10,
    },
    halticket: {
        fontSize:"20px",
        marginTop:"15px",
        fontWeight:"bold",
        border:"2px",
        width:"150px",
        display:"block",
        marginLeft:"auto",
        marginRight:"auto",
        textAlign: "center"
    },
    details: {
        marginTop:"20px",
        marginLeft:"30px",
        lineHeight:"2px",
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });
  
function Pdf(props) {
  const [exams, setExams]=useState([])
  const db=getFirestore()
  const colRef=collection(db,'exam')
  const q=query(colRef, where('invoice','==',props.data))
  onSnapshot(q,(snapshot)=>{
      let exam =[]
      snapshot.docs.map((doc)=>{
          exam.push({...doc.data(), id: doc.id})
      })
      setExams(exam)
    })
  return (
    
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <Text>ICS INDIA</Text>
          </View>
          <View style={styles.subheading}>
            <Text>BM Shoping Complex, Hospital Jn, Mannarkkad</Text>
          </View>
          <View style={styles.halticket}>
          <Text>HALLTICKET</Text>
          </View>
          <View style={styles.details}>
          {
            exams.map((ex)=>{
                return (
          <>
          <Text>Name:      {ex.name}  </Text>
          <Text>Reg No:     {ex.invoice} </Text>
          <Text>Exam Name:  {ex.exam} </Text>
          <Text>Exam Date:   </Text>
          <Text>Exam Time:   </Text>
          <Text>Phone:      {ex.phone} </Text>
          </>
                )
                })
            }
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Pdf