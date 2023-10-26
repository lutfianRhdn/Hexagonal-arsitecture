// server.ts
import express, { Application } from 'express'; // Import Application type
import { routes } from '../routes'; // Import routes
const app = express();

app.use(express.json()); // Enable JSON body parsing of application/json
app.use(express.urlencoded({ extended: true })); // Enable body parsing of application/x-www-form-urlencoded
app.use(express.static('public')); // Serve public files
app.use('/', routes); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
