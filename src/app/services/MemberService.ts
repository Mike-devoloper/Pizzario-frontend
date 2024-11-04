import axios from "axios";
import { serverApi } from "../../lib/data/config";
import { Member } from "../../lib/data/types/member";


class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getTopUsers():Promise<Member[]> {
        try {
            const url = this.path + "/member/top-users"
            const result = await axios.get(url)
            console.log("MEmebers", result);
            return result.data;
        } 
        catch (err) {
            console.log("ERR => GET MEMBERS", err);
            throw err;
        }
    }

    public async getRestaurant():Promise<Member> {
        try {
            const url = this.path + "/member/restaurant"
            const result = await axios.get(url)
            console.log("getRestaurant", result);
            return result.data;
        } catch (err) {
            console.log("ERROR on getRestaurant ", err)
            throw err
        }
    }
}

export default MemberService;