import { Router } from "express"
import { groupsCtlCreate } from "../controllers/groups-controller/groupsCtlCreate"
import { groupsCtlDelete } from "../controllers/groups-controller/groupsCtlDelete"
import { groupsCtlDeleteOneMember } from "../controllers/groups-controller/groupsCtlDeleteOneMember"
import { groupsCtlGetAsMember } from "../controllers/groups-controller/groupsCtlGetAsMember"
import { groupsCtlGetAsPublic } from "../controllers/groups-controller/groupsCtlGetAsPublic"
import { groupsCtlGetMembers } from "../controllers/groups-controller/groupsCtlGetMembers"
import { groupsCtlGetProfile } from "../controllers/groups-controller/groupsCtlGetProfile"
import { groupsCtlGetRequestsMe } from "../controllers/groups-controller/groupsCtlGetRequestsMe"
import { groupsCtlGetRequestsThey } from "../controllers/groups-controller/groupsCtlGetRequestsThey"
import { groupsCtrlGetRequests } from "../controllers/groups-controller/groupsCtrlGetRequests"
import { mwGetAuthJwt } from "../middlewares/mwGetAuthJwt"

/*
updating for groups collection:
joining and leaving users of member, request list
are being prosseced in sockets,
look the name of the files 
*/

const router = Router()

/*
  getting all public groups
  GroupModel only contains public groups
 */
router.get("/", groupsCtlGetAsPublic)
/*
  getting groups where i sent a request to join
*/
router.get("/requests/me", mwGetAuthJwt, groupsCtlGetRequestsMe)
/*
  getting groups where other users sent my groups to join
 */
router.get("/requests/they", mwGetAuthJwt, groupsCtlGetRequestsThey)
/*
  getting one group without members or requests
*/
router.get("/profile/:id", mwGetAuthJwt, groupsCtlGetProfile)
/*
  getting users of requests list of some group (only admin)
*/
router.get("/:id/requests", mwGetAuthJwt, groupsCtrlGetRequests)
/*
  getting users of members list of some group (any user)
*/
router.get("/:id/members", mwGetAuthJwt, groupsCtlGetMembers)
/*
  getting all groups which user is member
*/
router.get("/all/as-member", mwGetAuthJwt, groupsCtlGetAsMember)
/*
  creating a group (action from any user)
*/
router.post("/", mwGetAuthJwt, groupsCtlCreate)
/*
  removing a member from a group (action from admin)
 */
router.delete("/members", mwGetAuthJwt, groupsCtlDeleteOneMember)
/*
  deleting a group (action from an admin)
 */
router.delete("/", mwGetAuthJwt, groupsCtlDelete)

export { router as groupsRoute }
