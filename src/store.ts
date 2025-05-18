import {create} from 'zustand'
import type { Patient, DraftPatient } from './interfaces' 
import { v4 as uuidv4 } from 'uuid';
import {createJSONStorage, devtools,persist} from 'zustand/middleware'





type PatientState = {
    patients:Patient[]
    addPatient:(data:DraftPatient) => void
    deletePatient:(id:Patient['id']) => void
    activeId:Patient['id']
    getPatientById: (id:Patient['id']) => void
    updatePatient: (data:DraftPatient) => void
}
const createPatient = (patient:DraftPatient) : Patient  => {
    return {...patient,id:uuidv4()}
}




export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId:'',
                addPatient: (data) => {
                    const newPatient = createPatient(data)
                    set((state) => ({
                        patients:[...state.patients, newPatient]
                    }))
                },
                deletePatient: (id:Patient['id']) => {
                    set((state) => ({
                        patients: state.patients.filter((patient) => patient.id !== id)
                    }))
                },
                getPatientById:(id) => {
                    set(() => ({
                        activeId:id
                    }))
                },
                updatePatient: (data) => {
                    set((state) => ({
                        patients: state.patients.map((patient) => patient.id === state.activeId ? {id:state.activeId, ...data} : patient),
                        activeId:''
                    }))
                }
            }),
            {
                name:'patients',
                storage:createJSONStorage(() => localStorage)
            }
        )
    )
)