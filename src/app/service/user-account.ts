export interface UserAccount {
    getName: ()=>Promise<string>;
    logout: ()=>Promise<void>;
}