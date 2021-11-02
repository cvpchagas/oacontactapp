import React, { useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Editicon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/AccountCircle';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// import logoregister from './assets/contact.png';

function App() {

  const baseurl = "https://localhost:44378/api/v1/Contact";
  const [data, setData] = useState([]);
  const [updateData, setUpdateData]=useState(true);

  const [modalAdd, setModalAdd]=useState(false);
  const [modalEdit, setModalEdit]=useState(false);
  const [modalRemove, setModalRemove]=useState(false);

  const [selectedcontact,setSelectedContact]=useState(
    {
      id: '',
      name: '',        
      cpf: '',  
      birthday: '',  
      gender: '',  
      addressZipCode: '',  
      addressCountry: '',  
      addressState: '',  
      addressCity: '',  
      addressDescription: '',  
      addressComplement: '' 
    })

    const handleChange=e=>{
      const {name, value}=e.target;
      setSelectedContact({
        ...selectedcontact,
        [name]: value
      });
      console.log(selectedcontact);
    }

const selectContact=(contact, action)=>{
  setSelectedContact(contact);
  (action==="remove") ? OpenColseModalRemove():OpenColseModalEdit(); 
}
//#region API Get Control (Get All Contacts)
  const contactget = async () => {
    await axios.get(baseurl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    if(updateData){
      contactget();
      setUpdateData(false);
    }
  },[updateData])

//#endregion

//#region API POST Control (Add Contact)
const contactpost = async () => {
  delete selectedcontact.id;
  await axios.post(baseurl,selectedcontact)
    .then(response => {
      setData(data.concat(response.data));
      setUpdateData(true);
      OpenColseModalAdd();
    }).catch(error => {
      console.log(error);
    })
}

//#endregion

//#region API PUT Control (Add Contact)
  const contactput = async () => {
    await axios.put(baseurl + "/" + selectedcontact.id, selectedcontact)
      .then(response => {
        var result = response.data;
        var dataaux = data;
        dataaux.map(contact => {
          if (contact.id === selectedcontact.id) {
            contact.name = selectedcontact.name;
            contact.cpf = selectedcontact.cpf;
            contact.birthday = selectedcontact.birthday;
            contact.gender = selectedcontact.gender;
            contact.addressZipCode = selectedcontact.addressZipCode;
            contact.addressCountry = selectedcontact.addressCountry;
            contact.addressState = selectedcontact.addressState;
            contact.addressCity = selectedcontact.addressCity;
            contact.addressDescription = selectedcontact.addressDescription;
            contact.addressComplement = selectedcontact.addressComplement;
          }
        });
        OpenColseModalEdit();
      }).catch(error => {
        console.log(error);
      })
}

//#endregion

//#region API DELETE Control (Remove Contact by Id)
const contactdelete = async () => {
  await axios.delete(baseurl+"/"+ selectedcontact.id)
    .then(response => {
      setData(data.filter(contact=> contact.id !== response.data));
      setUpdateData(true);
      OpenColseModalRemove();
    }).catch(error => {
      console.log(error);
    })
}

//#endregion

//#region Modal Add Control
const OpenColseModalAdd=()=>{
  setModalAdd(!modalAdd);
}
//#endregion

//#region Modal Edit Control
const OpenColseModalEdit=()=>{
  setModalEdit(!modalEdit);
}
//#endregion

//#region Modal Remove Control
const OpenColseModalRemove=()=>{
  setModalRemove(!modalRemove);
}
//#endregion
 

return (
    <div className="contact-container">
      <br />
      <h3>Open assessment - Contacts</h3>
      <br />
      <header>
        {/* <img scr={logoregister} alt='Register' /> */}
        <button className="btn btn-success" onClick={()=>OpenColseModalAdd()}>Add contact</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>CPF</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Zip Code</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Address</th>
            <th>Address Complement</th>
          </tr>
        </thead>
        <tbody>
          {data.map(contact => (
            <tr key={contact.id}>
              {/* <td>{contact.id}</td> */}
              <td>{contact.name}</td>
              <td>{contact.cpf}</td>
              <td>{contact.birthday}</td>
              <td>{contact.gender}</td>
              <td>{contact.addressZipCode}</td>
              <td>{contact.addressCountry}</td>
              <td>{contact.addressState}</td>
              <td>{contact.addressCity}</td>
              <td>{contact.addressDescription}</td>
              <td>{contact.addressComplement}</td>
              <td>
                {/* <button className="btn btn-primary"  onClick={()=>selectContact(contact,"edit")}>Edit</button> */}

                <IconButton aria-label="edit"  className="action-button-primary"
							           onClick={()=>selectContact(contact,"edit")}>
								<Editicon/>
							</IconButton>
                 {/* {"  "} */}
                 <IconButton aria-label="remove"  className="action-button-primary"
							           onClick={()=>selectContact(contact,"remove")}>
								<RemoveIcon/>
							</IconButton>
                {/* <button className="btn btn-danger" onClick={()=>selectContact(contact,"remove")}>Remove</button> */}
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalAdd}>
        <ModalHeader>Contact Informations</ModalHeader>
        <ModalBody>
          <div class="form-group">
            <input type="hidden" name="id" onChange={handleChange}/>
            <span class="text-danger">*</span><label>Name:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Name" name="name" max="200" onChange={handleChange}/>
            <label>CPF:</label>
            <input class="form-control form-contol-lg" placeholder="000.000.000-00" mask="000.000.000-00" max="14" name="cpf" onChange={handleChange} />
            <label>Birthday:</label>
            <input class="form-control form-contol-lg" placeholder="" mask="YYYY-MM-DD" max="10" name="birthday" onChange={handleChange}/>
            <label>Gender:</label>
            <input class="form-control form-contol-lg" placeholder="" max="200" name="gender" onChange={handleChange} />
            <label>Zip Code:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Zip Code" max="200" name="addressZipCode" onChange={handleChange}/>
            <label>Country:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Country" max="200" name="addressCountry" onChange={handleChange}/>
            <label>State:</label>
            <input class="form-control form-contol-lg" placeholder="Contact State" max="2" name="addressState" onChange={handleChange}/>
            <label>City:</label>
            <input class="form-control form-contol-lg" placeholder="Contact City" max="200" name="addressCity" onChange={handleChange}/>
            <label>Address:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Address Line 1" max="500"  name="addressDescription" onChange={handleChange}/>
            <label>Address Complement:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Address Line 2" max="1000" name="addressComplement" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
            {/* <button className="btn btn-primary" onClick={()=>contactpost()}>Save</button> */}
            <IconButton aria-label="save"  className="action-button-primary"
							           onClick={()=>contactpost()}>
								<SaveIcon/>
							</IconButton>
            {"   "}
            {/* <button className="btn btn-danger" onClick={()=>OpenColseModalAdd()}>cancel</button> */}
            <IconButton aria-label="cancel"  className="action-button-primary"
							           onClick={()=>OpenColseModalAdd()}>
								<CloseIcon/>
							</IconButton>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Contact Informations</ModalHeader>
        <ModalBody>
          <div class="form-group">
            <h4>Contact Id: {selectedcontact && selectedcontact.id}</h4>
            <span class="text-danger">*</span><label>Name:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Name" name="name" max="200" onChange={handleChange} value={selectedcontact && selectedcontact.name}/>
            <label>CPF:</label>
            <input class="form-control form-contol-lg" placeholder="000.000.000-00" mask="000.000.000-00" max="14" name="cpf" onChange={handleChange} value={selectedcontact && selectedcontact.cpf}/>
            <label>Birthday:</label>
            <input class="form-control form-contol-lg" placeholder="" mask="YYYY-MM-DD" max="10" name="birthday" onChange={handleChange} value={selectedcontact && selectedcontact.birthday}/>
            <label>Gender:</label>
            <input class="form-control form-contol-lg" placeholder="" max="200" name="gender" onChange={handleChange} value={selectedcontact && selectedcontact.gender} />
            <label>Zip Code:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Zip Code" max="200" name="addressZipCode" onChange={handleChange} value={selectedcontact && selectedcontact.addressZipCode}/>
            <label>Country:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Country" max="200" name="addressCountry" onChange={handleChange} value={selectedcontact && selectedcontact.addressCountry}/>
            <label>State:</label>
            <input class="form-control form-contol-lg" placeholder="Contact State" max="2" name="addressState" onChange={handleChange} value={selectedcontact && selectedcontact.addressState}/>
            <label>City:</label>
            <input class="form-control form-contol-lg" placeholder="Contact City" max="200" name="addressCity" onChange={handleChange} value={selectedcontact && selectedcontact.addressCity}/>
            <label>Address:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Address Line 1" max="500"  name="addressDescription" onChange={handleChange} value={selectedcontact && selectedcontact.addressDescription}/>
            <label>Address Complement:</label>
            <input class="form-control form-contol-lg" placeholder="Contact Address Line 2" max="1000" name="addressComplement" onChange={handleChange} value={selectedcontact && selectedcontact.addressComplement}/>
          </div>
        </ModalBody>
        <ModalFooter>
            {/* <button className="btn btn-primary" onClick={()=>contactput()}>Save</button>{"   "}
            <button className="btn btn-danger" onClick={()=>OpenColseModalEdit()}>cancel</button> */}

            <IconButton aria-label="save"  className="action-button-primary"
							           onClick={()=>contactput()}>
								<SaveIcon/>
							</IconButton>
            {"   "}
            <IconButton aria-label="cancel"  className="action-button-primary"
							           onClick={()=>OpenColseModalEdit()}>
								<CloseIcon/>
							</IconButton>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalRemove}>
        <ModalBody>
          The contact {selectedcontact && selectedcontact.name} will be removed. Do you confirm?
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-danger" onClick={()=>contactdelete()}>Yes</button>
            <button className="btn btn-secundary" onClick={()=>OpenColseModalRemove()}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;