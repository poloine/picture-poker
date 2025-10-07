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
    + Move history
    + Friends
    
### Backend

Routes API :
- players
- games

Middleware :
- auth token
+ role (admin/user)

Mails :
- verifications
- MJML

Websockets servers

### BDD

PostgreSQL :

```SQL
user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255),
    password_hash TEXT,
    role TEXT CHECK (role IN ('user','admin')) DEFAULT 'user',
    score INT DEFAULT 0,
    money INT DEFAULT 100,
    created_at TIMESTAMP,
    resetPasswordToken TEXT,
    resetPasswordExpires TIMESTAMP,
    profile_picture BLOB
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


## JEU

Basé sur le mini-jeu de [New Super Mario Bros & Super Mario 64 DS](https://www.mariowiki.com/Picture_Poker)

1 à 4 joueurs (fonctionnalité supp. : atteindre 8 personnes max) doivent réaliser la meilleure main de poker (dans l'ordre du plus puissant au plus faible : cinq mêmes cartes, carré, full, brelan, deux paires, une paire, rien) pour gagner la manche.

Au début, les personnes reçoivent cinq premières cartes, et un nombre de pièces. Elles ne voient que leur propre main.  Tour à tour, elles vont choisir de défausser des cartes afin d'améliorer leur main (aucune limitation sur le nombre de cartes à défausser). Une fois que tout le monde a fait son choix, les mains sont dévoilées à tout le monde. La personne ayant la meilleure main remporte un certain nombre de pièces des autres joueurs, dont le montant est déterminé par la main du gagnant (respectueusement, 16, 8, 4, 3, 2, et rien).

De base, les joueurs partent avec 30 pièces. Une partie possède plusieurs manches, définie au début de celle-ci (soit 3, 5 ou 7). Les cartes ont six valeurs possibles, répertoriées en une hiérarchie (cela permet de déterminer la main la plus forte en cas d'égalité de main, on regarde les valeurs des cartes).

À réfléchir :
- que faire des pièces après la partie ? Faire un décompte et pouvoir offrir des récompenses au joueur ? avec système de shop, etc.
- fin de la partie pour un joueur n'ayant plus aucune pièce
- carte piochée : deck déterminé de la manche ou complètement aléatoire
- déconnexion dans la partie




