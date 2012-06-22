// 
//  DataGridRenderer.js
//  Part of Mr-Data-Converter
//  
//  Created by Shan Carter on 2010-10-18.
// 


var DataGridRenderer = {
   
  //---------------------------------------
  // HTML Table
  //---------------------------------------
 
    html: function(
            dataGrid, headerNames, headerTypes, indent, newLine, id) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;

    //begin render loop
    outputText += "<table id=\"" + id + "\">" + newLine;
    outputText += indent + "<thead>" + newLine;
    outputText += indent + indent + "<tr>" + newLine;

    for (var j = 0; j < numColumns; j++) {
        outputText += indent + indent + indent + '<th class="' + headerNames[j] + '-cell">';          
        outputText += headerNames[j];
        outputText += '</th>' + newLine;
    };
    outputText += indent + indent + "</tr>" + newLine;
    outputText += indent + "</thead>" + newLine;
    outputText += indent + "<tbody>" + newLine;
    for (var i = 0; i < numRows; i++) {
        var row = dataGrid[i];
        var classes = [];
        if (i === numRows-1) {
            classes.push("lastRow");
        } else if (i === 0){
            classes.push("firstRow");
        }
        if (i % 2) {
            classes.push("even");
        } else {
            classes.push("odd");
        }
        var rowClassName = " class=\"";
        var classesLength = classes.length;
        for (j in classes) {
            rowClassName += classes[j];
            if (j == 0 && classesLength > 1) {
                rowClassName += " ";
            }
        }
        rowClassName += "\"";
        outputText += indent + indent + "<tr" + rowClassName + ">" + newLine;
        for (var j = 0; j < numColumns; j++) {
            outputText += indent + indent + indent + '<td class="' + headerNames[j] + '-cell">';          
            outputText += row[j];
            outputText += '</td>' + newLine;
        };
        outputText += indent + indent + "</tr>" + newLine;
    };
    outputText += indent + "</tbody>" + newLine;
    outputText += "</table>";

    return outputText;
    },

   
}
