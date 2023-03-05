import { Navigate } from "react-router-dom"
import { useLoginDataCtx } from "./global-state-context/login-data-ctx/LoginDataCtx"

interface PageAs {
  page: () => JSX.Element
}

/**
 * Verifies login data is null
 *
 * the user only can navigate in this if login data is null,
 *
 * otherwise it is redirected to Profile page
 * @returns JSX.Element
 */
export const AsPublic = ({ page: PublicPage }: PageAs) => {
  const { loginData } = useLoginDataCtx()

  if (loginData === null) return <PublicPage />

  return <Navigate to="/" />
}

/**
 * Verifies if login data results in true
 *
 * Login data is required so user can navigate in this page
 *
 * otherwise it is redirected to Login page
 * @returns JSX.Element
 */
export const AsPrivate = ({ page: PrivatePage }: PageAs) => {
  const { loginData } = useLoginDataCtx()

  if (loginData) return <PrivatePage />

  return <Navigate to="/login" />
}
