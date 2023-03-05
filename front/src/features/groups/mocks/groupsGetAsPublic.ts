import { GroupRes } from "../groups-to-discover/useGetGroupsToDiscover"

const uuid = Date.now() + Math.random() + ""

export const groupsGetAsPublic: GroupRes = {
  _id: uuid,
  name: "group-name",
  members: [],
  ownerUserId: "some id",
  requestToJoin: false,
  requests: [],
}
