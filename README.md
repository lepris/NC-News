
<!-- Header -->
# NC NEWS


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)




<!-- ABOUT THE PROJECT -->
## About The Project


#### NC News API 

Makes students life merrier, by enabling to post articles touching various topics, is plain, simple and to the point:

Great functionalities:
* Defining topics
* Creating articles
* Commenting
* Voting
* Adding Users

#### Documentation
Full interactive  API documentation available:

[https://apincnews.docs.apiary.io](https://apincnews.docs.apiary.io/)

#### Default permissions

| User roles | Guest | Authenticated User
|--|--|--|
| View Articles | **OK** | **OK**
| Add Articles | **X** | **OK**
| Delete Articles | **X** | **OK**
| Vote on Articles | **OK** | **OK**
| View Topics | **OK** | **OK**
| Add Topics | **X** | **OK**
| Delete Topics | **X** | **OK**
| View Comments | **OK** | **OK**
| Add Comments | **X** | **OK**
| Delete Comments | **X** | **OK**
| Vote on Comments | **OK** | **OK**



### Built With

This project is a simple, RESTful Node.js based api which allows to read, create and delete articles and comments. Express acts as HTTP server communicating with PostgreSQL database.

* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)

<!-- GETTING STARTED -->
## Getting Started

To run the project locally

### Prerequisites

In order to run this project PostgreSQL must be running either on the host or in Docker container.

* npm
```sh
npm install npm@latest -g
```
**or**
* yarn

Follow **Yarn** installation instructions
[https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)


### Installation

1. Clone the repo
```sh
git clone git@github.com:lepris/NC-News.git
```
2. Install dependencies
```sh
npm install
```
**or**
* yarn
```sh
yarn
```

For app deployment follow your specific service provider instructions.

<!-- USAGE EXAMPLES -->
## Usage

API Documentation can be found on **APIARY**
[https://apincnews.docs.apiary.io](https://apincnews.docs.apiary.io/)


<!-- CONTRIBUTING -->
## Contributing

Any contributions are  **extremely welcome**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](./license.txt) for more information.



<!-- CONTACT -->
## Contact


Project Link: [https://github.com/lepris/NC-News](https://github.com/lepris/NC-News)

<!--ACKNOWLEDGEMENTS-->
### Acknowledgements
**STACKEDIT**  [https://stackedit.io](https://stackedit.io/)
**APIARY**  [https://apiary.io](https://apiary.io/)

