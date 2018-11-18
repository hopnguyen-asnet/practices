// Create variable to save all users
var userList = [];

// Define utility functions
function setValueByElement(elementName, valueNeedSet) {
  return document.getElementById(elementName).value = valueNeedSet;
}

function getValueByElement(elementName) {
  return document.getElementById(elementName).value;
}

function resetValueByElement(elementName) {
  return document.getElementById(elementName).value = '';
}

/**
 * Resets the values of all input
 */
function clearForm() {
    resetValueByElement('firstName');
    resetValueByElement('lastName');
    resetValueByElement('birthday');
    resetValueByElement('sex');
}

/**
 * Return table = null,
 * Then, insert userList to table if length of userList array > 0.
 * @param {*} userList
 */
function reloadTable(userList) {
  document.getElementById("rowsTable").innerHTML = "";
  if(userList) {
    for (var i = 0; i < userList.length; i++) {
      userObj = userList[i];
      createTableCell(userObj);
    }
  }
}

/**
 * Insert user object to Table
 * @param {*} userObj
 */
function createTableCell(userObj) {
  var table = document.getElementById("rowsTable");
  var row = table.insertRow();
  var idUserCell = row.insertCell(0);
  var firstNameCell = row.insertCell(1);
  var lastNameCell = row.insertCell(2);
  var birthdayCell = row.insertCell(3);
  var sexCell = row.insertCell(4);
  var actionCell = row.insertCell(5);
  idUserCell.innerHTML = userObj.idUser;
  firstNameCell.innerHTML = userObj.firstName;
  lastNameCell.innerHTML = userObj.lastName;
  birthdayCell.innerHTML = userObj.birthday;
  sexCell.innerHTML = userObj.sex;
  actionCell.innerHTML = '<button onclick="populateUser(' + userObj.idUser + ')">Edit</button><br/><button onclick="deleteUser(' + userObj.idUser + ')">Delete</button>';
}

/**
 * Retrieves the value from the input form
 * Then, pushes it into the UserList array if index = -1
 * or change the object if the index isn't -1
 */
var addUser = function() {
  let idUser = Math.floor(Math.random() * 100);
  let firstName = getValueByElement('firstName');
  let lastName = getValueByElement('lastName');
  let birthday = getValueByElement('birthday');
  let sex = getValueByElement('sex');
  let userObj = {
    idUser: idUser,
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    sex: sex
  };

  // Push new user to user list
  userList.push(userObj);
  console.log(userList);
  // Reload table
  reloadTable(userList);
  clearForm();
}

/**
 * Removes object with the selected idUser
 * @param {*} idUser
 */
function deleteUser(idUser) {
  // Find the object with the selected id
  for (var i=0; i < userList.length; i++) {
    if(userList[i].idUser = idUser){
      userList.splice(i, 1);
      reloadTable(userList);
      return false;
    }
  }
}

/**
 * Update object with the selected idUser
 * @param {*} idUser
 */
function populateUser(id) {
  // Find the object with the selected id
  for (var i=0; i < userList.length; i++) {
    if(parseInt(userList[i].idUser) === id) {
      var userObj = userList[i];

      // populate value from userObj into form
      setValueByElement('firstName', userObj.firstName);
      setValueByElement('lastName', userObj.lastName);
      setValueByElement('birthday', userObj.birthday);
      setValueByElement('sex', userObj.sex);

      // Change the Add button to Update
      document.getElementById('addBtn').className = 'hide';
      document.getElementById('editBtn').classList.remove("hide");
      editBtn.innerHTML = '<button class="btn-edit" id="updateUser" onclick="updateUser(' + i + ')">Update User</button>';
    }
  }
}

var updateUser = function(index, id) {
  let firstName = getValueByElement('firstName');
  let lastName = getValueByElement('lastName');
  let birthday = getValueByElement('birthday');
  let sex = getValueByElement('sex');
  // Show add button and hide update button
  document.getElementById('addBtn').classList.remove("hide");
  document.getElementById('editBtn').className = 'hide';

  var userObj = {
    idUser: userList[index].idUser,
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    sex: sex
  };

  // Update object in array based on index
  userList[index] = userObj;

  reloadTable(userList);
  clearForm();
}
