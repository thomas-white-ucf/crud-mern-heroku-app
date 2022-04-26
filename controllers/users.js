// separate code by taking it out of request callback function
import { v4 as uuidV4 } from "uuid";
// uuidV4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// * *  export const  nameFunction = (req,res) => { req.body   res.send("100000")     }
// **==PUT - Completely overwrite something,
// **== PATCH- partial modification is PATCH
// !_ use query parameters

// const users = [];
// ! - assignment to constant variable if edit after deploy from route..////
//  - TYPE ERROR IF YOU TRY TO EDIT CONSTANT VARIABLE ON CLIENT BROWSER - USE LET TO ALTER

//

let users = [];

export const getUsers = (req, res) => {
  // console.log(users);
  res.send(users);
};

export const createUser = (req, res) => {
  //   console.log("POST ROUTE REACHED");
  //   res.send("POST ROUTE REACHED (send)");

  const user = req.body;

  // *-combine following because only referenced once
  //const userId = uuidV4()
  //const userWithId = { ...user, id: uuidV4()}

  console.log(`Adding User to User Database.. users [ + ${user.firstName}] \n`);

  // ** push user to array
  users.push({ ...user, id: uuidV4() });

  res.send(`User with the name ${user.firstName} added  to the database! \n `);
};

export const findUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  // const foundUser = users()

  // Tom - 123
  // John - 321

  users = users.filter((user) => user.id != id);

  res.send(`Deleted user with \n id = ${id}`);
};

export const updateUserPATCH = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  // find user by id to update
  //!_ get info from req.body of what to update it to query params
  const user = users.find((user) => user.id === id);

  // if (firstName) {
  // !update if found user
  //   user.firstName = firstName;
  // }
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  // const user = users.find((user) => user.firstName = "XXX");

  res.send(`Patched user \n id = ${id}`);
};
