<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <template>
                <vc-date-picker
                  v-model="datepickerEtd"
                  mode="dateTime"
                  is24hr
                  @input="etdChange"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <v-text-field
                      label="Incident Date"
                      outlined
                      :value="inputValue"
                      v-on="inputEvents"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="dateClaim.claim_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateClaim.claim_date"
                    label="Claim date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateClaim.claim_date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(dateClaim.claim_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
    claimDateChange(input) {
      this.dateClaim.incedent_report = formatToSimpleFormatDD_MM_YYYY(input);
    },
    ...mapActions(["set_date_claim_SetterAction"]),
  },
};
</script>
