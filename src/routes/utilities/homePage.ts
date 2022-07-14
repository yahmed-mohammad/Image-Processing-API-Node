export default class HomePage {
    static homePageData = `<html>
    <title>Image Processing App</title>
    <body>
        <h3>Welcome to the Image Procession Application</h3><br>
    
        <p>
            The application exposes an API which can resize the image already available in our database.
        </p>
        
        <h4>GET /image</h4>
        <p> It takes 3 query parameter named below:
            <ol>filename</ol>
            <ol>width</ol>
            <ol>height</ol>
        </p>
        <div>
            <p>Sample request URL 1: http://localhost:3000/image?filename=grass&width=200&height=300</p>
            <a href="http://localhost:3000/image?filename=grass&width=200&height=300">Click here for a sample response</a>
            <p>Sample request URL 2: http://localhost:3000/image?filename=tree</p>
            <a href="http://localhost:3000/image?filename=grass">Click here for a sample response</a>
            
        </div>
        <p><h5>NOTE: Please do not delete <u>tree and grass</u> from the actual image folder as all tests are written based on those two files.</h5></p>
        
    </body>
    </html>`;
}
