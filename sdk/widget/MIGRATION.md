# Objective 
I want to initialize the project. I've already built out a lot of the chat widget in another project located in Desktop/helpful-chat. The goal of this directory, openchatwidget, is to create an open source version of HelpfulChat with just the foundational stuff. 

# What to bring over 
- The Chat UI exactly as is
- The Vercel AI-SDK integration 
- Basic functionality like text streaming, etc. 
- The ability to create an agent on any node backend with text streaming. 
- The only thing configurabel on the React component side should just be URL for now. s

Call the chat widget <OpenChatWidget />

# What not to bring over 
- Do not bring over ANY live chat features or convex related things. 

Start off with the !bare bones! stuff. 


# Basic spec 
OpenChatWidget is the open source project to bring AI chat to any website. OpenChatWidget is a chat widget that lives in the bottom right corner of the website. Users who open up the chat widget can interact with the AI chat just like ChatGPT. 

We use Vercel AI SDK to power the AI experience. The front end uses the AI-SDK hook. The backend is a node server with chat streaming support. 

Basic installation via React 
```js
<OpenChatWidget 
    url={"http://localhost:3001"} // URL that points to the AI-SDK backend 
/>
```