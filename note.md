

## TODOS:

* Get inspo for UI styles we'll need - number input etc. 
* Use zod for FE validation
* Dont use editor for now - just validate everything is setup properly on backend by using regular form components

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

FE:
  * Custom package for GQL type generation ✅
  * Create Github OAUTH app for auth locally ✅
  * styling UI package to be shared across frontend and admin ✅
  * Build FE pages
    * auth/register
    * auth/login
    * Blank home page for now - will just be an intro of the project if not logged in else summary for user
    * /posts/me - my posts
    * /projects/me - my projects
    * /feed - all projects and posts of all users
    * /posts - all posts of all users 
    * /projects - all projects of all users
    * /user/[slug] - user profile
    * /user/me - my profile with edit toggles
    * Footer 
  
  * Auth - Github for now (maybe google down the line)
  * Styling - via vanilla extract
  * WYSWIG editor with @editorjs
  * Migrate away from express-apollo to @apollo/server
