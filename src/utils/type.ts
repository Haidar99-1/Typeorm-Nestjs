export type CreateUserParms = {
    username: string;
    password: string
}

export type UpdateUserParms = {
    username: string;
    password: string
}

export type userProfileParms = {
    firstName: string;
    lastName: string;
    age: number;
    dob: string;
}


export type userUserPostParms = {
    title: string;
    description: string
}