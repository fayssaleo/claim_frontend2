<template>
  <div>
    <v-card class="mb-12" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Vessel :
              </p></v-col
            >
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="VesselModel.shipping_line.id != 0"
            >
              <v-select
                :items="shippingLines"
                item-text="name"
                item-value="id"
                label="Shipping line :"
                dense
                outlined
                v-model="VesselModel.shipping_line.id"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex other"
              cols="6"
              sm="2"
              v-if="VesselModel.shipping_line.id == 0"
            >
              <v-select
                :items="shippingLines"
                item-text="name"
                item-value="id"
                label="Shipping line :"
                dense
                outlined
                v-model="VesselModel.shipping_line.id"
                filled
                color="primary"
              ></v-select>
            </v-col>
            <v-col
              v-if="VesselModel.shipping_line.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="Shipping line name :"
                outlined
                v-model="VesselModel.shipping_line.name"
                class="mr-2"
              ></v-text-field>
            </v-col>

            <!---------------------------------------------------------------------------------------------------------------->

            <!---------------------------------------------------------------------------------------------------------------->

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label="Vessel ID"
                outlined
                v-model="VesselModel.vessel_number"
              ></v-text-field>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Damage :
              </p></v-col
            >
            <v-col class="d-flex" cols="12" sm="12">
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="12"
                  v-if="VesselModel.nature_of_damage.id != 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="VesselModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                  v-if="VesselModel.nature_of_damage.id == 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="VesselModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                    filled
                    color="primary"
                  ></v-select>
                </v-col>
                <v-col
                  v-if="VesselModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    label="Nature of damage name :"
                    outlined
                    v-model="VesselModel.nature_of_damage.name"
                    class="mr-2"
                  ></v-text-field>
                </v-col>

                <v-col
                  v-if="VesselModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="12"
                >
                  <v-textarea
                    clearable
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Nature of damage comment"
                    v-model="VesselModel.nature_of_damage_comment"
                    value=""
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->

            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Cause :
              </p></v-col
            >
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label=" Cause of damage:"
                outlined
                v-model="VesselModel.cause_damage"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                multiple
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="VesselModel.department"
                label="Concerned internal department :"
                dense
                outlined
                @change="changedepartmentSELECT()"
              ></v-select>
              <v-text-field
                class="mx-2"
                label="Concerned internal department :"
                outlined
                v-if="isNewDepartment"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="Damage_caused_by"
                label="Damage caused by :"
                v-model="VesselModel.damage_caused_by"
                dense
                outlined
                @change="change_Damage_caused_by_SELECT()"
              ></v-select>
            </v-col>
            <v-col class="d-flex gray lighten-4 pa-6" cols="12" sm="12">
              <v-row
                v-if="this.VesselModel.damage_caused_by == 'TangerAlliance'"
              >
                <h5>Tanger Alliance :</h5>
                <v-col class="d-flex align-baseline" cols="12" sm="12">
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="8"
                          ><v-text-field
                            label="name of the TAT person :"
                            outlined
                            v-model="personName"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="1"
                          ><v-icon
                            large
                            class="mx-8"
                            color=" black darken-2"
                            @click="addpersonsTAT(personName)"
                            :disabled="personName == null || personName == ''"
                          >
                            mdi-account-plus-outline
                          </v-icon></v-col
                        >
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col
                          cols="6"
                          style="border: 1px solid black"
                          v-for="person in VesselModel.TAT_name_persons"
                          :key="person"
                          ><span
                            >{{ person }}
                            <v-icon
                              style="float: right"
                              large
                              class="mx-8 deleteButtonerson"
                              color=" red darken-2"
                              @click="deletePerson(person)"
                            >
                              mdi-account-minus-outline
                            </v-icon></span
                          ></v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                v-else-if="this.VesselModel.damage_caused_by == 'Outsourcer'"
              >
                <h5>Outsourcer :</h5>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    class="mx-2"
                    label="Company name :"
                    outlined
                    v-model="VesselModel.outsourcer_company_name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-else>
                <h5>Third party</h5>
                <v-col class="d-flex" cols="12" sm="5">
                  <v-text-field
                    class="mx-2"
                    label="Company name :"
                    outlined
                    v-model="VesselModel.thirdparty_company_name"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="5">
                  <v-textarea
                    clearable
                    rows="3"
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Company activities :"
                    value=""
                    v-model="VesselModel.thirdparty_Activity_comments"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      Damage_caused_by: ["TangerAlliance", "Outsourcer", "Thirdparty"],
      shippingLines: [],
      natureOfDamages: [],
      departments: [],
      brands: [],
      personsList: [],
      personsListDONE: [],
      personName: "",
      VesselModel: {
        vessel_number: "",
        nature_of_damage_comment: "",
        cause_damage: "",
        damage_caused_by: "",
        shipping_line: {
          id: 0,
          name: "",
        },
        nature_of_damage: {
          id: 0,
          name: "",
        },
        department: [],
        thirdparty_company_name: "",
        thirdparty_Activity_comments: "",
        outsourcer_company_name: "",
        TAT_name_persons: [],
      },
      Damage_caused_by_value: "",
      isDamage_caused_by_value: false,
      isNewDepartment: false,
      isOtherNatureOfDamage: false,
    };
  },

  mounted() {
    document.title = "Claim";
    this.setshippingLinesAction().then(() => {
      this.shippingLines = [...this.getshippingLines];
      var model = {
        id: 0,
        name: "Others",
      };
      this.shippingLines.push(model);
    });
    this.setnatureOfDamagesByVesselsAction().then(() => {
      this.natureOfDamages = [...this.getnatureOfDamages];
      var model = {
        id: 0,
        name: "Others",
      };
      this.natureOfDamages.push(model);
    });
    this.setDepartementsAction().then(() => {
      this.departments = [...this.getdepartements];
    });

    setTimeout(() => {
      this.initialize();
    }, 2000);
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "geteditedOrSavedClaimVessel",
      "getshippingLines",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
    ]),
  },
  watch: {
    VesselModel: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_vessel_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      console.warn('geteditedOrSavedClaimVessel', this.geteditedOrSavedClaimVessel);
      if (this.geteditedOrSavedClaimVessel.id > 0) {
        this.VesselModel.categorie_of_vessel =
          this.geteditedOrSavedClaimVessel.categorie_of_vessel;

        this.VesselModel.nature_of_damage.id =
          this.geteditedOrSavedClaimVessel.nature_of_damage.id;
        this.VesselModel.cause_damage =
          this.geteditedOrSavedClaimVessel.cause_damage;
        this.VesselModel.vessel_number =
          this.geteditedOrSavedClaimVessel.vessel_number;
        this.VesselModel.shipping_line.id =
          this.geteditedOrSavedClaimVessel.shipping_line.id;

        this.VesselModel.damage_caused_by =
          this.geteditedOrSavedClaimVessel.damage_caused_by;

        this.VesselModel.thirdparty_company_name =
          this.geteditedOrSavedClaimVessel.thirdparty_company_name;
        this.VesselModel.thirdparty_Activity_comments =
          this.geteditedOrSavedClaimVessel.thirdparty_Activity_comments;
        this.VesselModel.outsourcer_company_name =
          this.geteditedOrSavedClaimVessel.outsourcer_company_name;
        if (
          this.geteditedOrSavedClaimVessel.TAT_name_persons != "" &&
          this.geteditedOrSavedClaimVessel.TAT_name_persons != null
        )
          this.VesselModel.TAT_name_persons =
            this.geteditedOrSavedClaimVessel.TAT_name_persons.split("|");
        console.log(
          "this.geteditedOrSavedClaimVessel.concerned_internal_department",
          this.geteditedOrSavedClaimVessel.concerned_internal_department
        );
        if (
          this.geteditedOrSavedClaimVessel.concerned_internal_department !=
            "" &&
          this.geteditedOrSavedClaimVessel.concerned_internal_department != null
        )
          this.VesselModel.department =
            this.geteditedOrSavedClaimVessel.concerned_internal_department
              .split("|")
              .map((e) => {
                return parseInt(e);
              });
        this.setModuleShowToFalseAction();
      }
    },
    ...mapActions([
      "setTypeOfVesselsAction",
      "setbrandsAction",
      "setnatureOfDamagesByVesselsAction",
      "setDepartementsAction",
      "setModuleShowToFalseAction",
      "set_vessel_claim_SetterAction",
      "setshippingLinesAction"
    ]),
    changedepartmentSELECT() {
      this.isNewDepartment = false;
      this.VesselModel.department.map((c) => {
        if (c == 0) this.isNewDepartment = true;
      });
    },
    change_Damage_caused_by_SELECT() {
      this.isDamage_caused_by_value = true;
      if (this.VesselModel.damage_caused_by == "Thirdparty") {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
      //this.VesselModel.damage_caused_by = this.Damage_caused_by_value;
    },
    addpersonsTAT() {
      this.VesselModel.TAT_name_persons.push(this.personName);
      this.personName = "";
    },
    deletePerson(index) {
      this.VesselModel.TAT_name_persons =
        this.VesselModel.TAT_name_persons.filter((e) => e != index);
    },
  },
};
</script>
