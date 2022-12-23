<template>
  <div style="padding: 5px">
    <v-data-table
      :headers="headers"
      :items="estimates"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estimate</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add Estimate
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeDialoge">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn v-if="isAdd == true" dark text @click="addeItem()">
                    Save
                  </v-btn>
                  <v-btn
                    v-if="isAdd == false"
                    text
                    dark
                    @click="updateEstimate()"
                  >
                    Update
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <template>
                <v-container fluid>
                  <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-card class="d-flex pa-4" outlined>
                        <h5 class="green--text text--lighten-2">Temporary</h5>
                        <v-switch
                          color="deep-orange lighten-1"
                          v-model="switch1"
                          @change="TemporaryOrPermanent()"
                        ></v-switch>
                        <h5 class="deep-orange--text text--lighten-1">
                          Permanent
                        </h5>
                      </v-card>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-file-input
                        v-if="editedItem.fileName == null"
                        outlined
                        v-model="editedItem.file"
                        label="File input"
                        class="mt-2"
                      ></v-file-input>
                      <div v-if="editedItem.fileName != null" class="d-flex">
                        <span class="fileNameEstimate">
                          {{ editedItem.fileName }}
                        </span>

                        <a
                          class="downloadpicture white--text bg-teal btnFile"
                          :href="`${URL}/${editedItem.fileName}`"
                          download
                          target="_blank"
                        >
                          <v-icon color="white" medium>
                            mdi-download-circle-outline
                          </v-icon>
                        </a>
                        <v-btn
                          class="btnFile white--text"
                          color="red"
                          @click="deleteFile()"
                        >
                          <v-icon medium> mdi-delete </v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-card
                        class="mx-auto"
                        max-width="240"
                        max-height="130"
                        min-height="130"
                        outlined
                      >
                        <v-list-item three-line class="d-flex">
                          <v-list-item-content>
                            <div
                              class="text-overline mb-4 teal--text lighten-1--text"
                            >
                              Estimate amount
                            </div>
                            <v-list-item-title
                              class="text-h5 mb-1 teal--text darken-4--text"
                            >
                              {{ totalAmount }}
                              {{ editedItem.currency_estimate }}
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="35" color="white">
                            <v-icon color="teal lighten-1" large>
                              mdi-cash-multiple
                            </v-icon></v-list-item-avatar
                          >
                        </v-list-item>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row class="pa-4 ma-2 grey lighten-3">
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-select
                        :items="currency_list"
                        item-text="name"
                        item-value="code"
                        label="Currency :"
                        v-model="editedItem.currency_estimate"
                        dense
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-text-field
                        label="Equipment purchase costs"
                        v-model="editedItem.equipment_purchase_costs"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="4">
                      <v-text-field
                        label="Installation and facilities costs "
                        v-model="editedItem.installation_and_facilities_costs"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-text-field
                        label="Transportation costs"
                        v-model="editedItem.rransportation_costs"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <div v-if="estimateUpdate.estimate.customedFields != null">
                      <Inputs
                        v-for="item in estimateUpdate.estimate.customedFields"
                        :key="item.id"
                        :addToListTextFields="addToListTextFields"
                        :refreshInputEstimate="refreshInputEstimate"
                        :input_item="item"
                      />
                    </div>
                    <div v-else>
                      <Inputs
                        v-for="item in estimateUpdate.estimate.customedFields"
                        :key="item.id"
                        :addToListTextFields="addToListTextFields"
                        :refreshInputEstimate="refreshInputEstimate"
                        :input_item="item"
                      />
                    </div>
                  </v-row>
                  <v-row class="pa-4 ma-2">
                    <h3>Others :</h3>
                    <v-col class="d-flex" cols="12" sm="8">
                      <v-text-field
                        label="Name new valuation"
                        v-model="textFieldModel.name"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="textFieldModel.value"
                        class="mx-2"
                        label="value valuation"
                        outlined
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        class="mr-2 white--text"
                        @click="addOthers()"
                      >
                        <v-icon left> mdi-plus </v-icon>
                        Add
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="confirmAddSave" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" v-if="editedIndex == -1"
                >Are you sure you want to add this item?</v-card-title
              >
              <v-card-title class="text-h5" v-else
                >Are you sure you want to update this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
    <LoadingPage v-if="LoadingPage == true" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Inputs from "./Inputs.vue";
