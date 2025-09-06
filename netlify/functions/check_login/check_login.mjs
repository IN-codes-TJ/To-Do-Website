import { neon } from '@neondatabase/serverless';
export async function handler(event) {
  logged_in = await logIn(event);
  if (logged_in == true) {
    return {
      statusCode: 200,
      body: JSON.stringify("Successfully logged in."),
    };
  }
  else if (logged_in == "invalid") {
    return {
      statusCode: 401,
      body: JSON.stringify("Invalid details. Please try again."),
    };
  }
  else if (logged_in == false) {
    const new_acc = await createAccount(event);
    if (new_acc == true) {
      return {
        statusCode: 200,
        body: JSON.stringify("New account created."),
      };
    }
    else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: new_acc }),
        };
    }
  }
  else {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: logged_in }),
    };
  }
}

async function logIn(event) {
  const sql = neon(process.env.NETLIFY_DATABASE_URL);
  try {
    const data = await event.body ? JSON.parse(event.body) : {};
    const username = data.user;
    const password = data.pass;
    const DB_password = await sql`SELECT password FROM accounts WHERE username = ${username};`;
    console.log(DB_password);
    if (DB_password.length == 0) {
      return false;
    }

    password = hashPassword(password);

    if (password == DB_password[0]) {
      return true;
    }
    else {
      return "invalid";
    }
  } catch (error) {
    return error.message;
  }
}

function hashPassword(password, salt) {
  //Hashing function

  /*
  PYTHON CODE:
    def Hashing(password):
    N = 53 #This is the size of the hashed text

    hashval = ""

    for i in range(N):
        if len(password)<N:
            try:
                index = i
                avgasc = ord(password[index]) #Does this while i<=len(password)
            except:
                index = i%len(password) #E.g. for a password of length 2. For i=0, the index used is 0. For i=2 (so the third item), the index used is (i-2*1=)0. For i=5, the index used is (i-2*2=)1
                avgasc = ord(password[index]) + i
        else:
            totalasc = 0
            for j in range(len(password)//N):
                index = i*(len(password)//N)+j
                totalasc += ord(password[index])
                if len(password)%N !=0:
                    index = len(password)-1-(i*(len(password)//N)+j) #To ensure all characters are used, the last characterss ascii values are added to the total when they would otherwise be left behind due to the integer division
                    totalasc += ord(password[index])
                
            avgasc = totalasc//(len(password)//N) #We do the hashing function on the average ascii value

        asciival = Hash(avgasc, N, i)
        if asciival%2:
            hashval = hashval + chr(asciival)
        else:
            hashval = chr(asciival) + hashval

    return hashval

def ConvertFromBinaryString(binary):
    num = 0
    for i in range(1, len(binary)):
        if binary[len(binary) - i] == "1":
            num += 2**(i-1)
    return num

def Hash(asciival, N, i):
    num_groups = N//2
    group = (asciival**2)%num_groups #Imagine 10 blocks. If you split this into 10 groups, each group is 1 size. Here, we are finding the group that this item goes in
    group_index = (asciival**2)%(N/num_groups) #Gives the index for the group it's in. N/num_groups gives size of each group.

    asciival += i//(5-group%5)+asciival

    #Performing 3 left shifts
    binary = bin(asciival)
    binary = "0b" + binary[2:] + "000"
    asciival = ConvertFromBinaryString(binary)

    asciival = (asciival-33)%94+33 #Ensures the ascii value is within the correct range (I used 94 as there's 126-33=94 available characters I want to be able to be included in the hashed text)
    return asciival

def Main(username, password, salt):
    hashval = Hashing(password)

    #Finding each half of the salt
    length = len(salt)
    if length%2 == 0:
        firstsalt = salt[:length//2]
        lastsalt = salt[length//2:]
    else:
        firstsalt = salt[:length//2 + 1]
        lastsalt = salt[length//2 + 1:]

    finalhash = firstsalt + hashval + lastsalt
    return finalhash
  */

  return password;
}

async function createAccount(event) {
  const sql = neon(process.env.NETLIFY_DATABASE_URL);
  try {
    const data = await event.body ? JSON.parse(event.body) : {};
    const username = data.user;
    const password = data.pass;

    //Create a salt:
    const salt = ""; //Length 10
    /* 
      PYTHON CODE:
      def Create_Salt():
      salt = ""
      for i in range(10):
          salt = salt + str(chr(randint(33, 126)))

      return salt
    */
    password = hashPassword(password, salt);
    
    //const rows = await sql`INSERT INTO accounts(username, password) VALUES ${username}, ${password}`;
    return true;
  } catch (error) {
    return error.message;
  }
}