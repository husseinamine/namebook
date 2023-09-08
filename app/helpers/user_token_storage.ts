import AsyncStorage from "@react-native-async-storage/async-storage";

class UserTokenStorage {
    setToken: Function = (v: string) => v;

    constructor(setter: Function) {
        this.setToken = setter
    }
    async get() {
        try {
            let userToken = await AsyncStorage.getItem("userToken");
    
            if (userToken != null) {
                this.setToken(userToken)
                return userToken;
            }
        } catch (e) { console.log(e); }

        this.setToken("0")
        return "0";
    };

    async seat(value: string) {
        await AsyncStorage.setItem("userToken", value);
        this.setToken(value)
    }
};

export default UserTokenStorage;