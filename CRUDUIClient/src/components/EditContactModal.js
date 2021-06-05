import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/ModalStyles.css";

class EditContactModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: ["Male", "Female"]
    };
  }

  /* Edit contact function */
  handleEdit = id => {
    let valid = true; // default validity is true, turn false if validation error occurs.
    const name = document.getElementById("name").value;
    const genderSelection = document.getElementById("gender");
    const gender = genderSelection.options[genderSelection.selectedIndex].value;
    const phone = document.getElementById("phone").value;
    const nameError = document.getElementById("nameError");
    const genderError = document.getElementById("genderError");
    const phoneError = document.getElementById("phoneError");

    // Existing contact list Contact Table compoenent.
    // Used for duplicate contact validation.
    const contactList = this.props.contactList;

    if (!name) {
      // If name is empty
      nameError.innerHTML = "Name cannot be empty.";
      nameError.className = "displayErrorMsg";
      document.getElementById("name").style.border = "1px solid red";
      valid = false;
      // Show error message for 5 seconds.
      setTimeout(function() {
        nameError.className = "hiddenErrorMsg";
      }, 5000);
    } else {
      document.getElementById("name").style.border = "";
      nameError.className = "hiddenErrorMsg";
    }

    if (gender !== "0" && gender !== "1") {
      // Check if gender is not either "0" or "1",
      // prevent user from abusing gender id from Developer Tools.
      genderError.innerHTML =
        "Invalid gender, please refresh the page and try again.";
      genderError.className = "displayErrorMsg";
      document.getElementById("gender").style.border = "1px solid red";
      valid = false;
      // Show error message for 5 seconds.
      setTimeout(function() {
        genderError.className = "hiddenErrorMsg";
      }, 5000);
    } else {
      document.getElementById("gender").style.border = "";
      genderError.className = "hiddenErrorMsg";
    }

    if (!phone) {
      // If phone is empty
      phoneError.innerHTML = "Phone number cannot be empty.";
      phoneError.className = "displayErrorMsg";
      document.getElementById("phone").style.border = "1px solid red";
      valid = false;
      // Show error message for 5 seconds.
      setTimeout(function() {
        phoneError.className = "hiddenErrorMsg";
      }, 5000);
    } else if (
      // Check if duplicate phone number exist in contact list.
      // Check if duplicated phone number's owner is current editting target.
      contactList.some(
        contact => contact.phone === Number(phone) && contact.id !== id
      )
    ) {
      phoneError.innerHTML = "Phone number already exist.";
      phoneError.className = "displayErrorMsg";
      document.getElementById("phone").style.border = "1px solid red";
      valid = false;
      setTimeout(function() {
        phoneError.className = "hiddenErrorMsg";
      }, 5000);
    } else {
      document.getElementById("phone").style.border = "";
      phoneError.className = "hiddenErrorMsg";
    }

    // If all form validation passed, proceed contact creation.
    if (valid) {
      const contact = {
        id: id,
        name: name,
        gender: gender,
        phone: phone
      };

      // Pass updated contact object to parent component for updating.
      this.props.onEditContact(contact);
    }
  };

  render() {
    const { gender } = this.state;
    let { show, onToggleEditModal, currentEditContact } = this.props;
    let editContact = { ...currentEditContact }; // Target contact for editting.
    return (
      <Modal show={show} onHide={() => this.props.onHideModal(2)}>
        <Modal.Header>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-block col-md-12 col-sm-12 col-xs-12">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                id="name"
                defaultValue={editContact.name}
              />
              <small className="hiddenErrorMsg" id="nameError" />
            </div>
            <div className="form-block col-md-12 col-sm-12 col-xs-12">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                defaultValue={editContact.gender}
              >
                {gender.map((g, index) => (
                  <option key={index} value={index}>
                    {g}
                  </option>
                ))}
              </select>
              <small className="hiddenErrorMsg" id="genderError" />
            </div>

            <div className="form-block col-md-12 col-sm-12 col-xs-12">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phone"
                id="phone"
                maxLength="10"
                defaultValue={editContact.phone}
              />
              <small className="hiddenErrorMsg" id="phoneError" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* Editting contact */}
          {/* Passing target contact id */}
          <Button
            variant="success"
            onClick={() => this.handleEdit(editContact.id)}
          >
            Update
          </Button>
          {/* Closing modal */}
          <Button variant="danger" onClick={() => onToggleEditModal(show)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditContactModal;
