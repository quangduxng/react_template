import API_ENDPOINT from "../constants/endpoints";
import API from "./api";

export const getListWorkspace = async (id) => {
   try {
      return API.get(id ? `${API_ENDPOINT.GET_WORKSPACE_BY_ADMIN}/${id}` :API_ENDPOINT.GET_WORKSPACE);
   } catch (e) {
      console.log("error get list workspace", e);
   }
};

export const cancelWorkspace = async (id) => {
   try {
      return API.patch(
         `${API_ENDPOINT.CANCEL_WORKSPACE}/${id}`
      )
   } catch (e) {
      console.log("error cancel workspace", e)
   }
}

export const deleteWorkspace = async (id) => {
   try {
      return API.delete(
         `${API_ENDPOINT.DELETE_WORKSPACE}/${id}`
      )
   } catch (e) {
      console.log("error delete workspace", e)
   }
}

export const restartWorkspace = async (id) => {
   try {
      return API.post(
         `${API_ENDPOINT.RESTART_WORKSPACE}/${id}`
      )
   } catch (e) {
      console.log("error restart workspace", e)
   }
};

export const getWorkspaceDetail = async (id) => {
   try {
      return API.get(
         `${API_ENDPOINT.GET_WORKSPACE}/${id}`
      )
   } catch (e) {
      console.log("error get workspace detail", e)
   }
};

export const updateWorkspaceDetail = async (id, params) => {
   try {
      return API.patch(
         `${API_ENDPOINT.GET_WORKSPACE}/${id}`, params
      )
   } catch (e) {
      console.log("error update workspace detail", e)
   }
};

export const changePlanWorkspace = async (id, params) => {
   try {
      return API.patch(
         `${API_ENDPOINT.CHANGE_PLAN_WORKSPACE}/${id}`, params
      )
   } catch (e) {
      console.log("error change plan workspace", e)
   }
};
export const changeStatusWorkspace = async (id, params) => {
   try {
      return API.patch(
         `${API_ENDPOINT.CHANGE_STATUS_WORKSPACE}/${id}`, params
      )
   } catch (e) {
      console.log("error change status workspace", e)
   }
};

export const registerSaas = async (params) => {
   try {
      return API.post(
         API_ENDPOINT.GET_WORKSPACE, params
      )
   } catch (e) {
      console.log("error create workspace", e)
   }
};

export const createWorkspaceSetting = async (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.GET_WORKSPACE_SETTING}`, params
      )
   } catch (e) {
      console.log("error create workspace", e)
   }
}

export const getWorkspaceSettingsById = async (id) => {
   try {
      return API.get(
         `${API_ENDPOINT.GET_WORKSPACE_SETTING}${id ? `/${id}` : ''}`
      )
   } catch (e) {
      console.log("error get workspace by id", e)
   }
}

export const saveWorkspaceSettings = async (params) => {
   try {
      return API.patch(
         `${API_ENDPOINT.SAVE_WORKSPACE_SETTING}`, params
      )
   } catch (e) {
      console.log("error save workspace", e)
   }
}

export const syncWorkspaceSettings = async (id) => {
   // uncomment when fixed
   try {
      return API.delete(
         `${API_ENDPOINT.DELETE_WORKSPACE}/${id}`
      )
   } catch (e) {
      console.log("error delete workspace", e)
   }
}

export const deleteWorkspaceSetting = async (id) => {
   try {
      return API.delete(
         `${API_ENDPOINT.DELETE_WORKSPACE_SETTING}/${id}`
      )
   } catch (e) {
      console.log("error delete workspace setting", e)
   }
}