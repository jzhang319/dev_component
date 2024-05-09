// Action types
const GET_COMPONENT = "component/GET_COMPONENT";
const GET_USER_COMPONENTS = "component/GET_USER_COMPONENTS";
const GET_COMPONENTS = "component/GET_COMPONENTS";
const ADD_COMPONENT = "component/ADD_COMPONENT";
const UPDATE_COMPONENT = "component/UPDATE_COMPONENT";
const DELETE_COMPONENT = "component/DELETE_COMPONENT";

// Action creators
const getComponent = (component) => ({ type: GET_COMPONENT, component });
const getUserComponents = (components) => ({
  type: GET_USER_COMPONENTS,
  components,
});
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

export const getUserComponentsThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/components/user`);
    if (response.ok) {
      const data = await response.json();
      dispatch(getUserComponents(data));
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getComponentsThunk = () => async (dispatch) => {
  const response = await fetch("/api/components/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getComponents(data));
    return data;
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

export const clearComponents = () => ({
  type: "CLEAR_COMPONENTS",
});

// Initial state
const initialState = {};

// Reducer
const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPONENT:
      return { ...state, ...action.component };

    case GET_USER_COMPONENTS:
      return { ...state, ...action.components };

    case GET_COMPONENTS: {
      const newState = { ...state };
      // console.log(action.components);
      action.components.forEach((component) => {
        newState[component.id] = component;
      });
      return newState;
    }

    case ADD_COMPONENT:
      return { ...state, [action.component.id]: action.component };

    case UPDATE_COMPONENT:
      return { ...state, [action.component.id]: action.component };

    case DELETE_COMPONENT: {
      const newState = { ...state };
      delete newState[action.componentId];
      return newState;
    }

    case "CLEAR_COMPONENTS":
      return {};

    default:
      return state;
  }
};

export default componentReducer;
