import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgList: [],
    isImgListLoading: false,
}

export const imageReducer = createSlice({
    name: 'imageReducer',
    initialState,
    reducers: {
        imageList: (state, action) => ({
            ...state,
            imgList: [...action.payload]
            // console.log(typeof action.payload);
        }),
        imageLoding: (state, action) => ({
            ...state,
            isImgListLoading: action.payload
        }),
        updateImageList: (state, action) => ({
            ...state,
            imgList: [...action.payload]
        })
    }
})

export const fetchImageList = (token, category) => dispatch => {
    const api = 'https://photo-gallery-8f403-default-rtdb.asia-southeast1.firebasedatabase.app/imagesList.json?auth='
    let query = '';
    if (category) {
        query = '&orderBy="imageCategory"&equalTo="' + category + '"';
    } else {
        query = '&orderBy="imageCategory"'
    } //imageCategory:"Bike
    // console.log(category);
    fetch(api + token + query)
        .then(
            response => response.json()
        ).then(
            data => {
                const imagesList = []
                for (let imgId in data) {
                    imagesList.push({ ...data[imgId], imgId });
                }
                // console.log(imagesList);
                dispatch(imageList(imagesList))
            }
        ).catch(
            error => console.log(error)
        )

}

export const addImageList = (imageList, imgId) => dispatch => {
    const newList = imageList.map((item) => {
        if (item.imgId === imgId) {
            const feedback = item.feedback + 1
            return ({ ...item, feedback })
        } else {
            return item 
        }
    })
    dispatch(updateImageList(newList));
}

export const { imageList, imageLoding, updateImageList } = imageReducer.actions;
export default imageReducer.reducer;