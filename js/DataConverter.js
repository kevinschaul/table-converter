// 
//  DataConverter.js
//  Mr-Data-Converter
//  
//  Created by Shan Carter on 2010-09-01.
//  Modified by Kevin Schaul.
// 


function DataConverter(nodeId) {

//---------------------------------------
// PUBLIC PROPERTIES
//---------------------------------------

    this.outputDataTypes = [ 
        {"text":"HTML", "id":"html", "notes":""},
        {"text":"JSON - Properties", "id":"json", "notes":""},
        {"text":"JSON - Column Arrays", "id":"jsonArrayCols", "notes":""},
        {"text":"JSON - Row Arrays", "id":"jsonArrayRows", "notes":""}
    ];
    this.outputDataType         = "html";

    this.columnDelimiter        = "\t";
    this.rowDelimiter           = "\n";

    this.inputTextArea          = $("#dataInput");
    this.outputTextArea         = $("#dataOutput");
    this.dataSelect             = $("#dataSelector");
    this.previewDiv             = "#preview";

    this.inputText              = "";
    this.outputText             = "";

    this.newLine                = "\n";
    this.indent                 = "  ";

    this.commentLine            = "//";
    this.commentLineEnd         = "";
    this.tableName              = "MrDataConverter"

    this.useUnderscores         = true;
    this.headersProvided        = true;
    this.downcaseHeaders        = true;
    this.upcaseHeaders          = false;
    this.includeWhiteSpace      = true;
    this.useTabsForIndent       = false;

}

//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

DataConverter.prototype.create = function() {
    var self = this;

    this.outputTextArea.click(function(evt) {
        this.select();
    });

    $("#dataInput").keyup(function() {
        self.convert();
    });

    $("#dataInput").change(function() {
        self.convert();
    });

    $("#dataSelector").bind("change",function(evt){
        self.outputDataType = $(this).val();
        self.convert();
    });
}


DataConverter.prototype.convert = function() {

    this.inputText = this.inputTextArea.val();
    this.outputText = "";

    if (this.inputText.length > 0) {

        if (this.includeWhiteSpace) {
            this.newLine = "\n";
        } else {
            this.indent = "";
            this.newLine = "";
        }

        CSVParser.resetLog();
        var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

        var dataGrid = parseOutput.dataGrid;
        var headerNames = parseOutput.headerNames;
        var headerTypes = parseOutput.headerTypes;
        var errors = parseOutput.errors;

        this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);
        this.outputTextArea.val(errors + this.outputText);

        $(this.previewDiv).html(this.outputText);

    };
}

