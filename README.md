# 🌍 Heroots Base Repository 

Welcome to the foundational repository for the Heroots platform! 🎉

Heroots is on a mission to make a positive difference in the world. 🌱 By smartly linking sustainable events with passionate activists, we're setting the stage for change. 

- 📅 **Organize and Manage Events:** Whether it's a beach cleanup or a sustainability workshop, manage your events seamlessly.
- 🤝 **Connect with Activists:** Find and connect with like-minded activists in your community and around the world.
- 💡 **Raise Awareness:** Use the platform as a megaphone to spread the word about causes that matter.
- 💰 **Secure Funding:** Drive support and gather funds to propel your initiatives further.

Let's make an impact together! 🚀



## CSV to JSON API

A simple Node.js backend service that reads an SDG events CSV file and returns the data in JSON format. The CSV contains information about various SDG (Sustainable Development Goals) events from around the world, including event details, images, GPS coordinates, and relevant links.

## Prerequisites

- Node.js
- npm

## Setup

1. **Clone the Repository (Optional)**

   If you have this project on a Git repository:

   ```bash
   git clone [YOUR REPOSITORY URL]
   cd csv-to-json-api
   ```

   If not, ensure you are in the project directory (`csv-to-json-api` or another name you've chosen).

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Add the CSV File**

   Place your `sample.csv` file in the root directory of the project. This file should contain SDG event details in the following format:

   ```
   event_name,host_country,date,SDG_goal,description,image_url,gps_coordinates,links
   "Event Name","Country","YYYY-MM-DD","Goal Number","Description","path/to/image.jpg","latitude,longitude","www.link1.com|www.link2.com"
   ...
   ```

   Note: Links for each event are separated by a `|` character.

4. **Running the Server**

   ```bash
   node index.js
   ```

   Once the server is running, you can access the data by visiting `http://localhost:3000/csv-to-json` in your browser or using tools like Postman.

## API Endpoints

- **GET `/csv-to-json`**: Fetches the SDG events from the `sample.csv` file and returns them in JSON format.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.

---

Feel free to adapt this `README.md` to fit the exact nature and requirements of your project, including adding more sections such as "Deployment", "Testing", or any other relevant information.