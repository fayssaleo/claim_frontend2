<template>
  <div>
    <h4>Insurance declaration :</h4>
    <v-row align="center">
      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="declarationDate"
          mode="date"
          @input="declarationDateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Declaration Date"
              outlined
              :value="insurance_followup.date_of_declaration"
              v-on="inputEvents"
              class="declarationDateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>

      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="feedbackDate"
          mode="date"
          @input="feedbackDateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Date of feedback"
              outlined
              :value="insurance_followup.date_of_feedback"
              v-on="inputEvents"
              class="feedbackDateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <v-text-field
          v-model="insurance_followup.comment_Insurance"
          label="Comment :"
          outlined
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12">
        <v-file-input
          v-if="!showDownload"
          outlined
          label="Insurance declaration"
          v-model="insurance_followup.insurance_declarationFile"
        ></v-file-input>
        <a
          class="download mr-4"
          color="white"
          v-if="showDownload"
          :href="
            'http://127.0.0.1:8000/storage/cdn/containers/insurance_declaration/' +
            insurance_followup.insurance_declaration
          "
          download="proposed_file_name"
          >DOWNLOAD THE INSURANCE DECLARATION
          <v-icon class="mr-2"> mdi-download </v-icon></a
        >
        <span
          class="change"
          color="white"
          v-if="showDownload"
          @click="clickOnChange"
          >CHANGE THE INSURANCE DECLARATION
          <v-icon class="mr-2"> mdi-rotate-3d-variant </v-icon></span
        >
      </v-col>
    </v-row>
    <v-divider class="ma-2"></v-divider>
    <h4>Indemnisation :</h4>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="insurance_followup.Indemnification_of_insurer"
          label="Indemnification of the insurer :"
          outlined
        ></v-text-field>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="currency_list"
          item-text="name"
          item-value="code"
          label="Currency :"
          v-model="insurance_followup.currency_indemnisation"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="Indemnification_date"
          mode="date"
          @input="Indemnification_dateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Indemnification Date"
              outlined
              :value="insurance_followup.Indemnification_date"
              v-on="inputEvents"
              class="Indemnification_dateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="insurance_followup.deductible_charge_TAT"
          label="Deductible in charge of TAT :"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatToSimpleFormatDD_MM_YYYY } from "../../../helpers/helpers.js";

export default {
  components: {},

  data() {
    return {
      declarationDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      feedbackDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      Indemnification_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),

      menu2: false,
      menu3: false,
      menu4: false,

      insurance_followup: {
        date_of_declaration: null,
        date_of_feedback: "",
        comment_Insurance: "",
        Indemnification_of_insurer: null,
        Indemnification_date: null,
        currency_indemnisation: null,
        deductible_charge_TAT: null,
        Complementary_indemnification: null,
        insurance_declaration: null,
        insurance_declarationFile: null,
      },
      currency_list: [
        { name: "Moroccan Dirham", code: "MAD", symbol: "MAD", id: 1 },
        { name: "British Pound Sterling", code: "GBP", symbol: "??", id: 2 },
        { name: "Canadian Dollar", code: "CAD", symbol: "$", id: 3 },
        { name: "Chinese Yuan", code: "CNY", symbol: "??", id: 4 },
        { name: "Euro", code: "EUR", symbol: "???", id: 5 },
        { name: "Hong Kong Dollar", code: "HKD", symbol: "$", id: 6 },
        { name: "Japanese Yen", code: "JPY", symbol: "??", id: 7 },
        { name: "New Zealand Dollar", code: "NZD", symbol: "$", id: 8 },
        { name: "Swiss Franc", code: "CHF", symbol: "CHf", id: 9 },
        { name: "US Dollar", code: "USD", symbol: "$", id: 10 },
        { name: "Australian Dollar", code: "AUD", symbol: "$", id: 11 },
      ],
    };
  },

  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    ...mapGetters(["geteditedOrSavedClaimContainer"]),
    showDownload() {
      return this.geteditedOrSavedClaimContainer.insurance_declaration !=
        null && this.geteditedOrSavedClaimContainer.insurance_declaration != ""
        ? true
        : false;
    },
  },
  watch: {
    insurance_followup: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_insurance_followup_container_claim_SetterAction(newValue).then(
          () => {}
        );
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimContainer.id > 0) {
        this.insurance_followup.date_of_declaration =
          this.geteditedOrSavedClaimContainer.date_of_declaration;
        this.insurance_followup.date_of_feedback =
          this.geteditedOrSavedClaimContainer.date_of_feedback;

        this.insurance_followup.comment_Insurance =
          this.geteditedOrSavedClaimContainer.comment_Insurance;

        this.insurance_followup.Indemnification_of_insurer =
          this.geteditedOrSavedClaimContainer.Indemnification_of_insurer;

        this.insurance_followup.currency_indemnisation =
          this.geteditedOrSavedClaimContainer.currency_indemnisation;

        this.insurance_followup.deductible_charge_TAT =
          this.geteditedOrSavedClaimContainer.deductible_charge_TAT;

        this.insurance_followup.Complementary_indemnification =
          this.geteditedOrSavedClaimContainer.Complementary_indemnification;

        this.insurance_followup.insurance_declaration =
          this.geteditedOrSavedClaimContainer.insurance_declaration;
        this.insurance_followup.Indemnification_date =
          this.geteditedOrSavedClaimContainer.Indemnification_date;
      }
    },
    declarationDateChange(input) {
      this.insurance_followup.date_of_declaration =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    feedbackDateChange(input) {
      this.insurance_followup.date_of_feedback =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    Indemnification_dateChange(input) {
      this.insurance_followup.Indemnification_date =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    ...mapActions([
      "set_insurance_followup_container_claim_SetterAction",
      "set_insurance_declaration_to_null_SetterAction",
    ]),
    clickOnChange() {
      this.set_insurance_declaration_to_null_SetterAction();
    },
  },
};
</script>
