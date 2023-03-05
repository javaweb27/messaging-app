import { GroupRes } from "../groups-as-member/useGetGroupsAsMember"

const uuid = Date.now() + Math.random() + ""

export const groupsGetAsMemberRes: GroupRes = {
  _id: uuid,
  name: "group-name",
  members: [],
  ownerUserId: "some id",
  requestToJoin: false,
  requests: [],
}
