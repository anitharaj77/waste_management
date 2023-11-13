var tableData = [
  {variable_name:"Gender", value:1, label:"Male", udf_variable_name:"Gender", udf_value:1, udf_label:"Male"},
  {variable_name:"Gender", value:2, label:"Female", udf_variable_name:"Gender", udf_value:2, udf_label:"Female"},
  {variable_name:"Q1", value:1, label:"Very dissatisfied", udf_variable_name:"Q1", udf_value:1, udf_label:"Very dissatisfied"},
  {variable_name:"Q1", value:2, label:"Dissatisfied", udf_variable_name:"Q1", udf_value:2, udf_label:"Dissatisfied"},
  {variable_name:"Q1", value:3, label:"Neither satisfied nor dissatisfied", udf_variable_name:"Q1", udf_value:3, udf_label:"Neither satisfied nor dissatisfied"},
  {variable_name:"Q1", value:4, label:"Satisfied", udf_variable_name:"Q1", udf_value:4, udf_label:"Satisfied"},
  {variable_name:"Q1", value:5, label:"Very satisfied", udf_variable_name:"Q1", udf_value:5, udf_label:"Very satisfied"},
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
          width: 256,
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
          width: 256,
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
        // {title:"New Code", field:"new_code", hozAlign:"center", width:110,editor:"number"},
      ],
    },
  ],
});

// Add row on "Add Row" button click
document.getElementById("next").addEventListener("click", function(){
  window.location.href = "value-mapping.php";
});

//Delete row on "Delete Row" button click
document.getElementById("back").addEventListener("click", function () {
  window.location.href = "variable-mapping.php";
});
