const output=document.getElementById("practice-output"),status=document.getElementById("practice-status");
function log(value){const line=typeof value==="string"?value:JSON.stringify(value,null,2);console.log(value);output.textContent+=line+"\n";}
function reset(label){output.textContent="";status.textContent=label;}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function loadUserCallback(id,callback){setTimeout(()=>callback({id,name:`Learner ${id}`}),500);}
function getUser(id){return new Promise((resolve,reject)=>setTimeout(()=>id>0?resolve({id,name:`Learner ${id}`}):reject(new Error("User ID must be positive")),350));}
function getPosts(id){return new Promise(resolve=>setTimeout(()=>resolve([{id:1,title:`Post by user ${id}`},{id:2,title:"Learning JavaScript"}]),350));}
function getComments(postId){return new Promise(resolve=>setTimeout(()=>resolve([{postId,text:"Great work!"},{postId,text:"Thanks for sharing"}]),350));}
document.getElementById("run-order").addEventListener("click",()=>{reset("Observe the order in the console.");log("A - Start");setTimeout(()=>log("B - setTimeout callback"),0);log("C - Synchronous code");Promise.resolve().then(()=>log("D - Promise microtask"));log("E - End");});
document.getElementById("run-callback").addEventListener("click",()=>{reset("Callback returns simulated user data.");log("Loading user…");loadUserCallback(7,user=>log(`Callback received: ${JSON.stringify(user)}`));});
document.getElementById("run-chain").addEventListener("click",()=>{reset("Promise chain: user → posts → comments.");getUser(1).then(user=>{log({step:"User",user});return getPosts(user.id);}).then(posts=>{log({step:"Posts",posts});return getComments(posts[0].id);}).then(comments=>log({step:"Comments",comments})).catch(err=>log("Error: "+err.message));});
document.getElementById("run-parallel").addEventListener("click",async()=>{reset("Promise.all runs together; Promise.race returns the first result.");try{const users=await Promise.all([getUser(1),getUser(2),getUser(3)]);log({promiseAll:users});const winner=await Promise.race([wait(200).then(()=>"200 ms task"),wait(500).then(()=>"500 ms task")]);log({promiseRace:winner});}catch(err){log(err.message);}});
document.getElementById("run-async").addEventListener("click",async()=>{reset("Async/await with try/catch.");try{const user=await getUser(2);log({user});const posts=await getPosts(user.id);const comments=await getComments(posts[0].id);log({posts,comments});}catch(err){log("Caught error: "+err.message);}try{await getUser(0);}catch(err){log("Expected error handled: "+err.message);}});
