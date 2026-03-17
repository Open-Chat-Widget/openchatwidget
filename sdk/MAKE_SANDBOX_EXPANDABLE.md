# Objective 

I want to be able to easily add more agents in the sandbox. Right now, an agent is a single endpoint, right now it's set to /api/chat. Look at the file @sdk/sandbox/server/index.ts

Can we make it extensible so now you can add a unique agent ID? /api/chat/<agent_id> 

That way we can easily add more agents and test all of them out and swap them around.

In index.ts, make it extensible, and route the endpoints to different files. Each agent should be it's own file. 