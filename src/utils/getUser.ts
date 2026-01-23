"use server"

import { Get } from "@/libs/Fetch";


export default async function getUser(){
    const userResponse = await Get('user');
    
    if (!!userResponse.id){ 
        // if has id, then has an User
        return userResponse;
    }

    return null;
}