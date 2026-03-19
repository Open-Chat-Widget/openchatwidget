# Objective 
I want the AI to be able to handle uploading attachments. Things such as upload images and PDFs, etc. 

The user should be able to upload the attachment by clicking on the "+" sign in sdk/widget/src/components/Composer.tsx and selectting on the file. They should also be able to drag and drop a file from their computer into the chat widget. 

Upon uploading the file, the Composer should show a very small attachment preview of what they've attached. 

Upon hitting submit with the attachment, the attachments, along with the message, should be sent to Vercel AI-SDK on the backend. 

# Consider
Also consider how we can handle images on the backend too. I want to be able to do cool workflows like ask the AI "What is in this image" and it be able to tell me what it is by analyzing the image. 