import CustomizedAxios from "../../plugins/axios";

const estimateModule = {
  state: {
    estimates: [],
    customedFields:[],
  },
  mutations: {
    SET_ESTIMATES(state, estimates) {
      state.estimates = estimates;
    },
    SET_CUSTOMEDFIELDS(state, customedFields) {
      state.customedFields = customedFields;
    },
    ADD_ESTIMATE(state, estimate) {
      state.estimates.push(estimate);
    },
    DELETE_ESTIMATE(state, estimate) {
      state.estimates = state.estimates.filter(
        (c) => c.estimate.id != estimate.estimate.id
      );
    },
    EDIT_ESTIMATE(state, estimate) {
      console.info("estimate", estimate);
      state.estimates = state.estimates.map((c) => {
        if (c.estimate.id == estimate.estimate.id) return estimate;
        return c;
      });
    },
  },
  actions: {
    setCustomedFieldByEstimateAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/CustomedField/" + id)
          .then((response) => {
            commit("SET_CUSTOMEDFIELDS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesEquipmentAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexEquipment/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesAutomobileAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexAutomobile/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesVesselAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexVessel/" + id)
          .then((response) => {
            commit("SET_ESTIMATES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setestimatesContainerAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("estimates/indexContainer/" + id)
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
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("equipment_id", estimate.equipment_id);
        estimateFormData.append("file", estimate.file);
        estimateFormData.append("equipment_id", estimate.equipment_id);
        if (estimate.customedFields.length > 0) {
          console.warn("tag", "ccccc add");
          var i = 0;

          estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateContainerAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("container_id", estimate.container_id);
        estimateFormData.append("file", estimate.file);
        if (estimate.customedFields.length > 0) {
          console.warn("tag", "ccccc add");
          var i = 0;

          estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateAutomobileAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("automobile_id", estimate.automobile_id);
        estimateFormData.append("file", estimate.file);
        if (estimate.customedFields.length > 0) {
          console.warn("tag", "ccccc add");
          var i = 0;

          estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

            commit("ADD_ESTIMATE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addestimateVesselAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append(
          "temporary_or_permanent",
          estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.currency_estimate
        );
        estimateFormData.append("vessel_id", estimate.vessel_id);
        estimateFormData.append("file", estimate.file);
        if (estimate.customedFields.length > 0) {
          console.warn("tag", "ccccc add");
          var i = 0;

          estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }

        CustomizedAxios.post("estimates/create", estimateFormData)
          .then((response) => {
            estimateFormData = null;

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
        CustomizedAxios.post("estimates/delete", estimate.estimate)
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
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("equipment_id", estimate.estimate.equipment_id);

        estimateFormData.append("file", estimate.estimate.file);
        if (estimate.estimate.customedFields.length > 0) {
          var i = 0;
          estimate.estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          console.warn("tag", "ccccc edite");

          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateContainerAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("container_id", estimate.estimate.container_id);

        estimateFormData.append("file", estimate.estimate.file);
        if (estimate.estimate.customedFields.length > 0) {
          var i = 0;
          estimate.estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          console.warn("tag", "ccccc edite");

          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/container", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateAutomobileAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("automobile_id", estimate.estimate.automobile_id);

        estimateFormData.append("file", estimate.estimate.file);
        if (estimate.estimate.customedFields.length > 0) {
          var i = 0;
          estimate.estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          console.warn("tag", "ccccc edite");

          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/automobile", estimateFormData)
          .then((response) => {
            estimateFormData = null;
            commit("EDIT_ESTIMATE", estimate);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editestimateVesselAction({ commit }, estimate) {
      return new Promise((resolve, reject) => {
        var estimateFormData = new FormData();

        estimateFormData.append("id", estimate.estimate.id);
        estimateFormData.append(
          "temporary_or_permanent",
          estimate.estimate.temporary_or_permanent
        );
        estimateFormData.append(
          "equipment_purchase_costs",
          estimate.estimate.equipment_purchase_costs
        );
        estimateFormData.append(
          "installation_and_facilities_costs",
          estimate.estimate.installation_and_facilities_costs
        );
        estimateFormData.append(
          "rransportation_costs",
          estimate.estimate.rransportation_costs
        );
        estimateFormData.append(
          "currency_estimate",
          estimate.estimate.currency_estimate
        );
        estimateFormData.append("vessel_id", estimate.estimate.vessel_id);

        estimateFormData.append("file", estimate.estimate.file);
        if (estimate.estimate.customedFields.length > 0) {
          var i = 0;
          estimate.estimate.customedFields.map((customedField) => {
            estimateFormData.append(
              `customedFields[${i}][id]`,
              customedField.id
            );
            estimateFormData.append(
              `customedFields[${i}][name]`,
              customedField.name
            );
            estimateFormData.append(
              `customedFields[${i}][value]`,
              customedField.value
            );
            i++;
          });
        }
        if (estimate.deleteInputs.length > 0) {
          console.warn("tag", "ccccc edite");

          var i = 0;
          estimate.deleteInputs.map((deleteInput) => {
            estimateFormData.append(`deleteInputs[${i}][id]`, deleteInput.id);
            estimateFormData.append(
              `deleteInputs[${i}][name]`,
              deleteInput.name
            );
            estimateFormData.append(
              `deleteInputs[${i}][value]`,
              deleteInput.value
            );
            i++;
          });
        }
        CustomizedAxios.post("estimates/update/vessel", estimateFormData)
          .then((response) => {
            estimateFormData = null;
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
        CustomizedAxios.post("estimates/file/Addfile", fileModel)
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
        CustomizedAxios.post("estimates/file/delete", fileModel)
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
    getcustomedFields: (state) => {
      return state.customedFields;
    },
  },
};
export default estimateModule;
