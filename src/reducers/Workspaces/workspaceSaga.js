import { notification } from "antd"
import moment from 'moment';
import { put, select, takeLatest } from "redux-saga/effects"
import { rolesUser } from "../../constants/DataWorkspace"
import { SCREEN_NAME } from "../../constants/screens"
import {
   cancelWorkspace,
   changePlanWorkspace,
   changeStatusWorkspace,
   createWorkspaceSetting,
   deleteWorkspace,
   deleteWorkspaceSetting,
   getListWorkspace,
   getWorkspaceDetail,
   getWorkspaceSettingsById,
   registerSaas,
   restartWorkspace,
   saveWorkspaceSettings,
   syncWorkspaceSettings,
   updateWorkspaceDetail,
} from "../../services/workspace"
import { getUserId } from "../../utils/token"
import { workspaceActions } from "./workspaceSlice"

function* getListWorkspaceSaga(action) {
   const byAdmin = action.payload?.byAdmin
   try {
      const response = yield getListWorkspace(byAdmin)
      // console.log("function*getListWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         const data = JSON.parse(JSON.stringify(response.data.data))
         data.sort((a, b) => moment(b.created_at).unix() - moment(a.created_at).unix())
         yield put(
            workspaceActions.getListWorkspaceSuccess(data)
         )
      }
   } catch (e) {
      console.log("function*getListWorkspaceSaga ~ e", e)
   }
}

