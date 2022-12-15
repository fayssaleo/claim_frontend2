<template>
  <div>
    <v-card class="mb-12" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Container :
              </p></v-col
            >
            <v-col class="d-flex" cols="6" sm="4">
              <v-text-field
                label="containerID :"
                outlined
                v-model="shippingLineModel.containerID"
                class="mr-2"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="6" sm="4">
              <v-text-field
                label="Nombre of containers :"
                outlined
                v-model="shippingLineModel.nombre_of_containers"
                class="mr-2"
              ></v-text-field>
            </v-col>

            <v-col class="d-flex" cols="6" sm="4">
              <v-text-field
                label="Category of the container :"
                outlined
                v-model="shippingLineModel.categorie_of_container"
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="shippingLineModel.shipping_line.id != 0"
            >
              <v-select
                :items="shipping_lines"
                item-text="name"
                item-value="id"
                v-model="shippingLineModel.shipping_line.id"
                label="shipping_line of the equipment :"
                dense
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="6"
              sm="2"
              v-if="shippingLineModel.shipping_line.id == 0"
            >
              <v-select
                :items="shipping_lines"
                item-text="name"
                item-value="id"
                v-model="shippingLineModel.shipping_line.id"
                label="shipping_line of the equipment :"
                dense
                outlined
                filled
                color="primary"
              ></v-select>
            </v-col>
            <v-col
              v-if="shippingLineModel.shipping_line.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="shipping_line name :"
                outlined
                v-model="shippingLineModel.shipping_line.name"
                class="mr-2"
              ></v-text-field>
            </v-col>

            <!---------------------------------------------------------------------------------------------------------------->

            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="ContainerTypes"
                item-text="name"
                item-value="id"
                v-model="shippingLineModel.containerType"
                label="container Type :"
                dense
                outlined
              ></v-select>
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
                  v-if="shippingLineModel.nature_of_damage.id != 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="shippingLineModel.nature_of_damage.id"
                    label="Cause of damage :"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                  v-if="shippingLineModel.nature_of_damage.id == 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="shippingLineModel.nature_of_damage.id"
                    label="Cause of damage :"
                    dense
                    outlined
                    filled
                    color="primary"
                  ></v-select>
                </v-col>
                <v-col
                  v-if="shippingLineModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    label="Cause of damage name :"
                    outlined
                    v-model="shippingLineModel.nature_of_damage.name"
                    class="mr-2"
                  ></v-text-field>
                </v-col>

                <v-col
                  v-if="shippingLineModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="12"
                >
                  <v-textarea
                    clearable
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Cause of damage comment"
                    v-model="shippingLineModel.nature_of_damage_comment"
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
                Nature of damage :
              </p></v-col
            >
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label=" Nature of damage:"
                outlined
                v-model="shippingLineModel.cause_damage"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                multiple
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="shippingLineModel.department"
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
                v-model="shippingLineModel.damage_caused_by"
                dense
                outlined
                @change="change_Damage_caused_by_SELECT()"
              ></v-select>
            </v-col>
            <v-col class="d-flex gray lighten-4 pa-6" cols="12" sm="12">
              <v-row
                v-if="
                  this.shippingLineModel.damage_caused_by == 'TangerAlliance'
                "
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
                          v-for="person in shippingLineModel.TAT_name_persons"
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
                v-else-if="
                  this.shippingLineModel.damage_caused_by == 'Outsourcer'
                "
              >
                <h5>Outsourcer :</h5>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    class="mx-2"
                    label="Company name :"
                    outlined
                    v-model="shippingLineModel.outsourcer_company_name"
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
                    v-model="shippingLineModel.thirdparty_company_name"
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
                    v-model="shippingLineModel.thirdparty_Activity_comments"
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
      ContainerTypes: [
        "Dry container (all purpose)",
        "Reefer container",
        "Tank container",
        "Open Top container",
        "Flat Racks container",
      ],
      typeOfEquipments: [],
      natureOfDamages: [],
      departments: [],
      shipping_lines: [],
      personsList: [],
      personsListDONE: [],
      personName: "",
      shippingLineModel: {
        containerID: 0,
        nombre_of_containers: 0,
        categorie_of_container: "",
        containerType: "",
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
      this.shipping_lines = [...this.getshippingLines];
      var model = {
        id: 0,
        name: "Others",
      };
      this.shipping_lines.push(model);
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
      "getTypeOfEquipments",
      "getshippingLines",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimContainer",
    ]),
  },
  watch: {
    shippingLineModel: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_container_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimContainer.id > 0) {
        this.shippingLineModel.categorie_of_container =
          this.geteditedOrSavedClaimContainer.categorie_of_container;
          //new
        this.shippingLineModel.containerID =
          this.geteditedOrSavedClaimContainer.containerID;
        this.shippingLineModel.nombre_of_containers =
          this.geteditedOrSavedClaimContainer.nombre_of_containers;
        this.shippingLineModel.containerType =
          this.geteditedOrSavedClaimContainer.containerType;
       

        this.shippingLineModel.shipping_line.id =
          this.geteditedOrSavedClaimContainer.shipping_line.id;
        this.shippingLineModel.nature_of_damage.id =
          this.geteditedOrSavedClaimContainer.nature_of_damage.id;
        this.shippingLineModel.cause_damage =
          this.geteditedOrSavedClaimContainer.cause_damage;

        

        this.shippingLineModel.damage_caused_by =
          this.geteditedOrSavedClaimContainer.damage_caused_by;

        this.shippingLineModel.thirdparty_company_name =
          this.geteditedOrSavedClaimContainer.thirdparty_company_name;
        this.shippingLineModel.thirdparty_Activity_comments =
          this.geteditedOrSavedClaimContainer.thirdparty_Activity_comments;
        this.shippingLineModel.outsourcer_company_name =
          this.geteditedOrSavedClaimContainer.outsourcer_company_name;
        if (
          this.geteditedOrSavedClaimContainer.TAT_name_persons != "" &&
          this.geteditedOrSavedClaimContainer.TAT_name_persons != null
        )
          this.shippingLineModel.TAT_name_persons =
            this.geteditedOrSavedClaimContainer.TAT_name_persons.split("|");
        console.log(
          "this.geteditedOrSavedClaimContainer.concerned_internal_department",
          this.geteditedOrSavedClaimContainer.concerned_internal_department
        );
        if (
          this.geteditedOrSavedClaimContainer.concerned_internal_department !=
            "" &&
          this.geteditedOrSavedClaimContainer.concerned_internal_department !=
            null
        )
          this.shippingLineModel.department =
            this.geteditedOrSavedClaimContainer.concerned_internal_department
              .split("|")
              .map((e) => {
                return parseInt(e);
              });
        this.setModuleShowToFalseAction();
      }
    },
    ...mapActions([
      "setTypeOfEquipmentsAction",
      "setshippingLinesAction",
      "setnatureOfDamagesAction",
      "setDepartementsAction",
      "set_container_claim_SetterAction",
      "setModuleShowToFalseAction",
    ]),
    changedepartmentSELECT() {
      this.isNewDepartment = false;
      this.shippingLineModel.department.map((c) => {
        if (c == 0) this.isNewDepartment = true;
      });
    },
    change_Damage_caused_by_SELECT() {
      this.isDamage_caused_by_value = true;
      if (this.shippingLineModel.damage_caused_by == "Thirdparty") {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
      //this.shippingLineModel.damage_caused_by = this.Damage_caused_by_value;
    },
    addpersonsTAT() {
      this.shippingLineModel.TAT_name_persons.push(this.personName);
      this.personName = "";
    },
    deletePerson(index) {
      this.shippingLineModel.TAT_name_persons =
        this.shippingLineModel.TAT_name_persons.filter((e) => e != index);
    },
  },
};
</script>
