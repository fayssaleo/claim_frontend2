import CustomizedAxios from "../../plugins/axios";

import { toLaravelDatetime, NullTest } from "@/helpers/helpers";

const claimsModule = {
  state: {
    claims: [],
    editedOrSavedclaim: {
      id: 0,
      status: "",
      incident_date: "",
      claim_date: "",
      ClaimOrIncident: "",
      incident_report: null,
      incident_reportFile: null,
    },
  },
  mutations: {
    SET_CLAiMS(state, claims) {
      state.claims = claims;
    },
    ADD_CLAiM(state, claim) {
      state.claims.push(claim);
      state.editedOrSavedclaim.id = claim.id;
      state.editedOrSavedclaim.incident_report = claim.incident_report;
    },
    DELETE_CLAiM(state, id) {
      state.claims = state.claims.filter((c) => c.id != id);
    },
    EDIT_CLAiM(state, claims) {
      state.claims = state.claims.map((c) => {
        if (c.id == claims.id) return claims;
        return c;
      });
    },
    set_attr_ClaimOrIncident_CLAiM(state, ClaimOrIncident) {
      let incident_date = state.editClaimAction.incident_date;
      state.editedOrSavedclaim.ClaimOrIncident.id = ClaimOrIncident.id;
      state.editedOrSavedclaim.ClaimOrIncident.status = ClaimOrIncident.status;
      state.editedOrSavedclaim.ClaimOrIncident.claim_date =
        ClaimOrIncident.claim_date;
      state.editedOrSavedclaim.ClaimOrIncident.ClaimOrIncident =
        ClaimOrIncident.ClaimOrIncident;
    },
    set_attr_without_CLAiM(state, claim) {
      state.editedOrSavedclaim.id = claim.id;
      state.editedOrSavedclaim.status = claim.status;
      state.editedOrSavedclaim.incident_date = claim.incident_date;
      state.editedOrSavedclaim.claim_date = claim.claim_date;
      state.editedOrSavedclaim.incident_reportFile = claim.incident_reportFile;
      state.editedOrSavedclaim.incident_report = claim.incident_report;
    },
    set_attr_CLAiM(state, claim) {
      state.editedOrSavedclaim.id = claim.id;
      state.editedOrSavedclaim.status = claim.status;
      state.editedOrSavedclaim.incident_date = claim.incident_date;
      state.editedOrSavedclaim.claim_date = claim.claim_date;
      state.editedOrSavedclaim.ClaimOrIncident = claim.ClaimOrIncident;
      state.editedOrSavedclaim.incident_reportFile = claim.incident_reportFile;
      state.editedOrSavedclaim.incident_report = claim.incident_report;
    },
    empty_attr_CLAiM(state, claim) {
      state.editedOrSavedclaim.id = 0;
      state.editedOrSavedclaim.status = "";
      state.editedOrSavedclaim.incident_date = "";
      state.editedOrSavedclaim.claim_date = "";
      state.editedOrSavedclaim.ClaimOrIncident = "";
      state.editedOrSavedclaim.incident_report = null;
      state.editedOrSavedclaim.incident_reportFile = null;
    },
  },
  actions: {
    setindexClaimsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("claims/indexClaims")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);
            console.log("set claims");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setindexIncidentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("claims/indexIncidents")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);
            console.log("set claims");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("id", claim.id);
        claimFormData.append(
          "incident_date",
          toLaravelDatetime(claim.incident_date)
        );
        claimFormData.append("claim_date", toLaravelDatetime(claim.claim_date));
        claimFormData.append(
          "ClaimOrIncident",
          NullTest(claim.ClaimOrIncident)
        );
        claimFormData.append("status", NullTest(claim.status));
        claimFormData.append(
          "incident_report",
          NullTest(claim.incident_report)
        );
        claimFormData.append(
          "incident_reportFile",
          NullTest(claim.incident_reportFile)
        );

        CustomizedAxios.post("claims/create", claimFormData)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("claims/delete", claim)
          .then((response) => {
            commit("DELETE_CLAiM", claim.id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("id", claim.id);
        claimFormData.append(
          "incident_date",
          toLaravelDatetime(claim.incident_date)
        );
        claimFormData.append("claim_date", toLaravelDatetime(claim.claim_date));
        claimFormData.append(
          "ClaimOrIncident",
          NullTest(claim.ClaimOrIncident)
        );
        claimFormData.append(
          "incident_report",
          NullTest(claim.incident_report)
        );
        claimFormData.append(
          "incident_reportFile",
          NullTest(claim.incident_reportFile)
        );
        CustomizedAxios.post("claim/update", claimFormData)
          .then((response) => {
            commit("EDIT_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    closedClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("claims/closed", claim)
          .then((response) => {
            commit("EDIT_CLAiM", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    treatedClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("claims/treated", claim)
          .then((response) => {
            commit("EDIT_CLAiM", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    set_attr_ClaimOrIncident_CLAiMAction({ commit }, ClaimOrIncident) {
      commit("set_attr_ClaimOrIncident_CLAiM", ClaimOrIncident);
    },
    set_attr_without_CLAiMAction({ commit }, claim) {
      commit("set_attr_without_CLAiM", claim);
    },
    set_attr_CLAiMAction({ commit }, claim) {
      commit("set_attr_CLAiM", claim);
    },
    empty_attr_CLAiMAction({ commit }) {
      commit("empty_attr_CLAiM");
    },
  },
  getters: {
    getclaims: (state) => {
      return state.claims;
    },
    geteditedOrSavedclaim: (state) => {
      return state.editedOrSavedclaim;
    },
  },
};
export default claimsModule;
