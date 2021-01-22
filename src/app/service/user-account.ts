export interface UserAccount {
    getName: ()=>string;
    logout: ()=>Promise<void>;
}