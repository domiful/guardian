import Store from '../store/devices';

export const initialState = Store;

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case 'DEVICES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'SINGLE_DEVICE': {
      return {
        ...state,
        device: action.data
      };
    }
    case 'DEVICES_REPLACE': {
      let devices = [];
      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        devices = action.data.map(item => (
          {
            id:item.id,//"id": "3f494c19-82ca-4e88-a090-c1f8384798d1",
            index: item.index,//"index": 0,
            isActive:item.isActive,
            income:item.income,
            house:item.house,
            gender:item.gender,
            mstatus:item.mstatus,
            children:item.children,
            probability:item.probability,
            image:item.image,
            age:item.age,
            name:item.name,
            company:item.company,
            email:item.email,
            address:item.address,
            phone:item.phone,
            registered:item.registered,
            linkedin:item.linkedin,
            latitude:Number(item.latitude),
            longitude:Number(item.longitude),
            friends:item.friends,
            greeting:item.greeting,
            lifeIns:item.lifeIns,
            investments:item.investments,
            disabilityIns:item.disabilityIns
          }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        devices,
      };
    }
    default:
      return state;
  }
}