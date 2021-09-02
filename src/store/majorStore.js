import { configureStore, createSlice, current } from '@reduxjs/toolkit'


let initialState = {

               tokenId: '',
               userId: '',
               url: '',

}


const Majorstore = createSlice({

               name: 'state',
               initialState: initialState,
               reducers: {

                              storeToken(state, action) {

                                             state.tokenId = action.payload.tokenId;
                                             state.userId = action.payload.userId

                                             console.log('action payload value', action.payload)

                                             console.log(current(state))


                              },
                              storeUrl(state, action) {
                                             state.url = action.payload.url;
                              }

               }
})


export const store = configureStore({
               reducer: {
                              majorStore: Majorstore.reducer
               }
})

export const majorStoreAction = Majorstore.actions