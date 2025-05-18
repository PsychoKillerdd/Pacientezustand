export interface Patient {
    id:string;
    name:string;
    caretaker:string;
    email:string;
    date:Date;
    symptoms:string;
}
export interface DraftPatient extends Omit<Patient, 'id'> {}