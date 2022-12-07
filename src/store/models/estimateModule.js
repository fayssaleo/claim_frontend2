import CustomizedAxios from "../../plugins/axios";

const estimateModule = {
  state: {
    estimates: [],
  },
  mutations: {
    SET_ESTIMATES(state, estimates) {
      state.estimates = estimates;
    },
    ADD_ESTIMATE(state, estimate) {
      state.estimates.push(estimate);
    },
    DELETE_ESTIMATE(state, estimate) {
      state.estimates = state.estimates.filter((c) => c.estimate.id != estimate.estimate.id);
    },
    EDIT_ESTIMATE(state, estimate) {
      console.info('estimate', estimate);
      state.estimates = state.estimates.map((c) => {
        if (c.estimate.id == estimate.estimate.id) return estimate;
        return c;
      });
    },
  },
  actions: {
  
     
    setestimatesEquipmentAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexEquipment/"+id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesAutomobileAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexAutomobile/"+id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesVesselAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexVessel/"+id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesContainerAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexContainer/"+id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/create", estimate)
          .then((response) => {
            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/delete", estimate)
          .then((response) => {
            commit("DELETE_ESTIMATE", estimate);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/update", estimate.estimate)
          .then((response) => {
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
        });
      });
    },
    addFileAction({ commit }, fileModel) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/file/Addfile",fileModel)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteFileAction({ commit }, fileModel) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("estimates/file/delete",fileModel)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

  },
  getters: {
    getestimates: (state) => {
      return state.estimates;
    },
  },
};
export default estimateModule;
