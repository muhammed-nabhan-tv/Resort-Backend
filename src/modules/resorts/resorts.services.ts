import Resort from "../../models/resort.model";

export const getAllResorts = async ()=>{
    return await Resort.find().sort({createdAt: -1});
}

export const getResortById = async (id:string)=>{
    return await Resort.findById(id);
}