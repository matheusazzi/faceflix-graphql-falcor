```bash
  $ yarn

  $ yarn run dev

  $ yarn run migrate
  $ yarn run rollback
  $ yarn run seed
```

```graphql
Comment {
  user: User
  post: Post
  title: Title
  reactions: [Reaction]
  body: String
}

Company {
  name: String
  titles: [Title]
}

enum Role {
  director
  writer
  actor
}

Credit {
  title: Title
  celebrity: Celebrity
  role: Role
}

Favorite {
  user: User
  title: Title
}

enum Status {
  pending
  approved
}

Friendship {
  user: User
  friend: User
  status: Status
}

Genre {
  name: String
  titles: [Title]
}

Media {
  videoUrl: String
  imageUrl: String
  attachable: User | Celebrity | Title
}

enum Gender {
  male
  female
}

Celebrity {
  name: String
  gender: Gender
  birthday: Date
  biography: String
  works: [Credit]
  avatar: Media
}

Post {
  body: String
  author: User
  title: Title
  comments: [Comment]
  reactions: [Reaction]
}

enum ReactionType {
  like
  dislike
}

Reaction {
  user: User
  type: ReactionType
  reactionable: Post | Comment
}

Recommendation {
  user: User
  title: Title
}

User {
  name: String
  email: String
  gender: Gender
  avatar: Media
  comments: [Comment]
  posts: [Post]
  favorites: [Favorite]
  recommendations: [Recommendation]
  reactions: [Reaction]
  friends: [User]
}

Title {
  budget: Int
  poster: Media
  crew: [Credit]
  companies: [Company]
  genres: [Genre]
  posts: [Post]
  recommendations: [Recommendation]
  favorites: [Favorite]
  rating: Float
  overview: String
  releaseDate: Date
  revenue: Int
  runtime: Int
  tagline: String
  title: String
}
```

```javascript
// $ node

User = require('./models/user')
Media = require('./models/media')

User.where({id: 1})
  .fetch({withRelated: ['avatar']})
  .then((user) => user.serialize().avatar)

User.where({id: 1})
  .fetch({withRelated: ['avatar']})
  .then((user) => user.related('avatar').serialize())


Media.where({attachable_id: 1, attachable_type: 'users'})
  .fetch()
  .then((media) => media.serialize())

Media.where({id: 8})
  .fetch({withRelated: ['owner']})
  .then((media) => media.serialize().attachable.name)
```
