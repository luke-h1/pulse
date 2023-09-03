

## TODOS:

* Get inspo for UI styles we'll need - number input etc. ✅
* Use zod for FE validation ✅

API:
  * project CRUD ✅
  * post CRUD ✅
  * user CRUD ✅
  * slugs instead of querying by IDs ✅
  * Roles ✅
  * Sort GQL verbage ✅
  * create queries (FE) to get slugs for posts and projects ✅
  * create queries (FE) to get username of user/users ✅
  * Review naming conventions i.e. should getPost be post, getPosts be posts etc. ✅
  * upload images via cloudinary ✅
  * states for publishing - draft/published ✅
  * fix https://github.com/microsoft/TypeScript/issues/10866 ✅
    * Build and start server project in a different way - no watch etc.
  * decide on testing strategy ✅
  * Migrate away from express-apollo to @apollo/server ✅
  * Image uploads - s3 maybe? - maybe with custom model ✅
  * Add filtering by post status for preview purposes - published or draft etc. ✅
  * Add queues for scheduling posts
  * see if possible to create common auth directive to verify if current logged in user is post owner (can delete a lot of post tests if so)
  * review how images are going to be embedded into content - potentially its own image mutation where things like the key/id isn't tracked or maybe a custom model for this i.e. ImageBlock or ContentBlockImage✅
  * think if want to go oop style and split functionality of resolver out into its own service - would make unit testing easier
  * split unit tests up into individual describe blocks for a given resolver function
  * use ids instead of slugs

FE:
  * Custom package for GQL type generation ✅
  * Create Github OAUTH app for auth locally ✅
  * styling UI package to be shared across frontend and admin ✅
  * Sort out RHF ✅
  * Build FE pages
    * auth/register ✅
    * auth/login ✅
    * Blank home page for now - will just be an intro of the project if not logged in else summary for user ✅
    * /posts/me - my posts
    * /projects/me - my projects
    * /feed - all projects and posts of all users
    * /posts - all posts of all users ✅
    * /projects - all projects of all users ✅
    * /user/[slug] - user profile
    * /user/me - my profile with edit toggles
    * Footer ✅
    * Look into boilerplate-graphql for styling✅
  * WYSWIG editor with @editorjs - potentially a custom package for this to distribute it to admin project ✅

Post Saving:
  * Image uploads - both via editor and general form fields✅
  * Sort saving of editor blocks✅
  * tag input

Infra:
 * Terraform for Infra - automate it in CI
 * AWS for hosting
 * Dockerize frontend + server
 * ECS for frontend + server - kuberentes if have time 
 * serverless DB potentially if can get postgres in order to save on costs - athena if cold starts aren't too bad
