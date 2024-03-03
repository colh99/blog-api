const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Blog API',
    description: 'API for a simple blog application. Creating or modifiying data requires authentication. You can use /login or /logout endpoints, or /profile to see the user profile.',
  },
  host: 'blog-api-service-ehy4.onrender.com',
  //host: 'localhost:3000',
  schemes: ['https', 'http'],
  
  tags: [
    {
      name: 'Authors',
      description: 'Endpoints for authors'
    },
    {
      name: 'Posts',
      description: 'Endpoints for posts'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
