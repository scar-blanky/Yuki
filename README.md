# Project Yuki :ghost:
A spending tracker app. <br>
The reason why it's called Yuki is because I've been buying too many Yuki goods lately. :sob:

> [!WARNING]
> This is an experiment project. There will be abuse of syntax and discouraged patterns. (Notably the use of 0 dependencies excluding devDependencies. Please be a sane person and use them.)

I intend to host this on Google Cloud Platform when I am done implementing some basic features.

# Run 
After putting the correct fields into `.env`, with Node 24+, a simple `npm run dev` should be all it needs. No `npm i` needed nihahaha. XD

# Host on Google Cloud Platform
This is how I did it:
1. Go to [App Engine](https://console.cloud.google.com/appengine) and configure until this page shows up: <img width="1240" height="490" alt="Screenshot 2026-02-17 at 11 42 16 PM" src="https://github.com/user-attachments/assets/a6178b61-1f5d-4037-87e8-863635e14139" />
2. Go to
   1. IAM & Admin
   2. Service Accounts
   3. Select the one that has the name "App Engine default service account" (or if you have set Service Account, select that one instead)
   4. Click on "Actions > Manage permissions"
   5. Then click the "Manage service account permissions > Manage access"
   6. Add role, the role is "Basic > Owner"
   7. Save
3. Then `gcloud init`
4. `gcloud app deploy` should be good(?

I need feedback on this on whether this works or not XD
