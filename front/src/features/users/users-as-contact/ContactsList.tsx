import { ContactsListItems } from "./ContactsListItems"
import useGetContacts from "./useGetContacts"

/** renders all contacts of the user */
export function ContactsList() {
  const { error, loading, value } = useGetContacts()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!value || error) {
    return <p>Something went wrong</p>
  }

  if (value.length === 0) {
    return <p>You don't have any contact</p>
  }

  return <ContactsListItems items={value} />
}
