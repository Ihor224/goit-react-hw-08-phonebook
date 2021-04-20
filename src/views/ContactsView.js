import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from '../Components/ContactList';
import ContactForm from '../Components/ContactForm';
import Filter from '../Components/Filter';
import { itemsOperations, itemsSelectors } from '../redux/contacts';

class ContactsView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />

        {this.props.isLoading && <p>...loading</p>}
        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: itemsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(itemsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
