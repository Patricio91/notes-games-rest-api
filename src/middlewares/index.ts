import * as isUser from "./validateRole";
import * as isAdmin from "./validateRole";
import * as validateId from "./validateId";

export interface IPayload {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

export { isUser, isAdmin, validateId };