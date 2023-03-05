import { groupHandlers } from "../features/groups/mocks/groupHandlers"
import { usersApiHandlers } from "../features/users/mocks/usersApiHandlers"

/*
  you can use *server.use(
   rest.get("/api/path", funcResolver)
  )*

  so msw can mock the api inside a test
  and replace an handled path
*/

export const handlers = [...groupHandlers, ...usersApiHandlers]
