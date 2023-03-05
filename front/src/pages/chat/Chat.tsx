import styles from "./Chat.module.scss"
import SideLeft from "../../layout-structures/sidel-left/SideLeft"
import { ChatCurrentContainer } from "../../features/chat/uniques/ChatCurrentContainer"
import { RequestsPagesContainer } from "../../features/requests-pages/RequestsPagesContainer"
import { ProfilesView } from "../../features-integrations/ProfilesView"
import { useSideRightCtx } from "../../layout-structures/side-right/SideRightContext"

export default function Chat() {
  const { view } = useSideRightCtx()

  return (
    <div className={styles.layout}>
      <section
        className={`${styles.section} ${styles.sideLeftContainer}`}
        style={{ position: "relative" }}
      >
        <SideLeft />
      </section>
      <section
        className={`${styles.section} ${styles.sideRightContainer} ${
          view.mode === null ? styles.notActive : ""
        }`}
      >
        <ChatCurrentContainer />
        <ProfilesView />
        <RequestsPagesContainer />
      </section>
    </div>
  )
}
