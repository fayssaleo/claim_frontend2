<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" height="300px">
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
                      :value="dateClaim.incedent_report"
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
                      label="Incident Date"
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
            <v-col class="" cols="12" sm="6">
              <v-file-input
                outlined
                label="Incident report"
                v-model="dateClaim.incedent_report"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatToSimpleFormatDD_MM_YYYY } from "../../../helpers/helpers.js";

export default {
  components: {},
  data(vm) {
    return {
      incidentDate: new Date(),
      claimDate: new Date(),
      menu: false,
      menu1: false,
      dateClaim: {
        incident_date: null,
        claim_date: null,
        incedent_report: "",
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
    dateClaim: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_date_claim_SetterAction(newValue).then(() => {});
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
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.dateClaim.incident_date =
          this.geteditedOrSavedClaimEquipment.incident_date;
        this.dateClaim.claim_date =
          this.geteditedOrSavedClaimEquipment.claim_date;
        this.dateClaim.incedent_report =
          this.geteditedOrSavedClaimEquipment.incedent_report;
      }
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
      this.dateClaim.incedent_report = formatToSimpleFormatDD_MM_YYYY(input);
    },
    ...mapActions(["set_date_claim_SetterAction"]),
  },
};
</script>
