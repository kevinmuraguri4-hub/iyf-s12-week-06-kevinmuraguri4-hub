const result=document.getElementById("challenge-output"),status=document.getElementById("challenge-status");
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const randomTask=(label)=>new Promise(resolve=>setTimeout(()=>resolve(label),150+Math.random()*500));
async function fetchUserOrDefault(id){const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);if(response.status===404)return{id:0,name:"Guest user",email:"guest@example.com"};if(!response.ok)throw new Error("Request failed");return response.json();}
async function runChallenge(name){result.textContent="";status.textContent="Running "+name+"…";try{
 if(name==="delay"){const start=Date.now();await delay(1200);result.textContent=`Promise resolved after about ${Date.now()-start} ms.`;}
 if(name==="chain"){const start=Date.now();const a=await randomTask("First task finished"),b=await randomTask("Second task finished"),c=await randomTask("Third task finished");result.textContent=[a,b,c,`Total time: ${Date.now()-start} ms`].join("\n");}
 if(name==="fallback"){const user=await fetchUserOrDefault(99999);result.textContent=JSON.stringify(user,null,2);}
 if(name==="rewrite"){const user=await fetchUserOrDefault(1);const response=await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);if(!response.ok)throw new Error("Could not load posts");const posts=await response.json();result.textContent=`Loaded ${posts.length} posts for ${user.name}.\n\n`+JSON.stringify(posts.slice(0,2),null,2);}
 if(name==="parallel"){const urls=["https://jsonplaceholder.typicode.com/users/1","https://jsonplaceholder.typicode.com/posts/1","https://jsonplaceholder.typicode.com/todos/1"];const settled=await Promise.allSettled(urls.map(async url=>{const response=await fetch(url);if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}));result.textContent=settled.map((item,index)=>`Request ${index+1}: ${item.status}\n${JSON.stringify(item.status==="fulfilled"?item.value:item.reason.message,null,2)}`).join("\n\n");}
 status.textContent="Challenge complete.";
 }catch(err){status.textContent="Challenge failed.";result.textContent=err.message+" — check your internet connection and try again.";}}
document.querySelectorAll("[data-run]").forEach(button=>button.addEventListener("click",()=>runChallenge(button.dataset.run)));
