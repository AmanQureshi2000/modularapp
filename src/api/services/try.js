// Add curly braces to match the named export in user.service.js
import {getComputers} from "./computer.service.js";

const data = async () => {
  try {
    const res = await getComputers();
    console.log(res); // Log the result to see the data
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

data();