# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## DATABASE DESIGN

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index_unique: true|
|email|string|null: false, index_unique: true|
|password|string|null: false|

### Association
has_many :messeges
has_many :groups, through: :group_users

## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
belongs_to :user
belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index_unique: true|
|user_id|integer|null: false, foreign_key: true|

### Association
has_many :messeges
has_many :users, through: :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group
