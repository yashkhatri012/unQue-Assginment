import Lead from "../models/model.js";

export async function databaseEntry(data) {
    const leadgenId = data?.id;
// graph API response structure for lead data
//     "field_data": [
//   {
//     "name": "full_name",
//     "values": ["Yash Khatri"]
//   },
//   {
//     "name": "email",
//     "values": ["abc@gmail.com"]
//   }
// ]
    const name = data?.field_data?.find(field => field.name === "full_name")?.values?.[0];
    const email = data?.field_data?.find(field => field.name === "email")?.values?.[0];

    const existingLead = await Lead.findOne({ leadgenId: leadgenId });
    if (existingLead) {
        console.log("Lead already exists in the database.");
        return;
    }
    const newLead = await Lead.create({
        leadgenId: leadgenId,
        name: name,
        email: email
    });    

    

    if(!newLead){
        throw new Error("Failed to create new lead in the database.");
    }
    return newLead;
}