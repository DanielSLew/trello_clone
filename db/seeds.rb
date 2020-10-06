# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Board.destroy_all

board1 = Board.create({title: "First board"})

list1 = List.create title:'first list', board: board1
list2 = List.create title:'second list', board: board1

card1 = Card.create title:'first card', description: '2redsc', list: list1
card2 = Card.create title:'second card', description: 'seoidfiojs', list: list1
card3 = Card.create title:'third card', description: '346trg', list: list2
card4 = Card.create title:'fourth card', description: '0j9j9', list: list2
card5 = Card.create title:'fifth card', description: 'rg', list: list2