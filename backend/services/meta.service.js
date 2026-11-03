 
 
 export async function extractLeadData (leadgenId) {
  
  try {
    const response = await fetch(`https://graph.facebook.com/${process.env.META_GRAPH_API_VERSION}/${leadgenId}?access_token=${process.env.META_PAGE_ACCESS_TOKEN}`);
    if(!response.ok){
      throw new Error(`Failed to fetch lead data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    throw error;
  }
}
