<template>
  <div style="padding: 5px; padding-top: 1%">
    <h3 class="text-uppercase">{{ createdOrEdited }} THE EQUIPMENT</h3>

    <template>
      <v-icon large class="mx-2 ma-2" color="blue darken-2" @click="back()">
        mdi-arrow-left
      </v-icon>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable :complete="e1 > 1" step="1">
            Equipment And Damage
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :editable="
              this.geteditedOrSavedClaimEquipment.damage_caused_by ==
                'Thirdparty' ||
              this.geteditedOrSavedClaimEquipment.damage_caused_by ==
                'Outsourcer'
            "
            :complete="e1 > 2"
            :class="{
              'd-none': !(
                this.geteditedOrSavedClaimEquipment.damage_caused_by ==
                  'Thirdparty' ||
                this.geteditedOrSavedClaimEquipment.damage_caused_by ==
                  'Outsourcer'
              ),
            }"
            step="2"
          >
            Third party
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable :complete="e1 > 3" step="3">
            Estimates of the claim
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="4">
            INSURANCE DECLARATION & FOLLOW UP
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <Equipment />
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="#f0f0f0cc" height="auto">
              <template>
                <Thirdparty />
              </template>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-12" color="#f0f0f0cc" height="auto">
              <template>
                <v-container fluid>
                  <Estimate />
                </v-container>
              </template>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card class="mb-12 pa-4" color="#f0f0f0cc" height="auto">
              <InsuranceFollowup />
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        <div class="d-flex">
          <v-btn v-if="e1 == 1" class="mx-4" disabled text> backward </v-btn>
          <v-btn v-else color="gray" class="mx-4" @click="stepper_backward(e1)">
            backward
          </v-btn>
          <v-btn v-if="e1 == 4" disabled text> forward </v-btn>
          <v-btn v-else color="primary" @click="stepper_forward(e1)">
            forward
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="ma-2 teal white--text" @click="editedOrSavedClaim()">
            save
          </v-btn>
          <v-btn color="ma-2 red white--text" @click="cancel()"> cancel </v-btn>
        </div>
      </v-stepper>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Estimate from "../../components/EquipmentComponents/Estimate/Estimate.vue";
import Equipment from "../../components/EquipmentComponents/EquipmentStep/Equipment.vue";
import Claimdate from "../../components/EquipmentComponents/claimDate/Claimdate.vue";
import Thirdparty from "../../components/EquipmentComponents/Thirdparty/Thirdparty.vue";
import InsuranceFollowup from "../../components/EquipmentComponents/InsuranceFollowup/InsuranceFollowup.vue";

export default {
  components: {
    Estimate,
    Equipment,
    Claimdate,
    Thirdparty,
    InsuranceFollowup,
  },
  data: () => ({
    e1: 1,
    isNewDepartment: false,
    isEditable: false,
    switch1: false,
    departmentID: "",
    modal: false,
    createdOrEdited: "Create",
  }),
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimEquipment",
      "geteditedOrSavedclaim"
    ]),
  },
  watch: {
    ClaimOrIncidentValue: {
      handler(newValue, oldvalue) {
        //this.set_ClaimOrIncident_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id === 0) {
        this.createdOrEdited = "Create";
      } else {
        this.createdOrEdited = "Edit";
      }

      this.setClaim_id_EQUIPMENT_claim_SetterAction(
        this.geteditedOrSavedclaim.id
      )
        .then(() => {
         // this.setModuleShowToFalseAction();
          //console.log("save", "save");
        })
        .catch(() => {
         // this.setModuleShowToFalseAction();
        });
      // this.ClaimOrIncident();
    },
    ...mapActions([
      "set_ClaimOrIncident_claim_SetterAction",
      "addEquipmentAction",
      "editedOrSavedEquipmentClaimAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "setClaim_id_EQUIPMENT_claim_SetterAction"
    ]),

    ClaimOrIncident() {
      /*  if (this.switch1 == false) {
        this.ClaimOrIncidentValue = "Claim";
      } else {
        this.ClaimOrIncidentValue = "Incident";
      }
      this.set_ClaimOrIncident_claim_SetterAction(
        this.ClaimOrIncidentValue
      ).then(() => {}); */
    },
    editedOrSavedClaim() {
      this.setModuleShowToTrueAction();
      this.editedOrSavedEquipmentClaimAction(
        this.geteditedOrSavedClaimEquipment
      )
        .then(() => {
          this.setModuleShowToFalseAction();
          console.log("save", "save");
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });
    },
    stepper_backward() {
      if (
        this.geteditedOrSavedClaimEquipment.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimEquipment.damage_caused_by == "Outsourcer"
      ) {
        if (this.e1 == 2) {
          this.e1 = parseInt(this.e1 + "") - 1;
        } else {
          this.e1 = parseInt(this.e1 + "") - 1;
        }
      } else {
        if (this.e1 == 3) {
          this.e1 = parseInt(this.e1 + "") - 2;
        } else {
          this.e1 = parseInt(this.e1 + "") - 1;
        }
      }
    },
    stepper_forward() {
      if (
        this.geteditedOrSavedClaimEquipment.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimEquipment.damage_caused_by == "Outsourcer"
      ) {
        if (this.e1 == 2) {
          this.e1 = parseInt(this.e1 + "") + 1;
        } else {
          this.e1 = parseInt(this.e1 + "") + 1;
        }
      } else {
        if (this.e1 == 1) {
          this.e1 = parseInt(this.e1 + "") + 2;
        } else {
          this.e1 = parseInt(this.e1 + "") + 1;
        }
      }
    },
    cancel() {
      this.$router.push({ name: "Equipment" });
    },
    back() {
      this.$router.push({ name: "CreateClaimOrIncident" });
    },
  },
};
</script>
