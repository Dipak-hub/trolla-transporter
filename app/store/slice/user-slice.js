import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {rootClient} from '../../utils';
import {
  endPoints,
  errorMessageTypes,
  socketActionTypes,
  status,
} from '../../constants';
import {socket} from './../../utils';
import messaging from '@react-native-firebase/messaging';
import store from './../store';

const initialState = {
  loading: false,
  error_message: null,
  is_id_proof_uploaded: false,
  is_address_proof_uploaded: false,
  first_time: true,
  isVerified: false,
  isKycSubmitted: false,
  user: {
    _id: '',
    profile_pic: null,
    documents: {
      address_proof_front: null,
      address_proof_back: null,
      id_proof: null,
      gst_number: '',
      pan_number: '',
      address_proof_type: '',
      id_proof_Type: '',
    },
    mobile_primary: '',
    user_name: '',
    email: '',
    mobile_secondary: '',
    state: '',
    city: '',
    address: '',
    status: '',
  },
};

export const fmcSet = createAsyncThunk(
  'set-device-fnc',
  async (body, {rejectWithValue}) => {
    try {
      const response = await rootClient.post(endPoints.SET_FCM, body);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const self = createAsyncThunk(
  'user-self',
  async (arg, {getState, dispatch, rejectWithValue}) => {
    const {user} = getState();
    if (user.first_time) {
      messaging()
        .getToken()
        .then(fcm => {
          dispatch(fmcSet({fcm}));
        });
      messaging().subscribeToTopic('transporter');
      messaging().subscribeToTopic('all');
    }
    try {
      const response = await rootClient.post(endPoints.USER_SELF);
      // console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const kycUpdate = createAsyncThunk(
  'kyc-update',
  async (arg, {getState, rejectWithValue}) => {
    const {user} = getState();
    console.log('------------', user);
    const {
      user_name,
      address,
      email,
      mobile_secondary,
      ifsc_code,
      acc_number,
      name_in_bank,
      upi,
      documents,
      state,
      city,
      status,
    } = user.user;

    try {
      const response = await rootClient.post(endPoints.KYC_UPDATE, {
        user_name,
        address,
        email,
        status,
        mobile_secondary,
        gst_number: documents.gst_number,
        pan_number: documents.pan_number,
        address_proof_type: documents.address_proof_type ?? '',
        id_proof_Type: documents.id_proof_Type ?? '',
        ifsc_code,
        acc_number,
        name_in_bank,
        state,
        city,
        upi,
      });
      // console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const uploadProfilePic = createAsyncThunk(
  'kyc-update-profile',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(endPoints.PROFILE_PIC, formData, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const uploadIdProof = createAsyncThunk(
  'kyc-update-id-proof',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(endPoints.ID_PROOF, formData, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const uploadAddressProof = createAsyncThunk(
  'kyc-update-address-proof',
  async (body, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: body.path,
      address_proof_type: body.documentName,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(
        endPoints.ADDRESS_PROOF_FRONT,
        formData,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const uploadAddressProofBackSide = createAsyncThunk(
  'kyc-update-address-proof-backside',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(
        endPoints.ADDRESS_PROOF_BACK,
        formData,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState, /// when both key and value will we same don't need to pass value
  reducers: {
    updateUserName(state, action) {
      state.user.user_name = action.payload;
    },
    updateMobileSecondary(state, action) {
      state.user.mobile_secondary = action.payload;
    },
    updateIFSC(state, action) {
      state.user.ifsc_code = action.payload;
    },
    updateBankAccNo(state, action) {
      state.user.acc_number = action.payload;
    },
    updateBankAccName(state, action) {
      state.user.name_in_bank = action.payload;
    },
    updateUPI(state, action) {
      state.user.upi = action.payload;
    },
    updateEmail(state, action) {
      state.user.email = action.payload;
    },
    updateAddress(state, action) {
      state.user.address = action.payload;
    },
    updateProfilePic(state, action) {
      state.user.profile_pic = action.payload;
    },
    updateAddressProofFront(state, action) {
      state.user.documents.address_proof_front = action.payload;
    },
    updateAddressProofBack(state, action) {
      state.user.documents.address_proof_back = action.payload;
    },
    updateAddressProofType(state, action) {
      state.user.documents.address_proof_type = action.payload;
    },
    updateIdProof(state, action) {
      state.user.documents.id_proof = action.payload;
    },
    updateIdProofType(state, action) {
      state.user.documents.id_proof_Type = action.payload;
    },
    updateGstNumber(state, action) {
      state.user.documents.gst_number = action.payload;
    },
    updatePanNumber(state, action) {
      state.user.documents.pan_number = action.payload;
    },
    updateState(state, action) {
      state.user.state = action.payload;
    },
    updateCity(state, action) {
      state.user.city = action.payload;
    },
    deleteAddressProofBack(state, action) {
      state.user.documents.address_proof_back = action.payload;
    },
    userStateClear: () => initialState,
  },
  extraReducers: {
    [self.fulfilled]: (state, action) => {
      const {user} = action.payload;
      state.user = user;
      state.loading = false;
      state.isVerified = user.status === status.VERIFIED;
      socket.emit('newUser', user._id);
    },

    [self.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [self.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    // kyc update--------------------
    [kycUpdate.fulfilled]: (state, action) => {
      // state.user = action.payload.user;
      state.loading = false;
    },

    [kycUpdate.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [kycUpdate.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    //  update profile pic --------------------
    [uploadProfilePic.fulfilled]: (state, action) => {
      state.user.profile_pic = action.payload.path;
      state.loading = false;
    },

    [uploadProfilePic.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [uploadProfilePic.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    //  upload id-proof  --------------------
    [uploadIdProof.fulfilled]: (state, action) => {
      state.user.documents.id_proof = action.payload.path;
      state.loading = false;
      state.is_id_proof_uploaded = false;
    },

    [uploadIdProof.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.is_id_proof_uploaded = true;
    },

    [uploadIdProof.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
      state.is_id_proof_uploaded = false;
    },
    //  upload addresss-proof  --------------------
    [uploadAddressProof.fulfilled]: (state, action) => {
      state.user.documents.address_proof_front = action.payload.path;
      state.loading = false;
      state.is_address_proof_uploaded = false;
    },

    [uploadAddressProof.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.is_address_proof_uploaded = true;
    },

    [uploadAddressProof.rejected]: (state, action) => {
      state.loading = false;
      console.log('rejected');
      // state.error_message =
      //   action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      // state.is_address_proof_uploaded = false;
    },

    //upload address proof back
    [uploadAddressProofBackSide.fulfilled]: (state, action) => {
      state.user.documents.address_proof_back = action.payload.path;
      state.loading = false;
      state.is_address_proof_uploaded = false;
    },

    [uploadAddressProofBackSide.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.is_address_proof_uploaded = true;
    },

    [uploadAddressProofBackSide.rejected]: (state, action) => {
      state.loading = false;
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.is_address_proof_uploaded = false;
    },

    //-----------------------
    //  fmc set  --------------------
    [fmcSet.fulfilled]: (state, action) => {
      state.first_time = false;
    },
  },
});

// web socket actions -------------------------------------------------------------------
socket.on(socketActionTypes.KYC_UPDATE, data => {
  store.dispatch(self());
});
socket.on('connect', data => {
  // console.log(store.getState().user.user._id);
  console.log(store.getState().user.user._id);
  socket.emit('newUser', store.getState().user.user._id);
});

export const {
  updateUserName,
  updateAddress,
  updateEmail,
  updateMobileSecondary,
  updateIFSC,
  updateBankAccNo,
  updateBankAccName,
  updateUPI,
  updateProfilePic,
  updateAddressProofFront,
  updateAddressProofBack,
  updateIdProof,
  userStateClear,
  updateGstNumber,
  updatePanNumber,
  getIsVerified,
  updateAddressProofType,
  updateIdProofType,
  updateCity,
  updateState,
  deleteAddressProofBack,
} = userSlice.actions;

export default userSlice.reducer;
