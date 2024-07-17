# Welcome to Quick Send

## About Quick Send

Quick Send is an efficient money transfer platform designed to facilitate quick and secure transactions between users. With Quick Send, users can easily send money, manage their transactions, and ensure seamless financial operations.

**Live Link**: [Quick Send](https://mfs-project-d9f9e.web.app/)

# CAUTION

**For browsing the site as an Admin, please use the following credentials:**

```
Email: admin@admin.com
PIN: 12345
```

**For browsing the site as an Agent, please use the following (you can register as a new agent in site too):**

```
Email: one@agent.com
//or
Phone Number: 01234567891
PIN: 12345
```

## Installation

To install the Asset Mart project on your local machine, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/s-shahriar/Quick−Send.git
   ```

2. **Navigate to the Project Directory**: Change to the project directory:

   ```
   cd quick-send
   ```

3. **Install Dependencies**: Install the required dependencies for both the client and server:

   ```
   ## for client
   npm install

   ## for server
   cd ../server
   npm install
   ```

4. **Set Up Environment Variables**: Create a `.env` file in the server directory and add your environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the Development Server**: Run the following command to start the development server:

   ```
   npm run dev
   ```

6. **Access the Application**: Open your browser and go to `http://localhost:3000` to view the application.

## Table of Contents

- [Features](#features)
- [Libraries Used](#libraries-used)
- [Technologies Used](#technologies-used)
- [Design Inspiration](#design-inspiration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### Features

- **Send Money**: Easily transfer money to other users with secure PIN and JWT verification.
- **Transaction Management**: Agents can manage and approve/deny transaction requests efficiently.
- **Cash-In Requests**: Users can request to cash in through agents without any fees.
- **Role-Based Navigation**: Dynamic navbar options based on user roles (User, Agent, Admin).
- **Real-Time Updates**: All transactions and status changes are reflected in real-time.
- **User Management**: Admins can manage users and their transaction history.
- **Search and Filters**: Advanced search and filtering capabilities for assets and requests, allowing users to find items by name, type, and status.

### Libraries Used

- [tanstack-query](https://tanstack.com/query/v4): Utilized for efficient data fetching, caching, and synchronization, enhancing the performance and responsiveness of the application.
- [react-lottie](https://www.npmjs.com/package/react-lottie): Used for integrating animated Lottie files, adding engaging visual elements to enhance user experience.
- [react-tooltip](https://react-tooltip.com/docs/getting-started): Utilized for creating informative tooltips, providing additional context when users interact with certain elements, enhancing usability.
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter): Employed for implementing typewriter-style text animation, adding a dynamic touch to text elements across the website.
- [swiper.js](https://swiperjs.com/): Integrated Swiper.js for creating interactive and responsive sliders, enhancing the presentation of content such as asset carousels and featured items.
- [react-hook-form](https://react-hook-form.com/) : Used for handling form validation and submission.
- [axios](https://axios-http.com/): Utilized for making secure API calls.
- [sweetalert2](https://sweetalert2.github.io/): Used for creating interactive alerts for better user experience.

### Technologies Used

- **Front-End**: ReactJS
- **UI Library**: Tailwind CSS, Flowbite
- **Back-end**: ExpressJS
- **Database**: MongoDB

## Usage

### For Admins

- **Manage Users**: Add, update, or delete users and view their transaction history.

### For Agents

- **Transaction Management**: Approve or deny cash-in and cash-out requests from users.

### For Users

- **Send Money**: Transfer money to other users securely.
- **Request Cash-In**: Request to cash in through agents without any fees.
- **View Transactions**: Check the status of your transactions and interact with them.

---

## Contributing

We welcome contributions! If you have any suggestions, improvements, or bug fixes, feel free to submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