import LoadingPage from "@/components/LoadingPage.vue";
export default {
  components: {
    Inputs,
    LoadingPage,
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    switch1: false,
    headers: [
      { text: "id", align: "start", value: "estimate.id", sortable: true },
      {
        text: "Temporary or Permanent",
        value: "estimate.temporary_or_permanent",
        sortable: true,
      },
      { text: "Estimate amount", value: "estimate_amount", sortable: true },
      { text: "Currency", value: "estimate.currency_estimate", sortable: true },
      { text: "Estimate date", value: "estimate.created_at", sortable: true },

      { text: "Actions", value: "actions", sortable: false },
    ],
    estimates: [],
    editedIndex: -1,
    estimateDelete: null,
    estimateUpdate: {
      estimate: {
        id: null,
        temporary_or_permanent: "",
        currency_estimate: "",
        fileName: "",
        equipment_purchase_costs: 0,
        installation_and_facilities_costs: 0,
        rransportation_costs: 0,
        vessel_id: null,
        customedFields: [],
      },
      estimate_amount: 0,
    },
    editedItem: {
      id: null,
      temporary_or_permanent: "Temporary",
      currency_estimate: "",
      fileName: "",
      equipment_purchase_costs: 0,
      installation_and_facilities_costs: 0,
      rransportation_costs: 0,
      vessel_id: null,
      customedFields: [],
      file: "create",
    },
    defaultItem: {
      id: 0,
      equipment_purchase_costs: 0,
      installation_and_facilities_costs: 0,
      rransportation_costs: 0,
      vessel_id: null,
      currency_estimate: "",
      temporary_or_permanent: "Temporary",
      fileName: null,
      file: "create",
    },
    isAdd: true,
    AmountList: [],
    totalAmount: 0,
    confirmAddSave: false,
    activePicker: null,
    date: null,
    menu: false,
    textFields: [],
    textFieldModel: {
      id: null,
      name: "",
      value: null,
    },
    file: [],
    incrument: 8999,
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
    URL: "http://127.0.0.1:8000/storage/cdn/fileEstimates",
    deleteInputs: [],
  }),
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    ...mapGetters(["getestimates", "geteditedOrSavedClaimVessel"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: 0,
          equipment_purchase_costs: 0,
          installation_and_facilities_costs: 0,
          rransportation_costs: 0,
          vessel_id: null,
          currency_estimate: "",
          fileName: null,
          file: "create",
        };
      }
      val || this.close();
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    editedItem: {
      deep: true,
      handler(newValue, oldvalue) {
        this.TotalAmount();
      },
    },
    estimateUpdate: {
      deep: true,
      handler(newValue, oldvalue) {
        this.TotalAmount();
      },
    },
    editedItem: {
      deep: true,
      handler(newValue, oldvalue) {
        this.TotalAmount();
      },
    },
    isAdd: {
      handler(newValue, oldvalue) {
        if (newValue) {
          this.estimateUpdate.estimate.customedFields = [];
        }
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      this.setestimatesVesselAction(
        this.geteditedOrSavedClaimVessel.id
      ).then(() => {
        this.estimates = [...this.getestimates];
      });
      let numOr0 = (n) => (isNaN(n) ? 0 : n);
    },
    ...mapActions([
      "setestimatesVesselAction",
      "editestimateVesselAction",
      "deleteestimateAction",
      "addestimateVesselAction",
      "addFileAction",
      "deleteFileAction",
    ]),
    TotalAmount() {
      let numOr0 = (n) => (isNaN(n) ? 0 : n);

      this.AmountList = [];
      this.totalAmount = 0;
      this.AmountList.push(
        numOr0(parseFloat(this.editedItem.equipment_purchase_costs))
      );
      this.AmountList.push(
        numOr0(parseFloat(this.editedItem.installation_and_facilities_costs))
      );
      this.AmountList.push(
        numOr0(parseFloat(this.editedItem.rransportation_costs))
      );

      if (this.estimateUpdate != null) {
        if (this.estimateUpdate.estimate.customedFields != null) {
          this.estimateUpdate.estimate.customedFields.map((x) => {
            this.AmountList.push(numOr0(parseFloat(x.value)));
          });
        }
      }

      this.SUM();
    },
    SUM() {
      this.totalAmount = 0;

      this.AmountList.map((x) => {
        this.totalAmount = x + this.totalAmount;
      });
    },
    addToListTextFields(data) {
      this.textFields.push(data);
      console.info("this.textFields", this.textFields);
    },
    TemporaryOrPermanent() {
      if (this.switch1 == false) {
        this.editedItem.temporary_or_permanent = "Temporary";
      } else {
        this.editedItem.temporary_or_permanent = "Permanent";
      }
    },
    addEstimate() {
      this.editedItem.vessel_id = this.geteditedOrSavedClaimVessel.id;
      this.TemporaryOrPermanent();
      this.editedItem.customedFields =
        this.estimateUpdate.estimate.customedFields;
      console.log("estimate file test", this.editedItem);
      this.addestimateVesselAction(this.editedItem).then((resolve) => {
        this.editedItem.id = resolve.estimate.id;
        this.estimateUpdate = resolve;
        this.estimateUpdate.estimate.customedFields = [];

        this.estimates = [...this.getestimates];
        this.editedItem.equipment_purchase_costs = "";
        this.editedItem.installation_and_facilities_costs = "";
        this.editedItem.rransportation_costs = "";
        this.editedItem.vessel_id = null;
        this.editedItem.currency_estimate = "";
        this.editedItem.id = 0;
        this.editedItem.file = "";
      });
      this.close();
    },
    updateEstimate() {
      this.editedItem.vessel_id = this.geteditedOrSavedClaimVessel.id;
      this.editedItem.customedFields =
        this.estimateUpdate.estimate.customedFields;

      this.TemporaryOrPermanent();
      console.info("this.editedItem", this.editedItem);
      var modelUpdate = {
        estimate: {
          id: this.editedItem.id,
          temporary_or_permanent: this.editedItem.temporary_or_permanent,
          equipment_purchase_costs: this.editedItem.equipment_purchase_costs,
          installation_and_facilities_costs:
            this.editedItem.installation_and_facilities_costs,
          rransportation_costs: this.editedItem.rransportation_costs,
          vessel_id: this.editedItem.vessel_id,
          currency_estimate: this.editedItem.currency_estimate,
          fileName: this.editedItem.fileName,
          customedFields: this.editedItem.customedFields,
          file: this.editedItem.file,
        },
        estimate_amount: this.totalAmount,
        deleteInputs: this.deleteInputs,
      };
      //console.log('modelUpdate', modelUpdate);

      this.editestimateVesselAction(modelUpdate).then((resolve) => {
        setTimeout(() => {
          this.estimates = [...this.getestimates];
        }, 1000);
        this.editedItem.equipment_purchase_costs = "";
        this.editedItem.installation_and_facilities_costs = "";
        this.editedItem.rransportation_costs = "";
        this.editedItem.vessel_id = null;
        this.editedItem.currency_estimate = "";
        this.editedItem.id = 0;
        this.editedItem.customedFields = [];
        this.estimateUpdate.estimate.customedFields = [];
        this.editedItem.file = "";

        this.estimates = this.estimates.map((c) => {
          if (c.estimate.id == resolve.estimate.id) return resolve;
          return c;
        });
        //this.estimates = [...this.getestimates];
      });
      this.dialog = false;

      this.isAdd = true;
    },
    editItem(item) {
      this.editedIndex = this.estimates.indexOf(item) + 1;
      // this.editedItem = Object.assign({}, item);
      if (item.estimate.temporary_or_permanent == "Temporary") {
        this.switch1 = false;
      } else {
        this.switch1 = true;
      }

      console.log("item update customed_field", item);
      this.estimateUpdate = item;

      // debugger;
      if (typeof item.estimate.customed_field !== "undefined") {
        this.estimateUpdate.estimate.customedFields =
          item.estimate.customed_field;
      } else {
        //this.estimateUpdate.estimate.customedFields = [];
      }

      //
      this.editedItem.equipment_purchase_costs =
        item.estimate.equipment_purchase_costs;
      this.editedItem.installation_and_facilities_costs =
        item.estimate.installation_and_facilities_costs;
      this.editedItem.rransportation_costs = item.estimate.rransportation_costs;
      this.editedItem.vessel_id = item.estimate.vessel_id;
      this.editedItem.currency_estimate = item.estimate.currency_estimate;
      this.editedItem.temporary_or_permanent =
        item.estimate.temporary_or_permanent;
      this.editedItem.id = item.estimate.id;
      //this.editedItem.fileName = this.URL+"/"+item.estimate.fileName.filename;
      this.editedItem.fileName = item.estimate.fileName;
      this.editedItem.customedFields = item.estimate.customedFields;

      this.dialog = true;
      this.isAdd = false;
    },
    deleteItem(item) {
      this.estimateDelete = item;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    addeItem(item) {
      this.isAdd = true;
      //this.dialog = true;
      this.addEstimate();
    },
    deleteItemConfirm() {
      console.log("estimateDelete", this.estimateDelete);
      this.deleteestimateAction(this.estimateDelete).then(() => {
        this.estimates = [...this.getestimates];
      });
      // this.LoadingPage = true;

      setTimeout(() => {
        // this.LoadingPage = false;
      }, 2000);
      this.closeDelete();
    },
    close() {
      this.editedIndex = -1;
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    addclaimRoute() {
      this.$router.push({ name: "Addclaim" });
    },
    save() {
      if (this.isAdd == true) {
        //this.addeItem();
        this.isAdd = false;
        console.log("add", "");
        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        //this.closeAddSaveDialog();
      } else {
        // this.updateEstimate();

        console.log("update", "");
        //this.LoadingPage = true;

        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        // this.closeAddSaveDialog();
      }

      this.close();
    },
    refreshInputEstimate(id) {
      this.deleteInputs = [];
      this.estimateUpdate.estimate.customedFields =
        this.estimateUpdate.estimate.customedFields.filter((c) => {
          if (c.id == id) {
            this.deleteInputs.push(c);
          }
          return c.id != id;
        });
      console.info("delete array", this.deleteInputs);
      //console.table(this.estimateUpdate.estimate.customedFields);
      this.TotalAmount();
    },
    addOthers() {
      let numOr0 = (n) => (isNaN(n) ? 0 : n);

      this.incrument = parseInt(this.incrument + 1);
      var model = {
        id: this.incrument,
        estimate_id: 2,
        name: this.textFieldModel.name,
        value: this.textFieldModel.value,
      };
      this.AmountList.push(numOr0(parseFloat(this.textFieldModel.value)));
      this.estimateUpdate.estimate.customedFields.push(model);
      this.textFieldModel.name = "";
      this.textFieldModel.value = "";
    },
    addFile() {
      var formData = new FormData();
      formData.append("estimate_id", parseFloat(this.editedItem.id));
      formData.append("file", this.file);

      this.addFileAction(formData)
        .then((resolve) => {
          console.info("file done");
        })
        .catch(() => {
          //  swal("Error", "", "error");
          console.info("file err");
        });

      this.dialogimage = false;
    },
    closeDialoge() {
      this.isAdd = true;
      this.dialog = false;
    },
    deleteFile() {
      this.editedItem.vessel_id = this.geteditedOrSavedClaimVessel.id;
      this.editedItem.customedFields =
        this.estimateUpdate.estimate.customedFields;
      this.editedItem.fileName = null;

      this.TemporaryOrPermanent();
      var modelDelete = {
        estimate: {
          id: this.editedItem.id,
          temporary_or_permanent: this.editedItem.temporary_or_permanent,
          equipment_purchase_costs: this.editedItem.equipment_purchase_costs,
          installation_and_facilities_costs:
            this.editedItem.installation_and_facilities_costs,
          rransportation_costs: this.editedItem.rransportation_costs,
          vessel_id: this.editedItem.vessel_id,
          currency_estimate: this.editedItem.currency_estimate,
          fileName: null,
          customedFields: this.editedItem.customedFields,
          file: "delete",
        },
        estimate_amount: this.totalAmount,
      };
      this.editestimateVesselAction(modelDelete).then(() => {});
    },
  },
};
</script>