function* cancelWorkspaceSaga(action) {
   const { id, callback } = action.payload
   try {
      const response = yield cancelWorkspace(id)
      // console.log("function*cancelWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.cancelWorkspaceSuccess())
         yield put(workspaceActions.getListWorkspace())
         notification.success({
            message: "Cancel workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*cancelWorkspaceSaga ~ e", e)
      yield put(workspaceActions.cancelWorkspaceError())
      notification.error({
         message: "Error when cancel workspace",
         description: e?.message,
         duration: 3,
      })
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* restartWorkspaceSaga(action) {
   const { id, callback } = action.payload
   try {
      const response = yield restartWorkspace(id)
      // console.log("function*restartWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.restartWorkspaceSuccess())
         notification.success({
            message: "Restart workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*restartWorkspaceSaga ~ e", e)
      yield put(workspaceActions.restartWorkspaceError())
      notification.error({
         message: "Error when restart workspace",
         description: e?.message,
         duration: 3,
      })
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* getWorkspaceDetailSaga(action) {
   const { id } = action.payload
   try {
      const response = yield getWorkspaceDetail(id)
      // console.log("function*getWorkspaceDetailSaga ~ response", response)
      if (response?.data?.status) {
         yield put(
            workspaceActions.getWorkspaceDetailSuccess(response?.data?.data)
         )
      }
   } catch (e) {
      console.log("function*getWorkspaceDetailSaga ~ e", e)
      yield put(workspaceActions.getWorkspaceDetailError())
      notification.error({
         message: "Error when get workspace detail",
         description: e?.message,
         duration: 3,
      })
   }
}

function* updateWorkspaceDetailSaga(action) {
   const { id, params, message, callback } = action.payload
   try {
      const response = yield updateWorkspaceDetail(id, params)
      // console.log("function*updateWorkspaceDetailSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.updateWorkspaceDetailSuccess())
         notification.success({
            message: message || "Update workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*updateWorkspaceDetailSaga ~ e", e)
      yield put(workspaceActions.updateWorkspaceDetailError())
      notification.error({
         message: "Error when update workspace",
         description: e?.message,
         duration: 3,
      })
   } finally {
      callback && callback()
   }
}

function* registerSaasSaga(action) {
   const { history, params, callback, isGetWorkspace, isNotShowNotify } = action.payload
   const user = yield select((store) => store.auth.user)
   try {
      const response = yield registerSaas(params)
      // console.log("function*registerSaasSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.registerSaasSuccess())
         if (callback) {
            callback(response?.data?.data?.id)
            if (isGetWorkspace) {
               if (user?.role === rolesUser.customer) {
                  yield put(
                     workspaceActions.getListWorkspace({
                        byAdmin: getUserId(),
                     })
                  )
               } else {
                  yield put(workspaceActions.getListWorkspace())
               }
            }
            // history &&
            // history.push(SCREEN_NAME.SUCCESS_REGISTER_SAAS, {
            //    email: params.organization_email,
            // })
            if (!isNotShowNotify) {
               notification.success({
                  message: "Create workspace successfully",
                  duration: 3,
               })
            } 
         }
      }
   } catch (e) {
      console.log("function*registerSaasSaga ~ e", e)
      yield put(workspaceActions.registerSaasError())
      notification.error({
         message: "Error when register saas",
         description: e?.message,
         duration: 3,
      })
   }
}

function* changePlanWorkspaceSaga(action) {
   const { params, callback, id } = action.payload
   try {
      // change plan
      const response = yield changePlanWorkspace(id, params)
      // console.log("function*restartWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.changePlanWorkspaceSuccess())
         if (callback) {
            callback()
         }
         yield put(workspaceActions.getListWorkspace())
         notification.success({
            message: "Change plan workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*changePlanWorkspaceSaga ~ e", e)
      yield put(workspaceActions.changePlanWorkspaceError())
      notification.error({
         message: "Error when change plan workspace",
         description: e?.message,
         duration: 3,
      })
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* toggleActiveWorkspaceSaga(action) {
   const { params, callback, id } = action.payload
   try {
      // toggle active
      const response = yield changeStatusWorkspace(id, params)

      if (response?.data?.status) {
         yield put(workspaceActions.toggleActiveWorkspaceSuccess())
         notification.success({
            message: `${
               params.isActive ? "Activate" : "Deactivate"
            } workspace successfully`,
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*toggleActiveWorkspaceSaga ~ e", e)
      yield put(workspaceActions.toggleActiveWorkspaceError())
      notification.error({
         message: `Error when ${
            params.isActive ? "activate" : "deactivate"
         } workspace`,
         description: e?.message,
         duration: 3,
      })
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* deleteWorkspaceSaga(action) {
   const { id, callback } = action.payload
   const user = yield select((store) => store.auth.user)
   try {
      const response = yield deleteWorkspace(id)
      // console.log("function*deleteWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.deleteWorkspaceSuccess())
         if (user.role === rolesUser.customer) {
            yield put(
               workspaceActions.getListWorkspace({
                  byAdmin: getUserId(),
               })
            )
         } else {
            yield put(workspaceActions.getListWorkspace())
         }
         notification.success({
            message: "Delete workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*deleteWorkspaceSaga ~ e", e.message)
      notification.error({
         message: "Error when delete workspace",
         duration: 3,
      })
      yield put(workspaceActions.deleteWorkspaceError())
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* createWorkspaceSettingSaga(action) {
   const { group, name, description, key, value, callback } = action.payload
   try {
      const response = yield createWorkspaceSetting({
         group,
         name,
         description,
         key,
         value,
      })
      if (response?.data?.status) {
         yield put(workspaceActions.getListWorkspaceSuccess(response.data.data))
         yield put(workspaceActions.getWorkspaceSetting())
         notification.success({
            message: "Create workspace setting successfully",
            duration: 3,
         })
         if (callback) {
            callback()
         }
      }
   } catch (e) {
      console.log("function*createWorkspaceSettingSaga ~ e", e)
      notification.error({
         message: "Error when create workspace setting",
         description: e?.message,
         duration: 3,
      })
      yield put(workspaceActions.createWorkspaceSettingError())
   }
}

function* getWorkspaceSettingsSaga(action) {
   const id = action.payload?.id
   try {
      const response = yield getWorkspaceSettingsById(id)
      console.log("function*getWorkspaceSettingsSaga ~ response", response)
      if (response?.data?.status) {
         yield put(
            workspaceActions.getWorkspaceSettingSuccess(response.data.data)
         )
      }
   } catch (e) {
      console.log("function*getWorkspaceSettingsSaga ~ e", e)
      notification.error({
         message: "Error when get list setting",
         description: e?.message,
         duration: 3,
      })
      yield put(workspaceActions.getWorkspaceSettingError())
   }
}

function* saveWorkspaceSettingsSaga(action) {
   const { listData } = action.payload
   try {
      const response = yield saveWorkspaceSettings(listData)
      if (response?.data?.status) {
         yield put(workspaceActions.saveWorkspaceSettingsSuccess())
         yield put(workspaceActions.getWorkspaceSetting())
         notification.success({
            message: "Save workspace settings successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*saveWorkspaceSettingsSaga ~ e", e)
      notification.error({
         message: "Error when save workspace setting",
         description: e?.message,
         duration: 3,
      })
      yield put(workspaceActions.saveWorkspaceSettingsError())
   }
}
function* syncWorkspaceSettingsSaga() {
   try {
      // const response = yield syncWorkspaceSettings(id)
      // // console.log("function*deleteWorkspaceSaga ~ response", response)
      // if (response?.data?.status) {
      //    yield put(workspaceActions.deleteWorkspaceSuccess())
      //    if (user.role === rolesUser.customer) {
      //       yield put(
      //          workspaceActions.getListWorkspace({
      //             byAdmin: getUserId(),
      //          })
      //       )
      //    } else {
      //       yield put(workspaceActions.getListWorkspace())
      //    }
      //    notification.success({
      //       message: "Delete workspace successfully",
      //       duration: 3,
      //    })
      // }
   } catch (e) {
      // console.log("function*deleteWorkspaceSaga ~ e", e.message)
      // notification.error({
      //    message: "Error when delete workspace",
      //    duration: 3,
      // })
      // yield put(workspaceActions.deleteWorkspaceError())
   } finally {
      // if (callback) {
      //    callback()
      // }
   }
}

function* deleteWorkspaceSettingSaga(action) {
   const { id, callback } = action.payload
   try {
      const response = yield deleteWorkspaceSetting(id)
      // console.log("function*deleteWorkspaceSaga ~ response", response)
      if (response?.data?.status) {
         yield put(workspaceActions.deleteWorkspaceSettingSuccess())
         yield put(workspaceActions.getWorkspaceSetting())
         notification.success({
            message: "Delete workspace successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*deleteWorkspaceSettingSaga ~ e", e)
      notification.error({
         message: "Error when delete workspace setting",
         description: e?.message,
         duration: 3,
      })
      yield put(workspaceActions.deleteWorkspaceSettingError())
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* getStatusCreateWorkspaceSaga(action) {
   const currentInitializingWorkspace = yield select(store => store.workspace.currentInitializingWorkspace)
   const {id} = currentInitializingWorkspace 
   try {
      if (id) {
         const response = yield getWorkspaceDetail(id)
         if (response?.data?.status) {
            yield put(
               workspaceActions.setCurrentInitalizingWorkspace({
                  id: response?.data?.data?.id,
                  status: response?.data?.data?.status
               })
            )
         }
      }
   } catch (e) {
      console.log('Error get status create workspace ~ e:', e);
      yield put(
         workspaceActions.setCurrentInitalizingWorkspace({
            id: null,
            status: null
         })
      )
   }
}

export default function* WorkspaceSaga() {
   yield takeLatest(workspaceActions.getListWorkspace, getListWorkspaceSaga)
   yield takeLatest(workspaceActions.cancelWorkspace, cancelWorkspaceSaga)
   yield takeLatest(workspaceActions.restartWorkspace, restartWorkspaceSaga)
   yield takeLatest(
      workspaceActions.changePlanWorkspace,
      changePlanWorkspaceSaga
   )
   yield takeLatest(
      workspaceActions.toggleActiveWorkspace,
      toggleActiveWorkspaceSaga
   )
   yield takeLatest(workspaceActions.deleteWorkspace, deleteWorkspaceSaga)
   yield takeLatest(workspaceActions.getWorkspaceDetail, getWorkspaceDetailSaga)
   yield takeLatest(
      workspaceActions.updateWorkspaceDetail,
      updateWorkspaceDetailSaga
   )
   yield takeLatest(workspaceActions.registerSaas, registerSaasSaga)
   yield takeLatest(
      workspaceActions.createWorkspaceSetting,
      createWorkspaceSettingSaga
   )
   yield takeLatest(
      workspaceActions.getWorkspaceSetting,
      getWorkspaceSettingsSaga
   )
   yield takeLatest(
      workspaceActions.saveWorkspaceSettings,
      saveWorkspaceSettingsSaga
   )
   yield takeLatest(
      workspaceActions.syncWorkspaceSettings,
      syncWorkspaceSettingsSaga
   )
   yield takeLatest(
      workspaceActions.deleteWorkspaceSetting,
      deleteWorkspaceSettingSaga
   )
   yield takeLatest(
      workspaceActions.getStatusCreateWorkspace,
      getStatusCreateWorkspaceSaga
   )
}
