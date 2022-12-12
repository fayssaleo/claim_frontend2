import { toLaravelDatetime } from "@/helpers/helpers";
import CustomizedAxios from "../../plugins/axios";

const claimsEquipmentModule = {
  state: {
    claims: [],
    editedOrSavedClaimEquipment: {
      id: 0,
      status: "",
      incident_date: "",
      claim_date: "",
      ClaimOrIncident: "",
      categorie_of_equipment: "",
      concerned_internal_department: "",
      equipement_registration: "",
      cause_damage: "",
      Liability_letter_number: "",
      amount: null,
      currency: "",
      comment_third_party: "",
      reinvoiced: "",
      currency_Insurance: "",
      Invoice_number: null,
      date_of_reimbursement: "",
      reimbursed_amount: null,
      date_of_declaration: null,
      date_of_feedback: null,
      comment_Insurance: null,
      Indemnification_of_insurer: "",
      currency_indemnisation: "",
      deductible_charge_TAT: 5000,
      damage_caused_by: "",
      TAT_name_persons: null,
      outsourcer_company_name: null,
      thirdparty_company_name: null,
      thirdparty_Activity_comments: null,
      categorie_of_equipment: "",
      incedent_report: null,
      liability_letter: null,
      insurance_declaration: null,
      type_of_equipment: {
        id: 0,
        name: "",
      },
      brand: {
        id: 0,
        name: "",
      },
      nature_of_damage: {
        id: 0,
        name: "",
      },
      department: [],
      estimate: [],
    },
  },
  mutations: {
    SET_CLAiMS(state, claims) {
      for (let index = 0; index < claims.length; index++) {
        if (claims[index].brand == null) {
          claims[index].brand = { id: 0, name: "" };
        }
        if (claims[index].nature_of_damage == null) {
          claims[index].nature_of_damage = { id: 0, name: "" };
        }
        if (claims[index].type_of_equipment == null) {
          claims[index].type_of_equipment = { id: 0, name: "" };
        }
      }
      state.claims = claims;
    },
    ADD_CLAiM(state, claim) {
      state.claims.push(claim);
    },
    DELETE_CLAiM(state, claim) {
      state.claims = state.claims.filter((c) => c.id != claim.id);
    },
    EDIT_CLAiM(state, claims) {
      state.claims = state.claims.map((c) => {
        if (c.id == claims.id) return claims;
        return c;
      });
    },
    setClaimOrIncident_EQUIPMENT_CLAiM(state, ClaimOrIncident) {
      state.editedOrSavedClaimEquipment.ClaimOrIncident = ClaimOrIncident;
    },
    setEQUIPMENT_CLAiM(state, equipment) {
      state.editedOrSavedClaimEquipment.type_of_equipment.id =
        equipment.type_of_equipment.id;
      state.editedOrSavedClaimEquipment.type_of_equipment.name =
        equipment.type_of_equipment.name;

      state.editedOrSavedClaimEquipment.brand.id = equipment.brand.id;
      state.editedOrSavedClaimEquipment.brand.name = equipment.brand.name;

      state.editedOrSavedClaimEquipment.categorie_of_equipment =
        equipment.categorie_of_equipment;
      state.editedOrSavedClaimEquipment.equipement_registration =
        equipment.equipement_registration;

      state.editedOrSavedClaimEquipment.nature_of_damage.id =
        equipment.nature_of_damage.id;
      state.editedOrSavedClaimEquipment.nature_of_damage.name =
        equipment.nature_of_damage.name;
      state.editedOrSavedClaimEquipment.cause_damage = equipment.cause_damage;
      // state.editedOrSavedClaimEquipment.department.id = equipment.department.id;
      state.editedOrSavedClaimEquipment.damage_caused_by =
        equipment.damage_caused_by;
    },
    setDATE_EQUIPMENT_CLAiM(state, dateClaim) {
      state.editedOrSavedClaimEquipment.incident_date = dateClaim.incident_date;
      state.editedOrSavedClaimEquipment.claim_date = dateClaim.claim_date;
      state.editedOrSavedClaimEquipment.incedent_report =
        dateClaim.incedent_report;
    },
    setTHIRDPARTY_EQUIPMENT_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimEquipment.amount = thirdpartyClaim.amount;
      state.editedOrSavedClaimEquipment.currency = thirdpartyClaim.currency;
      state.editedOrSavedClaimEquipment.comment_third_party =
        thirdpartyClaim.comment_third_party;
      state.editedOrSavedClaimEquipment.reinvoiced = thirdpartyClaim.reinvoiced;
      state.editedOrSavedClaimEquipment.date_of_reimbursement =
        thirdpartyClaim.date_of_reimbursement;
      state.editedOrSavedClaimEquipment.Invoice_number =
        thirdpartyClaim.Invoice_number;
      state.editedOrSavedClaimEquipment.reimbursed_amount =
        thirdpartyClaim.reimbursed_amount;
      state.editedOrSavedClaimEquipment.liability_letter =
        thirdpartyClaim.liability_letter;
    },
    setINSURANCE_FOLLOWUP_EQUIPMENT_CLAiM(state, insurance_followup) {
      state.editedOrSavedClaimEquipment.date_of_declaration =
        insurance_followup.date_of_declaration;
      state.editedOrSavedClaimEquipment.date_of_feedback =
        insurance_followup.date_of_feedback;
      state.editedOrSavedClaimEquipment.comment_Insurance =
        insurance_followup.comment_Insurance;
      state.editedOrSavedClaimEquipment.Indemnification_of_insurer =
        insurance_followup.Indemnification_of_insurer;
      state.editedOrSavedClaimEquipment.currency_indemnisation =
        insurance_followup.currency_indemnisation;
      state.editedOrSavedClaimEquipment.deductible_charge_TAT =
        insurance_followup.deductible_charge_TAT;
      state.editedOrSavedClaimEquipment.Complementary_indemnification =
        insurance_followup.Complementary_indemnification;
      state.editedOrSavedClaimEquipment.insurance_declaration =
        insurance_followup.insurance_declaration;
    },

    setAll_Attr_EQUIPMENT_CLAiM(state, EquipmentClaim) {
      state.editedOrSavedClaimEquipment.id = EquipmentClaim.id;
      state.editedOrSavedClaimEquipment.ClaimOrIncident =
        EquipmentClaim.ClaimOrIncident;
      state.editedOrSavedClaimEquipment.categorie_of_equipment =
        EquipmentClaim.categorie_of_equipment;
      state.editedOrSavedClaimEquipment.Deductible_charge_TAT =
        EquipmentClaim.Deductible_charge_TAT;
      state.editedOrSavedClaimEquipment.categorie_of_equipment =
        EquipmentClaim.categorie_of_equipment;
      state.editedOrSavedClaimEquipment.cause_damage =
        EquipmentClaim.cause_damage;
      state.editedOrSavedClaimEquipment.equipement_registration =
        EquipmentClaim.equipement_registration;
      state.editedOrSavedClaimEquipment.Liability_letter_number =
        EquipmentClaim.Liability_letter_number;
      state.editedOrSavedClaimEquipment.categorie_of_equipment =
        EquipmentClaim.categorie_of_equipment;
      state.editedOrSavedClaimEquipment.damage_caused_by =
        EquipmentClaim.damage_caused_by;
      state.editedOrSavedClaimEquipment.currency_Insurance =
        EquipmentClaim.currency_Insurance;
      state.editedOrSavedClaimEquipment.Complementary_indemnification =
        EquipmentClaim.Complementary_indemnification;
      // object
      state.editedOrSavedClaimEquipment.type_of_equipment.id =
        EquipmentClaim.type_of_equipment.id;
      state.editedOrSavedClaimEquipment.brand.id = EquipmentClaim.brand.id;
      state.editedOrSavedClaimEquipment.nature_of_damage.id =
        EquipmentClaim.nature_of_damage.id;
      state.editedOrSavedClaimEquipment.type_of_equipment.name =
        EquipmentClaim.type_of_equipment.name;
      state.editedOrSavedClaimEquipment.brand.name = EquipmentClaim.brand.name;
      state.editedOrSavedClaimEquipment.nature_of_damage.name =
        EquipmentClaim.nature_of_damage.name;
      //state.editedOrSavedClaimEquipment.nature_of_damage.id=EquipmentClaim.nature_of_damage.id;
      //third_party
      state.editedOrSavedClaimEquipment.comment_third_party =
        EquipmentClaim.comment_third_party;
      state.editedOrSavedClaimEquipment.thirdparty_company_name =
        EquipmentClaim.thirdparty_company_name;
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments =
        EquipmentClaim.thirdparty_Activity_comments;
      state.editedOrSavedClaimEquipment.amount = EquipmentClaim.amount;
      state.editedOrSavedClaimEquipment.currency = EquipmentClaim.currency;
      state.editedOrSavedClaimEquipment.reinvoiced = EquipmentClaim.reinvoiced;
      state.editedOrSavedClaimEquipment.Invoice_number =
        EquipmentClaim.Invoice_number;
      state.editedOrSavedClaimEquipment.reimbursed_amount =
        EquipmentClaim.reimbursed_amount;
      // estimation
      state.editedOrSavedClaimEquipment.estimate = EquipmentClaim.estimate;
      // date
      state.editedOrSavedClaimEquipment.incident_date =
        EquipmentClaim.incident_date;
      state.editedOrSavedClaimEquipment.claim_date = EquipmentClaim.claim_date;
      state.editedOrSavedClaimEquipment.date_of_declaration =
        EquipmentClaim.date_of_declaration;
      state.editedOrSavedClaimEquipment.date_of_feedback =
        EquipmentClaim.date_of_feedback;
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments =
        EquipmentClaim.thirdparty_Activity_comments;
    },
    emptyAll_Attr_EQUIPMENT_CLAiM(state) {
      state.editedOrSavedClaimEquipment.id = 0;
      state.editedOrSavedClaimEquipment.ClaimOrIncident = "";
      state.editedOrSavedClaimEquipment.categorie_of_equipment = "";
      state.editedOrSavedClaimEquipment.Deductible_charge_TAT = "";
      state.editedOrSavedClaimEquipment.categorie_of_equipment = "";
      state.editedOrSavedClaimEquipment.cause_damage = "";
      state.editedOrSavedClaimEquipment.damage_caused_by = "";
      state.editedOrSavedClaimEquipment.equipement_registration = "";
      state.editedOrSavedClaimEquipment.Liability_letter_number = "";
      state.editedOrSavedClaimEquipment.categorie_of_equipment = "";
      state.editedOrSavedClaimEquipment.currency_Insurance = "";
      state.editedOrSavedClaimEquipment.deductible_charge_TAT = 5000;
      state.editedOrSavedClaimEquipment.Complementary_indemnification = "";
      // object
      state.editedOrSavedClaimEquipment.type_of_equipment.id = 0;
      state.editedOrSavedClaimEquipment.brand.id = 0;
      state.editedOrSavedClaimEquipment.nature_of_damage.id = 0;
      state.editedOrSavedClaimEquipment.type_of_equipment.name = "";
      state.editedOrSavedClaimEquipment.brand.name = "";
      state.editedOrSavedClaimEquipment.nature_of_damage.name = "";
      state.editedOrSavedClaimEquipment.department = [];

      //third_party
      state.editedOrSavedClaimEquipment.comment_third_party = "";
      state.editedOrSavedClaimEquipment.thirdparty_company_name = "";
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimEquipment.amount = "";
      state.editedOrSavedClaimEquipment.currency = "";
      state.editedOrSavedClaimEquipment.reinvoiced = "";
      state.editedOrSavedClaimEquipment.Invoice_number = "";
      state.editedOrSavedClaimEquipment.reimbursed_amount = "";
      // estimation
      state.editedOrSavedClaimEquipment.estimate = "";

      // date
      state.editedOrSavedClaimEquipment.incident_date = "";
      state.editedOrSavedClaimEquipment.claim_date = "";
      state.editedOrSavedClaimEquipment.date_of_declaration = "";
      state.editedOrSavedClaimEquipment.date_of_feedback = "";
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments = "";
    },
  },
  actions: {
    setClaimsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("claim/")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setEquipmentsAllClaimAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/allClaim")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setEquipmentsAllIncidentAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/allIncident")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editedOrSavedEquipmentClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("id", claim.id);
        claimFormData.append("status", claim.status);
        claimFormData.append(
          "incident_date",
          toLaravelDatetime(claim.incident_date)
        );
        claimFormData.append("claim_date", toLaravelDatetime(claim.claim_date));
        claimFormData.append("ClaimOrIncident", claim.ClaimOrIncident);
        claimFormData.append(
          "categorie_of_equipment",
          claim.categorie_of_equipment
        );
        claimFormData.append(
          "concerned_internal_department",
          claim.concerned_internal_department
        );
        claimFormData.append(
          "equipement_registration",
          claim.equipement_registration
        );
        claimFormData.append("cause_damage", claim.cause_damage);
        claimFormData.append(
          "Liability_letter_number",
          claim.Liability_letter_number
        );
        claimFormData.append("amount", claim.amount);
        claimFormData.append("currency", claim.currency);
        claimFormData.append("comment_third_party", claim.comment_third_party);
        claimFormData.append("reinvoiced", claim.reinvoiced);
        claimFormData.append("currency_Insurance", claim.currency_Insurance);
        claimFormData.append("Invoice_number", claim.Invoice_number);
        claimFormData.append(
          "date_of_reimbursement",
          claim.date_of_reimbursement
        );
        claimFormData.append("reimbursed_amount", claim.reimbursed_amount);
        claimFormData.append("date_of_declaration", claim.date_of_declaration);
        claimFormData.append("date_of_feedback", claim.date_of_feedback);
        claimFormData.append("comment_Insurance", claim.comment_Insurance);
        claimFormData.append(
          "Indemnification_of_insurer",
          claim.Indemnification_of_insurer
        );
        claimFormData.append(
          "currency_indemnisation",
          claim.currency_indemnisation
        );
        claimFormData.append(
          "deductible_charge_TAT",
          claim.deductible_charge_TAT
        );
        claimFormData.append("damage_caused_by", claim.damage_caused_by);
        claimFormData.append("TAT_name_persons", claim.TAT_name_persons);
        claimFormData.append(
          "outsourcer_company_name",
          claim.outsourcer_company_name
        );
        claimFormData.append(
          "thirdparty_company_name",
          claim.thirdparty_company_name
        );
        claimFormData.append(
          "thirdparty_Activity_comments",
          claim.thirdparty_Activity_comments
        );
        claimFormData.append(
          "categorie_of_equipment",
          claim.categorie_of_equipment
        );
        claimFormData.append("incedent_report", claim.incedent_report);
        claimFormData.append("liability_letter", claim.liability_letter);
        claimFormData.append(
          "insurance_declaration",
          claim.insurance_declaration
        );
        claimFormData.append(
          "type_of_equipment[id]",
          claim.type_of_equipment.id
        );
        claimFormData.append(
          "type_of_equipment[name]",
          claim.type_of_equipment.name
        );
        claimFormData.append("brand[id]", claim.brand.id);
        claimFormData.append("brand[name]", claim.brand.name);
        claimFormData.append("nature_of_damage[id]", claim.nature_of_damage.id);
        claimFormData.append(
          "nature_of_damage[name]",
          claim.nature_of_damage.name
        );

        CustomizedAxios.post(
          "equipments/createOrUpdateEquipment",
          claimFormData
        )
          .then((response) => {
            if (claim.id == 0) {
              commit("ADD_CLAiM", response.data.payload);
            } else {
              commit("EDIT_CLAiM", response.data.payload);
            }

            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addEquipmentAction({ commit }, equipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/create", {
          name: equipment.name,
        })
          .then((response) => {
            commit("ADD_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteEquipmentClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("containers/delete", claim)
          .then((response) => {
            commit("DELETE_CLAiM", claim);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("claim/update", claim)
          .then((response) => {
            commit("EDIT_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    set_ClaimOrIncident_claim_SetterAction({ commit }, equipment) {
      commit("setClaimOrIncident_EQUIPMENT_CLAiM", equipment);
    },
    set_equipment_claim_SetterAction({ commit }, equipment) {
      commit("setEQUIPMENT_CLAiM", equipment);
    },
    set_date_claim_SetterAction({ commit }, dateClaim) {
      commit("setDATE_EQUIPMENT_CLAiM", dateClaim);
    },
    set_thirdparty_claim_SetterAction({ commit }, thirdparty) {
      commit("setTHIRDPARTY_EQUIPMENT_CLAiM", thirdparty);
    },
    set_insurance_followup_claim_SetterAction({ commit }, insurance_followup) {
      commit("setINSURANCE_FOLLOWUP_EQUIPMENT_CLAiM", insurance_followup);
    },
    setAll_Attr_EQUIPMENT_CLAiMAction({ commit }, EquipmentClaim) {
      commit("setAll_Attr_EQUIPMENT_CLAiM", EquipmentClaim);
    },
    emptyAll_Attr_EQUIPMENT_CLAiMAction({ commit }) {
      commit("emptyAll_Attr_EQUIPMENT_CLAiM");
    },
  },
  getters: {
    getEquipmentclaims: (state) => {
      return state.claims;
    },
    geteditedOrSavedClaimEquipment: (state) => {
      return state.editedOrSavedClaimEquipment;
    },
  },
};
export default claimsEquipmentModule;
