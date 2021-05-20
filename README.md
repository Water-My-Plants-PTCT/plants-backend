# backend

baseUrl: https://water-my-plants-ptct.herokuapp.com



Auth Endpoints        | Required Fields                                 | Description  

POST REQUESTS:

/api/auth/login       | username, password                              | login user and set token [test user]: username= test, password= test


/api/auth/register    | username, phone, password                       | register user and save credentials to server, username/phone must be unique (non-duplicates in system),                                                                           username must be a string that is min 3 chars long and phone # must be 10 digits long

/api/auth/logout      | user must be logged in                          | Allows user to logout and remove token and session id


PUT REQUESTS:

/api/auth/users/:id   | phone OR password                               | User can update their phone number or password. Phone number must be unique (non-duplicates in system)  
 
 


Plant Endpoints       | Required Fields / Token                         | Description

GET REQUESTS:         

/api/plants           | Token Required                                  | Get's a list of all plants in database

/api/plants/:id       | Token Required                                  | Get's a specific plant based on the plant_id

/api/plants/user/:id  | Token Required                                  | Gets a list of plant data from a specific user id


POST REQUESTS:

/api/plants           | Token Required, Required Fields:                | Creates a new plant and returns an object. Optional: User can insert an image url to be saved to
                        nickname, species, h2oFrequency,                  database. Ex: https://thumbs.dreamstime.com/z/cambria-orchid-plant-blooming-white-38131910.jpg
                        user_id, photo(optional, user can
                        insert an image url)
  
  
PUT REQUESTS:

/api/plants/:id       | Token Required, Required Fields:                | Allows user to update information about a specific plant based on the plant_id
                        user can update any of the plant fields
                        (nickname, species, h20frequency, etc)
                        
                        
DELETE_REQUESTS:

/api/plants/:id       | Token Required                                  | Allows user to delete a specific plant based on the plant_id
