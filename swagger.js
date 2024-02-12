const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Blog API'
  },
  //host: 'cse341-0eje.onrender.com',
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
