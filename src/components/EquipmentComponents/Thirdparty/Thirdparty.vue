<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" height="490px">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="thirdparty.amount"
                label="Amount :"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                :items="currency_list"
                item-text="name"
                item-value="code"
                label="Currency :"
                v-model="thirdparty.currency"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="thirdparty.comment_third_party"
                label="Comment :"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4"> </v-col>
            <v-col cols="12" sm="4">
              <template>
                <vc-date-picker
                  v-model="date_of_reimbursementDate"
                  mode="date"
                  @input="date_of_reimbursementDateChange"
                >
                  <template v-slot="{ inputEvents }">
                    <v-text-field
                      label="Incident Date"
                      outlined
                      :value="thirdparty.date_of_reimbursement"
                      v-on="inputEvents"
                      class="claimDateInputField"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col cols="12" sm="4"> </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="thirdparty.reinvoiced"
                label="reinvoiced  :"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="thirdparty.Invoice_number"
                label="Invoice number :"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="thirdparty.reimbursed_amount"
                label="Reimbursed amount :"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12">
              <v-file-input
                v-if="!showDownload"
                outlined
                label="Liability letter"
                v-model="thirdparty.liability_letterFile"
              ></v-file-input>
              <a
                class="download mr-4"
                color="white"
                v-if="showDownload"
                :href="
                  'http://127.0.0.1:8000/storage/cdn/equipments/liability_letter/' +
                  thirdparty.liability_letter
                "
                download="proposed_file_name"
                >DOWNLOAD LIABILITY LETTER
                <v-icon class="mr-2"> mdi-download </v-icon></a
              >
              <span
                class="change"
                color="white"
                v-if="showDownload"
                @click="clickOnChange"
                >CHANGE LIABILITY LETTER
                <v-icon class="mr-2"> mdi-rotate-3d-variant </v-icon></span
              >
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </div>
</template>

<script>
import { formatToSimpleFormatDD_MM_YYYY } from "@/helpers/helpers";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      date_of_reimbursementDate: new Date(),
      currency_list: [
        { name: "Moroccan Dirham", code: "MAD", symbol: "MAD", id: 1 },
        { name: "British Pound Sterling", code: "GBP", symbol: "£", id: 2 },
        { name: "Canadian Dollar", code: "CAD", symbol: "$", id: 3 },
        { name: "Chinese Yuan", code: "CNY", symbol: "¥", id: 4 },
        { name: "Euro", code: "EUR", symbol: "€", id: 5 },
        { name: "Hong Kong Dollar", code: "HKD", symbol: "$", id: 6 },
        { name: "Japanese Yen", code: "JPY", symbol: "¥", id: 7 },
        { name: "New Zealand Dollar", code: "NZD", symbol: "$", id: 8 },
        { name: "Swiss Franc", code: "CHF", symbol: "CHf", id: 9 },
        { name: "US Dollar", code: "USD", symbol: "$", id: 10 },
        { name: "Australian Dollar", code: "AUD", symbol: "$", id: 11 },
      ],
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu2: false,
      thirdparty: {
        amount: null,
        currency: "",
        comment_third_party: "",
        reinvoiced: null,
        date_of_reimbursement: null,
        Invoice_number: null,
        reimbursed_amount: null,
        liability_letter: null,
        liability_letterFile: null,
      },
    };
  },

  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    showDownload() {
      return this.geteditedOrSavedClaimEquipment.liability_letter != null &&
        this.geteditedOrSavedClaimEquipment.liability_letter != ""
        ? true
        : false;
    },
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
    thirdparty: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_thirdparty_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.thirdparty.amount = this.geteditedOrSavedClaimEquipment.amount;
        this.thirdparty.currency = this.geteditedOrSavedClaimEquipment.currency;
        this.thirdparty.comment_third_party =
          this.geteditedOrSavedClaimEquipment.comment_third_party;
        this.thirdparty.reinvoiced =
          this.geteditedOrSavedClaimEquipment.reinvoiced;
        this.thirdparty.date_of_reimbursement =
          this.geteditedOrSavedClaimEquipment.date_of_reimbursement;
        this.thirdparty.Invoice_number =
          this.geteditedOrSavedClaimEquipment.Invoice_number;
        this.thirdparty.reimbursed_amount =
          this.geteditedOrSavedClaimEquipment.reimbursed_amount;

        this.thirdparty.liability_letter =
          this.geteditedOrSavedClaimEquipment.liability_letter;
      }
    },
    ...mapActions([
      "set_thirdparty_claim_SetterAction",
      "set_liability_letter_to_null_SetterAction",
    ]),
    clickOnChange() {
      this.set_liability_letter_to_null_SetterAction();
    },
    date_of_reimbursementDateChange(input) {
      this.thirdparty.date_of_reimbursement =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
  },
};
</script>
