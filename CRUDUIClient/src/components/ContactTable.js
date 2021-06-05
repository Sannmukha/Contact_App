import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";
import ContactDataService from "../services/contact.service";

class ContactTable extends Component {
  constructor(props) {
    super(props);

    this.refreshList = this.refreshList.bind(this);
    this.state = {
      showAddModal: false,
      showEditModal: false,
      currentEditIndex: null,
      contactList: []
    };
  }

  componentDidMount() {
    this.retrieveContacts();
  }

  retrieveContacts() {
    ContactDataService.getAll()
      .then(response => {
        this.setState({
          contactList: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveContacts();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  getGender = genderId => {
    return genderId === 0 ? "Male" : "Female";
  };

  /* Show or Hide "Add Contact Modal" */
  handleToggleAddModal = showState => {
    this.setState({ showAddModal: !showState });
  };

  /* Show or Hide "Edit Contact Modal", */
  /* also attach target contact id for updating. */
  handleToggleEditModal = (showState, id = null) => {
    const index = id !== null ? --id : null;
    this.setState({
      showEditModal: !showState,
      currentEditIndex: index
    });
  };

  /* Handle modals hiding if user press area outside of popup modal */
  handleHideModal = sourceComponent => {
    sourceComponent === 1
      ? this.setState({
          showAddModal: false
        })
      : this.setState({
          showEditModal: false
        });
  };

  handleDeleteContact = id => {

    ContactDataService.delete(id)
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });

  };

  /* Handle adding contact, calling from AddContactModal component. */
  handleAddContact = contact => {
    const contactList = this.state.contactList;

    ContactDataService.create(contact)
      .then(response => {
        this.refreshList();
        this.setState({ contactList, showAddModal: false });
      })
      .catch(e => {
        console.log(e);
      });

    
  };

  /* Handle updating contact, calling from EditContactModal component. */
  handleEditContact = contact => {
    const contactList = this.state.contactList;
    const targetContactIndex = contactList.findIndex(c => c.id === contact.id);
    contactList[targetContactIndex] = contact;
    this.setState({ contactList, showEditModal: false });
  };

  render() {
    // Object destructuring from this.state
    const {
      showAddModal,
      showEditModal,
      contactList,
      currentEditIndex
    } = this.state;
    return (
      <div style={{ marginTop: "1rem" }}>
        <h3>Contact List</h3>
        <Button
          variant="primary"
          className="m-2"
          size="sm"
          onClick={() => this.handleToggleAddModal(showAddModal)}
        >
          Add
        </Button>
        <Table hover bordered responsive style={{ textAlign: "center" }}>
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Rendering contact list data into table*/}
            {contactList.map(contact => (
              <tr key={contact.id}>
              
                <td style={{ width: "15%" }}>{contact.name}</td>
                <td style={{ width: "10%" }}>
                  {this.getGender(contact.gender)}
                </td>
                <td style={{ width: "15%" }}>{contact.phone}</td>
                <td style={{ width: "25%" }}>
                  <Button
                    variant="success"
                    className="m-2"
                    size="sm"
                    onClick={() =>
                      this.handleToggleEditModal(showEditModal, contact._id)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="m-2"
                    size="sm"
                    onClick={() => this.handleDeleteContact(contact._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add contact modal, with Add contact form. */}
        <AddContactModal
          show={showAddModal}
          onToggleAddModal={this.handleToggleAddModal}
          contactList={contactList}
          onAddContact={this.handleAddContact}
          onHideModal={this.handleHideModal}
        />

        {/* Edit contact modal, with edit contact form. */}
        <EditContactModal
          show={showEditModal}
          onToggleEditModal={this.handleToggleEditModal}
          currentEditContact={contactList.find(c=>c._id === currentEditIndex)}
          contactList={contactList}
          onEditContact={this.handleEditContact}
          onHideModal={this.handleHideModal}
        />
      </div>
    );
  }
}

export default ContactTable;
