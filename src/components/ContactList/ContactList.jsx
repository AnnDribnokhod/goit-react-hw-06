import React, { useEffect, useState } from "react";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const filterValue = useSelector(selectNameFilter);

  useEffect(() => {
    const normalizedFilter = filterValue.toLowerCase();
    const filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    setFilteredContacts(filterContacts);
  }, [contacts, filterValue]);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
}
