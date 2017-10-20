# FaceFlix

It's a GraphQL and Falcor personal experiment. The goal is to make a comparison between those technologies.

Because GraphQL and Falcor have been developed by Facebook and Netflix respectively, the experiment consists of a social network mix with a movie catalog, where users can create posts and comments about the movies they're watching.

- [GraphQL REPL](http://faceflix.herokuapp.com/graphql/repl)
- [Falcor REPL](http://faceflix.herokuapp.com/falcor/repl)

### Setup

#### Dependencies:

- Node.js
- Yarn
- PostgreSQL

#### Creating database:

```bash
  $ psql
  $ CREATE DATABASE base_tcc_development;
```

#### Setup Node:

```bash
  $ yarn
  $ yarn run dbsetup
```

#### Running:

```bash
  $ yarn run dev
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

- Go to `/graphql/repl`

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
      crew(first: 5) {
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
    comments(first: 3) {
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

### Query Falcor

- Go to `/falcor/repl`

```javascript
[
  ["postById", 1, ["body", "id"]],
  ["postById", 1, "author", "name"],
  ["postById", 1, "author", "avatar", "image_url"],
  ["postById", 1, "movie", ["rating", "tagline", "title"]],
  ["postById", 1, "movie", "poster", "image_url"],
  ["postById", 1, "movie", "trailer", "video_url"],
  ["postById", 1, "comments", {"from": 0, "to": 2}, "body"],
  ["postById", 1, "comments", {"from": 0, "to": 2}, "user", "name"],
  ["postById", 1, "comments", {"from": 0, "to": 2}, "user", "avatar", "image_url"]
]
```
