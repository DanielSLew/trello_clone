# Backend

User

- has many boards

Board

- has many lists
- has many users
- attributes:
  - title

List

- has many cards
  - attributes:
    - title

Card

- has many labels
- has many comments
- has many users (subscribers)
- attributes:
  - title
  - description
  - due date

Label

- has many cards
- attributes:
  - color
