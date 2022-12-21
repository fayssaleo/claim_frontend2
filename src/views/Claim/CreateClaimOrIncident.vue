<template>
  <div style="padding: 5px; padding-top: 1%">
    <h3 class="text-uppercase" >{{createdOrEdited}} THE claim</h3>

    <template>
      <v-card class="d-flex pa-4 mb-4" max-width="170" outlined>
        <h5 class="green--text text--lighten-2">Claim</h5>
        <v-switch
          color="deep-orange lighten-1"
          v-model="switch1"
          @change="ClaimOrIncident()"
        ></v-switch>
        <h5 class="deep-orange--text text--lighten-1">Incident</h5>
      </v-card>
      <template>
        <div>
          <v-card>
          <v-toolbar color="green lighten-2" dark flat>
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="white"></v-tabs-slider>

                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item  :key="items[0]">
              <v-card flat>
               <date/>
              </v-card>
            </v-tab-item>
            <v-tab-item  :key="items[1]">
              <v-card flat>
               <tableData />
              </v-card>
            </v-tab-item>
            <v-tab-item  :key="items[2]">
              <v-card flat>
                <tableDataAutoMobile />
              </v-card>
            </v-tab-item>
            <v-tab-item  :key="items[3]">
              <v-card flat>
                <tableDataVessel />
              </v-card>
            </v-tab-item>
            <v-tab-item  :key="items[4]">
              <v-card flat>
                <tableDataContainer/>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>  
        </div>
        
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import tableData from "../../components/EquipmentComponents/table/tableData.vue"
import tableDataAutoMobile from "../../components/AutomobileComponents/table/tableDataAutoMobile.vue"
import tableDataVessel from "../../components/VesselComponents/table/tableDataVessel.vue"
import tableDataContainer from "../../components/ContainerComponents/table/tableDataContainer.vue"
import date from "../Claim/date.vue"
export default {
  name: "ClaimFrontend2CreateClaimOrIncident",
  components: {tableData,tableDataAutoMobile,tableDataVessel,tableDataContainer,date},

  data() {
    return {
      users: [],
      search: "",
      loading: "false",
      ClaimOrIncidentValue: "Claim",
      switch1: false,
      tab: null,
      createdOrEdited: "CREATING",
      items: ["Date","Equipmemt", "Automobile", "Vessel", "Container"],
      
    };
  },
  computed: {
    formTitle() {},
    ...mapGetters(["geteditedOrSavedclaim", ""]),
  },
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  watch: {
    ClaimOrIncidentValue: {
      handler(newValue, oldvalue) {
        this.set_attr_ClaimOrIncident_CLAiMAction(newValue).then(() => {});
      },
    },
  },

  methods: {
    ...mapActions([
      "set_attr_ClaimOrIncident_CLAiMAction",
      "editedOrSavedEquipmentClaimAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    initialize() {
      
      if (this.geteditedOrSavedclaim.id === 0) {
        this.createdOrEdited = "Create";
      } else {
        this.createdOrEdited = "Edit";
      }
      this.set_attr_ClaimOrIncident_CLAiMAction(
        this.ClaimOrIncidentValue
      ).then(() => {});
      if (this.geteditedOrSavedclaim.ClaimOrIncident == "Incident") {
        this.switch1 = true;
      } else {
        this.switch1 = false;
      }
      this.ClaimOrIncident();
    },
    ClaimOrIncident() {
      if (this.switch1 == false) {
        this.ClaimOrIncidentValue = "Claim";
      } else {
        this.ClaimOrIncidentValue = "Incident";
      }
      this.set_attr_ClaimOrIncident_CLAiMAction(
        this.ClaimOrIncidentValue
      ).then(() => {});
    },
    
  },
};
</script>

<style lang="scss" scoped></style>
