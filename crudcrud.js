function getData(event) {
  event.preventDefault();
  const ch1 = document.getElementById("name").value;
  console.log(ch1);
  const ch2 = document.getElementById("email").value;
  const ch3 = document.getElementById("phn").value;

  const obj = {
    ch1,
    ch2,
    ch3,
  };
  console.log(obj);
  axios
    .post(
      "https://crudcrud.com/api/ed07253fb3344135a05a8030d9406979/studenData",
      obj
    )
    .then((res) => {
      showonScreen(res.data);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something Error</h4>";
      console.log(err);
    });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/ed07253fb3344135a05a8030d9406979/studenData")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        showonScreen(res.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showonScreen(obj) {
  // document.getElementById('name').value='';
  // document.getElementById('email').value='';
  // document.getElementById('phn').value='';
  const parentNode = document.getElementById("list");
  const childNode = `<li id=${obj._id}>${obj.ch1}-${obj.ch2}
    <button onclick=deleteUser('${obj._id}')>Delete</button>
    <button onclick=editUser('${obj.ch1}','${obj.ch2}','${obj.ch3}','${obj._id}')>Edit</button>
    </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childNode;
}
function editUser(name,email,phn,objId) {
    document.getElementById('name').value=name;
    document.getElementById('email').value=email;
    document.getElementById('phn').value=phn;
 deleteUser(objId)
}


function deleteUser(objId) {
  axios
    .delete(
      `https://crudcrud.com/api/ed07253fb3344135a05a8030d9406979/studenData/${objId}`
    )
    .then((res) => {
      removeFromScreem(objId);
    })
    .catch((err) => {
      console.log(err);
    });
}
function removeFromScreem(objId) {
  const parentNode = document.getElementById("list");
  const childtobedeleted = document.getElementById("objId");
  if (childtobedeleted) {
    parentNode.removeChild(childtobedeleted);
  }
}
