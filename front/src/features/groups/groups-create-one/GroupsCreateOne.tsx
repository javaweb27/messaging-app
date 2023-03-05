import styles from "./GroupsCreateOne.module.scss"
import { useState } from "react"
import { fetchJson } from "../../../lib/fetchJson"

export function GroupsCreateOne() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.container}>
      {isOpen && <GroupsCreateOneForm />}
      <button
        className={styles.btnToggle}
        onClick={() => {
          setIsOpen(cv => !cv)
        }}
      >
        {isOpen ? "Close" : "Create group"}
      </button>
    </div>
  )
}

function GroupsCreateOneForm() {
  const [form, setForm] = useState({ requestToJoin: true, name: "" })

  function handleInputChange(
    data: Pick<typeof form, "name"> | Pick<typeof form, "requestToJoin">
  ) {
    setForm(s => ({
      ...s,
      ...data,
    }))
  }

  const handleClick = async () => {
    // using try-catch?
    // console.log("creating with", form)

    const res = await fetchJson(`/api/groups`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { authorization: `jwt` },
    })

    await res.json()
    // console.log("json", json)
  }

  return (
    <form className={styles.form}>
      <label htmlFor="input-group-name">Name of group</label>

      <input
        className={styles.inputText}
        placeholder="name"
        id="input-group-name"
        type="text"
        value={form.name}
        name="name"
        onChange={e => handleInputChange({ name: e.target.value })}
      />

      <div>
        <input
          type="checkbox"
          id="input-group-mode"
          name="requestToJoin"
          checked={form.requestToJoin}
          onChange={e => handleInputChange({ requestToJoin: e.target.checked })}
        />
        <label htmlFor="input-group-mode">Require request</label>
      </div>

      <button type="button" onClick={handleClick} className={styles.btnCreate}>
        Create
      </button>
    </form>
  )
}
