/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row);
  }
};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Vote/Add",
    functionName : "renderUi"
  },{
    name : "Get Columns",
    functionName : "getColumnts"
  }];
  sheet.addMenu("PLUG Vote/Add", entries);
};

function onEdit(event) {

   var sheet = SpreadsheetApp.getActiveSpreadsheet();
   var cell = sheet.getActiveCell();
   
}

var topics = []; //['SELinux', 'nagios', 'blah'];

function getTopics() {
  if (topics.length != 0) {
    return topics;
  }
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var stuff = sheet.getRange("B2:B50").getValues();
  for (var i=0;i<5;i++) {
    topics.push(stuff[i][0]);
  }
  //var range = sheet.getSheetName("Sheet1").getRange(1,1);
  return topics;
}

function voteFor(event) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var name = Browser.inputBox("what's your name?");
  sheet.appendRow([name, topics]);
  sheet.appendRow([name, topics[event.parameter.source]]);
}

function renderUi() {
  getTopics();
  
  var app = UiApp.createApplication().setTitle('PLUG Topics: Vote/Add');
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getActiveSheet();
  sheet.appendRow(["fdsa"]);
  var row = sheet.getActiveRange().getRowIndex();
  // Create a grid with 5 text boxes and corresponding labels
  var grid = app.createGrid(topics.length, 2);

  for (var i = 0; i<topics.length; i++){
    var button = app.createButton('Vote ' + topics[i]);
    var handler = app.createServerClickHandler('voteFor');
    handler.addCallbackElement(grid);
    button.addClickHandler(handler);
    button.setId(i);
    grid.setWidget(i, 0, app.createLabel(topics[i]));
    grid.setWidget(i, 1, button);
  }
  
  // Create a vertical panel..
  var panel = app.createVerticalPanel();

  // ...and add the grid to the panel
  panel.add(grid);

  // Add the button to the panel and the panel to the application, then display the application app in the spreadsheet
  panel.add(button);
  app.add(panel);
  doc.show(app);
}
