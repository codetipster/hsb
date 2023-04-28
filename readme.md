# HSB Tax management server and database implementation
This README provides a detailed description of the database design process for a tax management firm called HSB(and the server side and security implementations as well). The purpose of the database is to help HSB manage tax processes and reduce the burden of paperwork. The database will have three classes of users: 

- an Admin user who can create an Accountant and a Client, and also assign an Accountant to a Client.
- an Accountant who can perform actions on their assigned Clients and exchange documents with them.
- and finally, a Client who can communicate with their assigned Accountant and exchange documents with them.

### Achieving the logical design(model) for the database
The first version for the HSB tax management software had a view that was fed data from a mongoDB(NoSQL) database. Because of the sensitive nature of the application, there was a need to design and implement a robust relational database. To achieve this, we chose postgreSQL and took the following steps to achieve a Logical design for the eventual implementation.

#### Step 1: Identified the Subjects
The first step in the database design process was to identify the subjects that the database will track. Based on the business rules, and by inspecting the current existing database(which had inconsistencies), the following subjects were identified:


1. User
2. Accountant
3. Client
4. Assignment
5. Chat
6. Document
7. Login
8. AccountantAction 

![subjects](assets/Screenshot%202023-04-27%20at%2022.56.22.png)

#### Step 2: Defined table and relationships(ERD)
We then defined the tables based on the identified subjects and relationships and based on the business rules and relationships, we identified keys, and asserted field specifications as can be seen from the yellow labels in the ERD model.

![ERD](assets/Screenshot%202023-04-27%20at%2021.33.36.png)

#### Step 3: Implementation (all of our implementation here is in the db directory)
The third step in the database design process was to implement the tables in a database management system (DBMS) using PostgreSQL. The implementation involved creating a database and the tables, along with the necessary columns and data types. The implementation also included defining the relationships between the tables using foreign keys.


#### How to run this server/Database instance:

  - ##### Clone this repository
   - run `git clone https://github.com/codetipster/hsb.git``
   - cd into hsb with `cd hsb` 
  - ##### Install PostgreSQL
   - Visit the PostgreSQL website (https://www.postgresql.org/) and download the appropriate installer for your operating system.

   - Run the installer and follow the prompts to install PostgreSQL on your computer.

  - #####  Configure PostgreSQL
   - Once PostgreSQL is installed, you need to create a database user with the necessary privileges to create databases and tables. To do this, open the "pgAdmin" tool that was installed with PostgreSQL.
   - In pgAdmin, right-click on "Login/Group Roles" and select "Create > Login/Group Role".

   - Enter a name for the new login role, and select the "Role privileges" tab.(remember this name and the password you used)
   In the "Privileges" section, check the boxes next to "Can create databases" and "Can create roles".
   Click "Save" to create the new login role.

  -  Create and name your database
