import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Appointment {
  id: string;
  name: string;
  gender: string;
  age: string;
  date: string;
  time: string;
}

interface AppointmentsState {
  appointments: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: AppointmentsState = {
  appointments: [],
  status: 'idle',
  error: null,
};

export const loadAppointments = createAsyncThunk('appointments/loadAppointments', async () => {
  const getData = localStorage.getItem('appointments');
  const parseData = getData ? JSON.parse(getData) : { data: [] };
  return parseData;
});

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
      localStorage.setItem('appointments', JSON.stringify({ data: state.appointments }));
    },
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
      localStorage.setItem('appointments', JSON.stringify({ data: state.appointments }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(loadAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load appointments';
      });
  },
});

export const { addAppointment, setAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
