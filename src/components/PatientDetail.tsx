import React from 'react'
import type { Patient } from '../interfaces'
import PatientDetailItem from './PatientDetailItem'
import { usePatientStore } from '../store' 
import { toast } from 'react-toastify'
type PatientDetailProps = {
    patient:Patient

}
export default function PatientDetail({patient}: PatientDetailProps ) {
  const {deletePatient} = usePatientStore()
  const {getPatientById} = usePatientStore()
  const hadleClick = () => {
    deletePatient(patient.id)
    toast.error('Paciente eliminado correctamente')
  }
  return (
    <>
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
    <PatientDetailItem label='ID' data={patient.id}/>
    <PatientDetailItem label='Nombre' data={patient.name}/>
    <PatientDetailItem label='Propietario' data={patient.caretaker}/>
    <PatientDetailItem label='Fecha de alta' data={patient.date.toString()}/>
    <PatientDetailItem label='Sintomas' data={patient.symptoms}/>
    
    <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
      <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg" onClick={() => getPatientById(patient.id)}>Editar</button>
      <button className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg" onClick={hadleClick}>Eliminar</button>
    </div>
    </div>

    
    </>
  )
}
