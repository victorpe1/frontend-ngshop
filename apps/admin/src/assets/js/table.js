
window.onload = function(){
  console.log("this")
  var button = document.getElementById('btnxd');
  button.click();

  sortTable();
};

function sortTable(n) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
table = document.getElementById("example");
switching = true;
dir = "asc";
while (switching) {
switching = false;
rows = table.rows;
for (i = 1; i < (rows.length - 1); i++) {
  shouldSwitch = false;
  x = rows[i].getElementsByTagName("TD")[n];
  y = rows[i + 1].getElementsByTagName("TD")[n];
  if (dir == "asc") {
    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

      shouldSwitch = true;
      break;
    }
  } else if (dir == "desc") {
    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
      shouldSwitch = true;
      break;
    }
  }
}
if (shouldSwitch) {
  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
  switching = true;
  switchcount ++;
} else {
  if (switchcount == 0 && dir == "asc") {
    dir = "desc";
    switching = true;
  }
}
}
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("example");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
