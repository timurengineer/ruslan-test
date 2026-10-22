import { create } from "zustand";
import type { IUser } from "../App";
type contactStoreType = {
  contacts: IUser[];
  postuser:(obj:IUser)=>void;
  removeUser:(id:number)=>void;
  updateUser:(id:number, obj:IUser)=>void;
};

const useContact = create((set) => ({
    contacts:[],
    postUser:(obj)=>set((state)=>({
        contacts:[...state.contacts, obj]
    })),
    removeUser:(id:number)=>set((state)=>({
        contacts:state.contacts.filter(c=>c.id!==id)
    })),
    updateUser:(id, obj)=>set((state)=>({
        contacts:state.contacts.map(c => c.id === id ? { ...c, ...obj } : c)
    }))
}));
export default useContact;