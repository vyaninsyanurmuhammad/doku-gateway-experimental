import { v4 } from "uuid"

const requestId = v4()
const now = new Date()
export const timeStampString = now.getTime()
export const utcString = now.toISOString().slice(0, 19) + "Z"


export const DokuVariablesData = {
    Client_Id: "BRN-0261-1701964375234",
    Request_Id: requestId,
    Request_Timestamp: utcString,
    SecretKey: "SK-l9ZHunRxx0vYrBPPOI15"
}