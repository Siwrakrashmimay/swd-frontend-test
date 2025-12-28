import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "@/types/person";

const STORAGE_KEY = "persons";

const loadStorage = (): Person[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const saveStorage = (data: Person[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

interface PersonState {
  list: Person[];
  editingPerson: Person | null;
}

const initialState: PersonState = {
  list: loadStorage(),
  editingPerson: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<Person>) {
      state.list.push(action.payload);
      saveStorage(state.list);
    },
    
    updatePerson(state, action: PayloadAction<Person>) {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveStorage(state.list);
      }
    },
      setEditingPerson: (state, action: PayloadAction<Person>) => {
      state.editingPerson = action.payload;
    },
      deletePerson(state, action: PayloadAction<string>) {
      state.list = state.list.filter(p => p.id !== action.payload);
      saveStorage(state.list);
    },
    deleteMany(state, action: PayloadAction<string[]>) {
      state.list = state.list.filter(p => !action.payload.includes(p.id));
      saveStorage(state.list);
    },
        clearEditingPerson: (state) => {
      state.editingPerson = null;
    },
  },
});

export const { addPerson, updatePerson, deletePerson, deleteMany, setEditingPerson, clearEditingPerson } = personSlice.actions;
export default personSlice.reducer;
