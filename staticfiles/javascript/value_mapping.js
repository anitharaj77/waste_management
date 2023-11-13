var tableData = [
  {variable_name:"city", value:1, label:"Mumbai", udf_variable_name:"city", udf_value:1, udf_label:"Bangalore"},
  {variable_name:"city", value:2, label:"Delhi", udf_variable_name:"city", udf_value:2, udf_label:"Mumbai"},
  {variable_name:"city", value:3, label:"Bangalore", udf_variable_name:"city", udf_value:3, udf_label:"Delhi"},
]

var table = new Tabulator("#example-table", {
  data: tableData,
  height: "76.4vh",
  layout: "fitDataStretch",
  movableRows: true,
  groupBy: "variable_name",
  columns: [
    {
      //create column group
      title: "Master Database",
      columns: [
        {
          title: "Variable Name",
          field: "variable_name",
          width: 202,
          editor: "select",
          editorParams: {
            autocomplete: "true",
            values: {
              Q1: "Q1",
              S1: "S1",
              Gender: "Gender",
              Age: "Age",
              Q12: "Q12",
            },
            clearable: true,
          },
          headerFilter: true,
          headerFilterParams: {
            autocomplete: "true",
            values: {
              Q1: "Q1",
              S1: "S1",
              Gender: "Gender",
              Age: "Age",
              Q12: "Q12",
            },
            clearable: true,
          },
        },
        { title: "Value", field: "value", hozAlign: "center", width: 100 },
        { title: "Label", field: "label", hozAlign: "center", width: 250 },
      ],
    },
    {
      //create column group
      title: "Uploaded Data File",
      columns: [
        {
          title: "Variable Name",
          field: "udf_variable_name",
          width: 202,
          editor: "select",
          editorParams: {
            autocomplete: "true",
            values: {
              Q1: "Q1",
              S1: "S1",
              Gender: "Gender",
              Age: "Age",
              Q12: "Q12",
            },
            clearable: true,
          },
          headerFilter: true,
          headerFilterParams: {
            autocomplete: "true",
            values: {
              Q1: "Q1",
              S1: "S1",
              Gender: "Gender",
              Age: "Age",
              Q12: "Q12",
            },
            clearable: true,
          },
        },
        {
          title: "Value",
          field: "udf_value",
          hozAlign: "center",
          width: 100,
        },
        {
          title: "Label",
          field: "udf_label",
          hozAlign: "center",
          width: 250,
        },
        {
          title: "New Code",
          field: "new_code",
          hozAlign: "center",
          width: 110,
          editor: "number",
        },
      ],
    },
  ],
});

// Add row on "Add Row" button click
document.getElementById("next").addEventListener("click", function(){
    window.location.href = "MIS_status.php";
});

//Delete row on "Delete Row" button click
document.getElementById("back").addEventListener("click", function () {
  window.location.href = "value-mapping_reference.php";
});
