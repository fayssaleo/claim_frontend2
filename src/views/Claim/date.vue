<template>
  <div>
    <v-card class="mx-6 ma-10 pt-4" color="#f0f0f0cc" height="340px">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="" cols="12" sm="6">
              <template>
                <vc-date-picker
                  v-model="incidentDate"
                  mode="date"
                  @input="incidentDateChange"
                >
                  <template v-slot="{ inputEvents }">
                    <v-text-field
                      label="Incident Date"
                      outlined
                      :value="dateClaim.incident_date"
                      v-on="inputEvents"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col class="" cols="12" sm="6">
              <template>
                <vc-date-picker
                  v-model="claimDate"
                  mode="date"
                  @input="claimDateChange"
                >
                  <template v-slot="{ inputEvents }">
                    <v-text-field
                      label="Claim Date"
                      outlined
                      :value="dateClaim.claim_date"
                      v-on="inputEvents"
                      class="claimDateInputField"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col class="" cols="12" sm="7">
              <v-file-input
                v-if="!showDownload"
                outlined
                label="Incident report"
                v-model="dateClaim.incident_reportFile"
              ></v-file-input>
              <a
                class="download mr-4"
                color="white"
                target="_blank"
                v-if="showDownload"
                :href="
                  'http://127.0.0.1:8000/storage/cdn/claim/incident_report/' +
                  geteditedOrSavedclaim.incident_report
                "
                download="proposed_file_name"
                >DOWNLOAD THE INCIDENT REPORT
                <v-icon class="mr-2"> mdi-download </v-icon></a
              >
              <span
                class="change"
                color="white"
                v-if="showDownload"
                @click="clickOnChange"
                >CHANGE THE INCIDENT REPORT
                <v-icon class="mr-2"> mdi-rotate-3d-variant </v-icon></span
              >
            </v-col>
            <v-col cols="12" sm="1"> </v-col>
            <v-col cols="12" sm="2">
              <v-card class="d-flex pa-4 mb-4" max-width="170" outlined>
                <h5 class="green--text text--lighten-2">Claim</h5>
                <v-switch
                  color="deep-orange lighten-1"
                  v-model="switch1"
                  @change="ClaimOrIncident()"
                ></v-switch>
                <h5 class="deep-orange--text text--lighten-1">Incident</h5>
              </v-card>
            </v-col>
            <v-col sm="2"> </v-col>
          </v-row>
          <div class="d-flex justify-center mt-8">
            <v-btn color="ma-2  px-12  primary white--text" @click="saveDate()">
              save
            </v-btn>
          </div>
        </v-container>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  formatToSimpleFormatDD_MM_YYYY,
  FormatDateStringToISOSimpleEnglishDate,
} from "../../helpers/helpers.js";

export default {
  components: {},
  data(vm) {
    return {
      incidentDate: new Date(),
      claimDate: new Date(),
      menu: false,
      menu1: false,
      switch1: false,
      dateClaim: {
        id: 0,
        incident_date: null,
        claim_date: null,
        status: "",
        ClaimOrIncident: "Claim",
        incident_report: "",
        incident_reportFile: "",
      },
    };
  },
  mounted() {
    document.title = "Claim";
    this.initialize();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    formTitle() {},
    showDownload() {
      return this.geteditedOrSavedclaim.incident_report != null &&
        this.geteditedOrSavedclaim.incident_report != ""
        ? true
        : false;
    },
    ...mapGetters(["geteditedOrSavedclaim"]),
  },

  watch: {
    dateClaim: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_attr_CLAiMAction(newValue);
      },
    },
    date: {
      handler(newValue, oldvalue) {
        this.dateFormatted = this.formatDate(this.date);
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    ...mapActions([
      "addClaimAction",
      "set_attr_CLAiMAction",
      "set_attr_ClaimOrIncident_CLAiMAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "set_incident_report_to_null_SetterAction",
    ]),
    initialize() {
      if (this.geteditedOrSavedclaim.id > 0) {
        this.dateClaim.id = this.geteditedOrSavedclaim.id;
        this.dateClaim.incident_date = this.geteditedOrSavedclaim.incident_date;
        this.dateClaim.status = this.geteditedOrSavedclaim.status;
        this.dateClaim.ClaimOrIncident =
          this.geteditedOrSavedclaim.ClaimOrIncident;
        this.dateClaim.claim_date = this.geteditedOrSavedclaim.claim_date;
        this.dateClaim.incident_report =
          this.geteditedOrSavedclaim.incident_report;
        this.dateClaim.incident_reportFile =
          this.geteditedOrSavedclaim.incident_reportFile;
        if (
          this.dateClaim.incident_date != "" &&
          this.dateClaim.incident_date != null
        )
          this.incidentDate = new Date(this.dateClaim.incident_date);
        if (
          this.dateClaim.claim_date != "" &&
          this.dateClaim.claim_date != null
        )
          this.claimDate = new Date(this.dateClaim.claim_date);
      }
      console.log(
        "this.geteditedOrSavedclaim.ClaimOrIncident == ",
        this.geteditedOrSavedclaim
      );
      if (this.geteditedOrSavedclaim.ClaimOrIncident == "Incident") {
        this.switch1 = true;
      } else {
        this.switch1 = false;
      }
      this.ClaimOrIncident();
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    incidentDateChange(input) {
      this.dateClaim.incident_date = formatToSimpleFormatDD_MM_YYYY(input);
    },
    claimDateChange(input) {
      this.dateClaim.claim_date = formatToSimpleFormatDD_MM_YYYY(input);
    },
    clickOnChange() {
      this.set_incident_report_to_null_SetterAction();
    },
    saveDate() {
      this.addClaimAction(this.geteditedOrSavedclaim).then(() => {
        this.setModuleShowToTrueAction();
        setTimeout(() => {
          this.setModuleShowToFalseAction();
        }, 1500);
      });
    },
    ClaimOrIncident() {
      if (this.switch1 == false) {
        this.dateClaim.ClaimOrIncident = "Claim";
      } else {
        this.dateClaim.ClaimOrIncident = "Incident";
      }
      this.set_attr_ClaimOrIncident_CLAiMAction(
        this.dateClaim.ClaimOrIncident
      ).then(() => {});
    },
  },
};
</script>
