### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```

### PORT
The server will listen on port 3000:

#### LOCALHOST
http://localhost:3000/

#### Endpoint to resize images
http://localhost:3000/image

Expected query arguments are:
- _filename_: Available filenames are:
  - tree
  - grass
- _width_: numerical value > 0
- _height_: numerical value > 0

#### Example 1
http://localhost:3000/
Will display welcome page with api information.

#### Example 2
http://localhost:3000/image?filename=tree
Will display the original fjord image.

#### Example 3
http://localhost:3000/image?filename=tree&width=400&height=400
Will scale the tree image to 400 by 400 and store the resulting image.
On subsequent calls the resized image will be returned instead of resizing the image again.

#### Example 4
http://localhost:3000/image?filename=grass&width=-200&height=200
Invalid width error

#### Example 5
http://localhost:3000/api/images?filename=fjord&width=200
Invalid height error

### Notes
- Images are served from `images/actuall`. More can be copied to this directory
- Image thumbs will be stored in `images/modified` and can be deleted
- Please do not delete tree.jpg and grass.jpg, as all test cases are written keeping these two files in mind.


### Technical Explanations

- Entry point is index.ts where an app is defined which listens to the port 3000 and use routes to expose apis.
- routes/apis.ts contains all the routes/endpoint of our application
- routes/models contains interfaces for data transfer
- routes/utilities contains the validation of query parameters & a class having home page data
- file.ts contains a File class with file related functions
- resizeImage.ts contains logic to process image using sharp

