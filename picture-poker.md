# Picture Poker

## Architecture

### Frontend

NextJS :
- TailWindCSS
- Form inscription
- Form connexion
- Homepage
    - Dynamic navbar (connected/disconnected)
- User
    - username
    - email
    - password
    + score
    + money
- Dashboard (profile)
    - Game history
    + Friends
    
### Backend

Routes API :
- players
- games
Middleware :
- auth token
Mails :
- verifications
- MJML (??)
- Websockets servers

### BDD

PostgreSQL :

```SQL
user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password_hash TEXT,
    created_at TIMESTAMP
)

game (
    uuid UUID PRIMARY KEY,
    created_by INT REFERENCES user(id),
    players INT,
    status TEXT CHECK (status IN ('waiting','playing','finished')),
    created_at TIMESTAMP,
    playtime INTERVAL
)

game_player (
  id SERIAL PRIMARY KEY,
  game_uuid uuid REFERENCES game(id),
  user_id INT REFERENCES user(id),
  end_coins INT DEFAULT 0,
  is_winner BOOLEAN DEFAULT FALSE
)

round (
  id SERIAL PRIMARY KEY,
  game_id uuid REFERENCES game(id),
  round_number INT,
  winner_id INT REFERENCES user(id),
  result JSONB
)
```





