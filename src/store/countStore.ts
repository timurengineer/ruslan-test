import {create} from "zustand";

interface CountStore {
  count: number;
firstname:string;
  increment: () => void;
  decrement: () => void;
  reset:()=>void;
  incrementByAmount:(amount:number)=>void;
}

 const useCount = create<CountStore>((set) => ({
  count: 0,
  firstname:"timur",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset:()=>set({count:0}),
  incrementByAmount:amount=>set(state=>({count:state.count+amount}))
}));
export default useCount;