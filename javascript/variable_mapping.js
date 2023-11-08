var tableData = [
  {category:"screener",variable_name:"gender",variable_label:"Please provide your gender"},
  {category:"screener",variable_name:"age",variable_label:"Tell me your age"},
  {category:"Main Questionnair",variable_name:"Q1", variable_label:"How you satisfied with the product?"},
  {category:"screener",variable_name:"city",variable_label:"Enter your city"},
  {category:"Main Questionnair",variable_name:"Q12",variable_label:"How would you rate the product?"},
]

var table = new Tabulator("#example-table", {
  data: tableData,
  height: "76.4vh",
  layout: "fitDataStretch",
  movableRows: true,
  addRowPos: "top",
  groupBy: "category",
  columns: [
    {
      //create column group
      title: "Master Database",
      columns: [
          { title: "Variable Name",
      field: "variable_name",
      width: 400,
    //   editor: "select",
    //   editorParams: {
    //     autocomplete: true,
    //     values: {
    //       Q1: "Q1",
    //       S1: "S1",
    //       Gender: "gender",
    //       Age: "Age",
    //       Q12: "Q12",
    //     },
    //     clearable: true,
    //   },
      headerFilter: true,
    //   headerFilterParams: {
    //     autocomplete: true,
    //     values: {
    //       Q1: "Q1",
    //       S1: "S1",
    //       gender: "gender",
    //       age: "Age",
    //       Q12: "Q12",
    //     },
    //     clearable: true,
    //   },
        },
       { title: "Variable Label",
      field: "variable_label",
      width: 400,
    //   editor: "select",
    //   editorParams: {
    //     autocomplete: true,
    //     values: {
    //       Q1: "Q1",
    //       S1: "S1",
    //       Gender: "gender",
    //       Age: "Age",
    //       Q12: "Q12",
    //     },
    //     clearable: true,
    //   },
      headerFilter: true,
    //   headerFilterParams: {
    //     autocomplete: true,
    //     values: {
    //       Q1: "Q1",
    //       S1: "S1",
    //       gender: "gender",
    //       age: "Age",
    //       Q12: "Q12",
    //     },
    //     clearable: true,
    //   },
        },
      ],
    },
    {
      //create column group
      title: "Uploaded Data File",
      columns: [
        { title: "Variable Name",
      field: "variable_name_file",
      width: 400,
      editor: "select",
      editorParams: {
        autocomplete: true,
        values: data2,
        clearable: true,
      },
      headerFilter: true,
      headerFilterParams: {
        autocomplete: true,
        values: data2,
        clearable: true,
      },
        },
      ],
    },
  ],
});


//Add row on "Add Row" button click
document
  .getElementById("add-row-screener")
  .addEventListener("click", function () {
    table.addRow({});
  });


//Delete row on "Delete Row" button click
document
  .getElementById("submit-screener")
  .addEventListener("click", function () {
    window.location.href = "value-mapping_reference.php";
  });

//Add row on "Add Row" button click
document.getElementById("next")
  .addEventListener("click", function () {
    window.location.href = "view.php";
  });
