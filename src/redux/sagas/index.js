import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';




// function* inputSaga() {
//     // yield takeEvery('POST_ITEM', addItem);
//   }
function* routeSaga(action) {
    try {
        
        yield axios.post('/api/route',action.payload);
        yield put({type:'CLEAR_INPUT'});
        
        const route = action.payload.newRouteInput;
        console.log(route);

        const { history } = action.payload;
        yield history.push(`/${route}`);

    } catch (error) {
        console.log('routeSaga ERROR', error);
        
    }
}


function* rootSaga() {
    yield takeEvery('ADD_ROUTE', routeSaga);
    // yield takeEvery('DELETE_SHELF_ITEM', deleteItem);
  }
  
  export default rootSaga;