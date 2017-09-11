### Setup

```bash
  $ yarn

  $ yarn run dev
  $ yarn run dbsetup
```

### GraphQL Schema

```graphql
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

Comment {
  body: String
  user: User
  post: Post
  movie: Movie
  reactions: [Reaction]
}

Company {
  name: String
  movies: [Movie]
}

enum Role {
  director
  writer
  actor
}

Credit {
  movie: Movie
  celebrity: Celebrity
  role: Role
}

Favorite {
  user: User
  movie: Movie
}

Genre {
  name: String
  movies: [Movie]
}

enum FileType {
  image
  video
}

Media {
  videoUrl: String
  imageUrl: String
  type: FileType
  owner: User | Celebrity | Movie
}

Post {
  body: String
  author: User
  movie: Movie
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
  movie: Movie
}

Movie {
  budget: Int
  rating: Float
  overview: String
  releaseDate: Date
  revenue: Int
  runtime: Int
  tagline: String
  title: String
  poster: Media
  trailer: Media
  crew: [Credit]
  director: Celebrity
  companies: [Company]
  genres: [Genre]
  posts: [Post]
  recommendations: [Recommendation]
  favorites: [Favorite]
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
```

### Querying DB

```javascript
// $ node

User = require('./models/user')
Media = require('./models/media')

User.where({id: 1})
  .fetch({withRelated: ['avatar']})
  .then((user) => user.serialize().avatar)

Media.where({id: 8})
  .fetch({withRelated: ['owner']})
  .then((media) => media.serialize().attachable.name)
```

### Query GraphQL

```graphql
query {
  post(id: 1) {
    id
    body
    author {
      name
      avatar {
        imageUrl
      }
    }
    movie {
      title
      rating
      tagline
      poster {
        imageUrl
      }
      trailer {
        videoUrl
      }
      director {
        name
        avatar {
          imageUrl
        }
      }
      crew {
        role
      	celebrity {
          name
          avatar {
            imageUrl
          }
        }
      }
      recommendations {
        user {
          name
        }
      }
    }
    comments {
      body
      user {
        name
        avatar {
          imageUrl
        }
      }
      reactions {
        type
        user {
          name
        }
      }
    }
    reactions {
      type
      user {
        name
      }
    }
  }
}
```
