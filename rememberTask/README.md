# Remember Task

A school project that became the first application of my portfolio to test my React and MySql skills
 
## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Start](#getting-start)
- [Used Technology](#used-technology)
- [Figma Project](#figma-project)

## Prerequisites
- Node.js (recommended version)
- MySql Database
- Localhost ports ``3000 & 3001``

## Installation 

> To use, download the files or clone the repository

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
Using buttons such as ``Stwórz`` ``Odswież`` ``Usuń`` ``Edytuj`` you can send a query to the database via the express server and ``http://localhost:3001/[type-of-request]``.

## Used Technology

This project is divided into Front-end and Back-end. Everything works on node.js,<br/>
On the Front-end I used **React** with **module.css**, <br/>
And on Back-end I used **Express** with **mysql2/promise**.

## Figma Project

[Link to Figma](https://www.figma.com/file/hI8sHYbvhMDrNnztbVlS8E/Untitled?node-id=0%3A1&mode=dev)

