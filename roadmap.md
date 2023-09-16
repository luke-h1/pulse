## ROADMAP:

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
    * Build and start server project in a different way - no watch etc. ✅
  * decide on testing strategy ✅
  * Migrate away from express-apollo to @apollo/server ✅
  * Image uploads - s3 maybe? - maybe with custom model ✅
  * Add filtering by post status for preview purposes - published or draft etc. ✅
  * review how images are going to be embedded into content - potentially its own image mutation where things like the key/id isn't tracked or maybe a custom model for this i.e. ImageBlock or ContentBlockImage ✅
  * split unit tests up into individual describe blocks for a given resolver function ✅
  * use ids instead of slugs ✅
  * sort prisma mock ✅
  * sort out pagination for posts and projects
  * sort unit/integration tests for server - have had to run jest sequentially for now because of interferance between tests when data is inserted into DB.✅
  
  * Cache resolver functions with redis
  * Add queues for scheduling posts
  * sort logging for server - need to log execution time, request logging etc.

FE:
  * Custom package for GQL type generation ✅
  * Create Github OAUTH app for auth locally ✅
  * styling UI package to be shared across frontend and admin ✅
  * Sort out RHF ✅
  * Build FE pages
    * auth/register ✅
    * auth/login ✅
    * Blank home page for now - will just be an intro of the project if not logged in else summary for user ✅
    * /feed - all projects and posts of all users ✅
    * /posts - all posts of all users ✅
    * /posts/[id]/preview ✅
    * /posts/[id] ✅
    * /posts/[id]/update ✅
    * /projects - all projects of all users ✅
    * /projects/[id] ✅
    * /projects/[id]/preview
    * /projects/[id]/update  ✅
    * /user/me - my profile ✅
    * Footer ✅
    * Look into boilerplate-graphql for styling✅
    * WYSWIG editor with @editorjs - potentially a custom package for this to distribute it to admin project ✅

    * /posts/me - my posts
    * /projects/me - my projects

ADMIN:
 * Auth ✅
 * Table components ✅ 
 * Mutations + queries ✅ 
 * Manage posts + projects ✅
 * Manage users ✅

Post Saving:
  * Image uploads - both via editor and general form fields✅
  * Sort saving of editor blocks ✅
  * tag input ✅
  * sort preview functionality - need to split PostPage into it's own component for better reusability ✅
  * split post create/update into it's own component for less duplication ✅

Infra:
 * Terraform for Infra - automate it in CI
 * AWS for hosting
 * Dockerize frontend, admin + server
 * ECS for frontend + server - kuberentes if have time 
 * RDS for postgres
 * elasticcache for redis
 * Sort CI caching
 * Employ NX for faster builds

General:
* fix path aliases for @editor/index, @ui/index etc.
* Sort out changelogs + versioning (use Lerna + changesets?)
