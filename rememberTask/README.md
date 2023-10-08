# Remember Task
 
## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Start](#getting-start)
- [Contributing](#contributing)

## Prerequisites
- Node.js (recommended version)
- MySql Database
- Localhost ports ``3000 & 3001``

## Installation 

To use, download the files or clone the repository

- Clone the repo: ``git clone ``

Then

- Open first terminal and write:
1. ``cd frontend``
2. ``npm install``
3. ``npm start``

- Database:
1. Open MySql and create new called 'Rembemer_task'
2. Import SQL file from repo

- Open second terminal and write:
1. ``cd backend``
2. ``npm install``
3. ``cd src``
4. ``node './server.js`` 

Read the [Getting Start](#getting-start) for informations how app works

## Getting Start

If no error appeared, a new page ``http://localhost:3000/`` based on React will appear. The application is very intuitive, just check the boxes located on the displayed window 

There are 4 different options available, ``Create & Select & Delete & Update``.<br/>
Using buttons such as ``Create`` ``Odswiez`` ``Usun`` ``Edit`` you can send a query to the database via the express server and ``http://localhost:3001/[type-of-request]``.
