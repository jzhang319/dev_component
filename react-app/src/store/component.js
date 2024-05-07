// Action types
const GET_COMPONENT = "component/GET_COMPONENT";
const GET_COMPONENTS = "component/GET_COMPONENTS";
const ADD_COMPONENT = "component/ADD_COMPONENT";
const UPDATE_COMPONENT = "component/UPDATE_COMPONENT";
const DELETE_COMPONENT = "component/DELETE_COMPONENT";

// Action creators
const getComponent = (component) => ({ type: GET_COMPONENT, component });
const getComponents = (components) => ({ type: GET_COMPONENTS, components });
const addComponent = (component) => ({ type: ADD_COMPONENT, component });
const updateComponent = (component) => ({ type: UPDATE_COMPONENT, component });
const deleteComponent = (componentId) => ({
  type: DELETE_COMPONENT,
  componentId,
});

// Thunks
export const getComponentThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/components/${id}`);
    const component = await response.json();
    dispatch(getComponent(component));
    return component;
  } catch (err) {
    console.error(err);
  }
};

export const getComponentsThunk = () => async (dispatch) => {
  const response = await fetch('/api/components/')
  if(response.ok){
    const data = await response.json()
    dispatch(getComponents(data))
    return data
  }
  // try {
  //   const response = await fetch("/api/components/");
  //   const components = await response.json();
  //   dispatch(getComponents(components));
  // } catch (err) {
  //   console.error(err);
  // }
};

export const addComponentThunk = (component) => async (dispatch) => {
  const res = await fetch("/api/components", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(component),
  });

  if (res.ok) {
    const newComponent = await res.json();
    dispatch(addComponent(newComponent));
    return newComponent;
  }
};

export const updateComponentThunk = (component) => async (dispatch) => {
  const res = await fetch(`/api/components/${component.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(component),
  });

  if (res.ok) {
    const updatedComponent = await res.json();
    dispatch(updateComponent(updatedComponent));
    return updatedComponent;
  }
};

export const deleteComponentThunk = (componentId) => async (dispatch) => {
  const res = await fetch(`/api/components/${componentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteComponent(componentId));
  }
};

// Initial state
const initialState = {};

// Reducer
const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPONENT:
      return action.component;

    case GET_COMPONENTS:{
      const newState = {...state}
      console.log(action.components)
      action.components.forEach(component => {
        newState[component.id] = component
      })
      return newState
    }
      // return action.components;
    case ADD_COMPONENT:
      return { ...state, components: [...state.components, action.component] };
    case UPDATE_COMPONENT:
      return {
        ...state,
        components: state.components.map((component) =>
          component.id === action.component.id ? action.component : component
        ),
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.componentId
        ),
      };
    default:
      return state;
  }
};

export default componentReducer;
