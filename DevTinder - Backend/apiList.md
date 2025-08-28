# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

## userRouter

- GET /user/connections
- PATCH /user/requests
- PATCH /user/feed - Gets you the profile of other users on platform

Status: Ignore, Interested, accepted, rejected
