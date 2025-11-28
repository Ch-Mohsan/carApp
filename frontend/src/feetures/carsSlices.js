import {createSlice,nanoid} from '@reduxjs/toolkit'
const initialState={
    cars:[
          {
            nanoid:nanoid(),
            "name":"Honda Civic",   
            "brand":"Honda",
            "pricePerDay":50,
            "rating":4.5,
            "imageUrl":"/images/car-1.jpg"}
          ,{
            nanoid:nanoid(),
            "name":"Toyota Corolla",        
            "brand":"Toyota",
            "pricePerDay":45,
            "rating":4.2,
            "imageUrl":"/images/car-2.jpg"
          },
          {
            nanoid:nanoid(),
            "name":"Ford Mustang",        
            "brand":"Ford",
            "pricePerDay":80,   
            "rating":4.8,
            "imageUrl":"/images/car-3.jpg"
          },
          {
            nanoid:nanoid(),
            "name":"Chevrolet Camaro",        
            "brand":"Chevrolet",
            "pricePerDay":75,
            "rating":4.6,
            "imageUrl":"/images/car-4.jpg"
          },
          {
            nanoid:nanoid(),
            "name":"BMW 3 Series",
            "brand":"BMW",
            "pricePerDay":90,
            "rating":4.7,
            "imageUrl":"/images/car-5.jpg"
          },
                                                                                        
    ]
}
const carsSlice=createSlice({
    name:'cars',
    initialState,
    reducers:{},
    AddCar: (state, action) => {
        state.cars.push({
          id: nanoid(),
          ...action.payload
        });
      },
      RemoveCar: (state, action) => {
        state.cars = state.cars.filter(car => car.id !== action.payload);
      },
      UpdateCar: (state, action) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = { ...state.cars[index], ...action.payload.updates };
        }
      }

}) 
const {AddCar,RemoveCar,UpdateCar}=carsSlice.actions
export const selectAllCars=(state)=>state.cars.cars 
export default carsSlice.reducer