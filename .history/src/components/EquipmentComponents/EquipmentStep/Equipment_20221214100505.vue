<template>
  <div>
    <v-card class="mb-12" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col cols="12"
              ><p class="font-weight-black">Equipment :</p></v-col
            >
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="EquipmentModel.type_of_equipment.id != 0"
            >
              <v-select
                :items="typeOfEquipments"
                item-text="name"
                item-value="id"
                label="Type of the equipment :"
                dense
                outlined
                v-model="EquipmentModel.type_of_equipment.id"
              ></v-select>
            </v-col>

            <v-col
              class="d-flex other"
              cols="6"
              sm="2"
              v-if="EquipmentModel.type_of_equipment.id == 0"
            >
              <v-select
                :items="typeOfEquipments"
                item-text="name"
                item-value="id"
                label="Type of the equipment :"
                dense
                outlined
                v-model="EquipmentModel.type_of_equipment.id"
                filled
                color="primary"
              ></v-select>
            </v-col>
            <v-col
              v-if="EquipmentModel.type_of_equipment.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="Type of the equipment name :"
                outlined
                v-model="EquipmentModel.type_of_equipment.name"
                class="mr-2"
              ></v-text-field>
            </v-col>

            <!---------------------------------------------------------------------------------------------------------------->

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="EquipmentModel.brand.id != 0"
            >
              <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.brand.id"
                label="Brand of the equipment :"
                dense
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="6"
              sm="2"
              v-if="EquipmentModel.brand.id == 0"
            >
              <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.brand.id"
                label="Brand of the equipment :"
                dense
                outlined
                filled
                color="primary"
              ></v-select>
            </v-col>
            <v-col
              v-if="EquipmentModel.brand.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="Brand name :"
                outlined
                v-model="EquipmentModel.brand.name"
                class="mr-2"
              ></v-text-field>
            </v-col>

            <!---------------------------------------------------------------------------------------------------------------->

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label="Category of the equipment :"
                outlined
                v-model="EquipmentModel.categorie_of_equipment"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label="Equipement Registration"
                outlined
                v-model="EquipmentModel.equipement_registration"
              ></v-text-field>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <!---------------------------------------------------------------------------------------------------------------->

            <v-col class="d-flex" cols="12" sm="12">
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="12"
                  v-if="EquipmentModel.nature_of_damage.id != 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="EquipmentModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                  v-if="EquipmentModel.nature_of_damage.id == 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="EquipmentModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                    filled
                    color="primary"
                  ></v-select>
                </v-col>
                <v-col
                  v-if="EquipmentModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    label="Nature of damage name :"
                    outlined
                    v-model="EquipmentModel.nature_of_damage.name"
                    class="mr-2"
                  ></v-text-field>
                </v-col>

                <v-col
                  v-if="EquipmentModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="12"
                >
                  <v-textarea
                    clearable
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Nature of damage comment"
                    v-model="EquipmentModel.nature_of_damage_comment"
                    value=""
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->

            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label=" Cause of damage:"
                outlined
                v-model="EquipmentModel.cause_damage"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                multiple
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.department"
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
                v-model="EquipmentModel.damage_caused_by"
                dense
                outlined
                @change="change_Damage_caused_by_SELECT()"
              ></v-select>
            </v-col>
            <v-col class="d-flex gray lighten-4 pa-6" cols="12" sm="12">
              <v-row
                v-if="this.EquipmentModel.damage_caused_by == 'TangerAlliance'"
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
                          v-for="person in EquipmentModel.TAT_name_persons"
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
                v-else-if="this.EquipmentModel.damage_caused_by == 'Outsourcer'"
              >
                <h5>Outsourcer :</h5>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    class="mx-2"
                    label="Company name :"
                    outlined
                    v-model="EquipmentModel.outsourcer_company_name"
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
                    v-model="EquipmentModel.thirdparty_company_name"
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
                    v-model="EquipmentModel.thirdparty_Activity_comments"
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
      typeOfEquipments: [],
      natureOfDamages: [],
      departments: [],
      brands: [],
      personsList: [],
      personsListDONE: [],
      personName: "",
      EquipmentModel: {
        categorie_of_equipment: "",
        equipement_registration: "",
        nature_of_damage_comment: "",
        cause_damage: "",
        damage_caused_by: "",
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
    this.setTypeOfEquipmentsAction().then(() => {
      this.typeOfEquipments = [...this.getTypeOfEquipments];
      var model = {
        id: 0,
        name: "Others",
      };
      this.typeOfEquipments.push(model);
    });
    this.setbrandsAction().then(() => {
      this.brands = [...this.getbrands];
      var model = {
        id: 0,
        name: "Others",
      };
      this.brands.push(model);
    });
    this.setnatureOfDamagesAction().then(() => {
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
      "geteditedOrSavedClaimEquipment",
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimEquipment",
    ]),
  },
  watch: {
    EquipmentModel: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_equipment_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.EquipmentModel.categorie_of_equipment =
          this.geteditedOrSavedClaimEquipment.categorie_of_equipment;

        this.EquipmentModel.brand.id =
          this.geteditedOrSavedClaimEquipment.brand.id;
        this.EquipmentModel.nature_of_damage.id =
          this.geteditedOrSavedClaimEquipment.nature_of_damage.id;
        this.EquipmentModel.cause_damage =
          this.geteditedOrSavedClaimEquipment.cause_damage;
        this.EquipmentModel.equipement_registration =
          this.geteditedOrSavedClaimEquipment.equipement_registration;
        this.EquipmentModel.type_of_equipment.id =
          this.geteditedOrSavedClaimEquipment.type_of_equipment.id;

        this.EquipmentModel.damage_caused_by =
          this.geteditedOrSavedClaimEquipment.damage_caused_by;

        this.EquipmentModel.thirdparty_company_name =
          this.geteditedOrSavedClaimEquipment.thirdparty_company_name;
        this.EquipmentModel.thirdparty_Activity_comments =
          this.geteditedOrSavedClaimEquipment.thirdparty_Activity_comments;
        this.EquipmentModel.outsourcer_company_name =
          this.geteditedOrSavedClaimEquipment.outsourcer_company_name;
        if (
          this.geteditedOrSavedClaimEquipment.TAT_name_persons != "" &&
          this.geteditedOrSavedClaimEquipment.TAT_name_persons != null
        )
          this.EquipmentModel.TAT_name_persons =
            this.geteditedOrSavedClaimEquipment.TAT_name_persons.split("|");
        console.log(
          "this.geteditedOrSavedClaimEquipment.concerned_internal_department",
          this.geteditedOrSavedClaimEquipment.concerned_internal_department
        );
        if (
          this.geteditedOrSavedClaimEquipment.concerned_internal_department !=
            "" &&
          this.geteditedOrSavedClaimEquipment.concerned_internal_department !=
            null
        )
          this.EquipmentModel.department =
            this.geteditedOrSavedClaimEquipment.concerned_internal_department
              .split("|")
              .map((e) => {
                return parseInt(e);
              });
        this.setModuleShowToFalseAction();
      }
    },
    ...mapActions([
      "setTypeOfEquipmentsAction",
      "setbrandsAction",
      "setnatureOfDamagesAction",
      "setDepartementsAction",
      "set_equipment_claim_SetterAction",
      "setModuleShowToFalseAction",
    ]),
    changedepartmentSELECT() {
      this.isNewDepartment = false;
      this.EquipmentModel.department.map((c) => {
        if (c == 0) this.isNewDepartment = true;
      });
    },
    change_Damage_caused_by_SELECT() {
      this.isDamage_caused_by_value = true;
      if (this.EquipmentModel.damage_caused_by == "Thirdparty") {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
      //this.EquipmentModel.damage_caused_by = this.Damage_caused_by_value;
    },
    addpersonsTAT() {
      this.EquipmentModel.TAT_name_persons.push(this.personName);
      this.personName = "";
    },
    deletePerson(index) {
      this.EquipmentModel.TAT_name_persons =
        this.EquipmentModel.TAT_name_persons.filter((e) => e != index);
    },
  },
};
</script>
