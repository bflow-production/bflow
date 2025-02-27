import sqlite3
import os

from datetime import datetime

class Database:
    def __init__(self, db_name="BFLOW.db"):
        """
        Initialize the Database class.
        :param db_name: Name of the SQLite database file.
        """
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        self.db_path = os.path.join(BASE_DIR, db_name)
        self._initialize_database()

    def _initialize_database(self):
        """
        Creates the database schema if it doesn't already exist.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
        # Create PLAYER table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS PLAYER (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                picture TEXT DEFAULT NULL,
                birthYear INTEGER NOT NULL,
                country TEXT NOT NULL,
                number INTEGER DEFAULT NULL,
                parent TEXT DEFAULT NULL,
                parentEmail TEXT DEFAULT NULL,
                parentPhone TEXT DEFAULT NULL,
                coach TEXT DEFAULT NULL,
                coachEmail TEXT DEFAULT NULL,
                coachPhone TEXT DEFAULT NULL,
                team TEXT DEFAULT NULL,
                shirtNumber INTEGER DEFAULT NULL,
                team_id INTEGER DEFAULT NULL,
                position TEXT DEFAULT NULL,
                FOREIGN KEY (team_id) REFERENCES TEAM(id) ON DELETE SET NULL
            )
            """)
        # Create COACH table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS COACH (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            picture TEXT DEFAULT NULL,
            birthYear INTEGER NOT NULL,
            country TEXT NOT NULL,
            team TEXT DEFAULT NULL,
            team_id INTEGER DEFAULT NULL,
            FOREIGN KEY (team_id) REFERENCES TEAM(id) ON DELETE SET NULL
        )
        """)
        # Create TEAM table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS TEAM (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            coach_id INTEGER NOT NULL
        )
        """)
        # Create PARENT table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS PARENT (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            picture TEXT DEFAULT NULL,
            birthYear INTEGER NOT NULL,
            country TEXT NOT NULL,
            child_name TEXT DEFAULT NULL,
            child_email TEXT DEFAULT NULL 
        )
        """)           
        # Create CATEGORY table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS CATEGORY (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )
        """)
       
        # CREATE CHILD table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS PARENT_PLAYER (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            parent_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            FOREIGN KEY (parent_id) REFERENCES PARENT(id) ON DELETE CASCADE,
            FOREIGN KEY (player_id) REFERENCES PLAYER(id) ON DELETE CASCADE
        )
        """)

        # Create EXERCISE table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS EXERCISE (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            FOREIGN KEY (category_id) REFERENCES CATEGORY(id) ON DELETE CASCADE
            UNIQUE(category_id, name)
        )
        """)

        # Create PLAYER_EXERCISE table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS PLAYER_EXERCISE (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_id INTEGER NOT NULL,
            exercise_id INTEGER NOT NULL,
            result TEXT DEFAULT NULL, 
            rating INTEGER DEFAULT NULL CHECK (rating BETWEEN 1 AND 5),
            timestamp TEXT NOT NULL,
            duration INTEGER DEFAULT NULL,
            FOREIGN KEY (player_id) REFERENCES PLAYER(id) ON DELETE CASCADE,
            FOREIGN KEY (exercise_id) REFERENCES EXERCISE(id) ON DELETE CASCADE
        )
        """)

        # Insert categories
        categories = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY']
        cursor.executemany("""
        INSERT OR IGNORE INTO CATEGORY (name) VALUES (?)
        """, [(category,) for category in categories])
        
        # Insert exercises under each category
        exercises = {
            'PAC': ['Sprint Speed', 'Acceleration'],
            'SHO': ['Shot Speed (radar)', 'Long Shots', 'Free Kick Accuracy'],
            'PAS': ['Short Passing', 'Long Passing', 'Crossing'],
            'DRI': ['Zidane Fake Pass', 'Stepovers', 'Elastico'],
            'DEF': ['Tackling', 'Marking', 'Interceptions'],
            'PHY': ['Strength', 'Stamina', 'Jumping']
        }
        
        for category, exercise_list in exercises.items():
            cursor.execute("SELECT id FROM CATEGORY WHERE name = ?", (category,))
            category_id = cursor.fetchone()[0]
            for exercise in exercise_list:
                cursor.execute("""
                INSERT OR IGNORE INTO EXERCISE (category_id, name) VALUES (?, ?)
                """, (category_id, exercise))
                
        
        
        conn.commit()

    def _get_connection(self):
        """
        Establish a connection to the SQLite database.
        :return: SQLite connection object.
        """
        return sqlite3.connect(self.db_path)


    def add_user(self, username, password, email, name, birthYear, country, role, number=None, team_id=None):
        """
        Add a new user to the appropriate table based on their role.
        """
        number = number if number is not None else 0  
        team_id = team_id if team_id is not None else None
        
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            if role == 'player':
                cursor.execute("""
                INSERT INTO PLAYER (username, password, email, name, birthYear, country, number, team_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (username, password, email, name, birthYear, country, number, team_id))
                user_id = cursor.lastrowid
                
                # Prepopulate PLAYER_EXERCISE
               #ursor.execute("SELECT id FROM EXERCISE")
                #exercises = cursor.fetchall()
               #player_exercises = [(user_id, exercise_id[0]) for exercise_id in exercises]
                #cursor.executemany("""
                #INSERT INTO PLAYER_EXERCISE (player_id, exercise_id)
               # VALUES (?, ?)
               # """, player_exercises) ###
            
            elif role == 'coach':
                cursor.execute("""
                INSERT INTO COACH (username, password, email, name, birthYear, country, team_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (username, password, email, name, birthYear, country, team_id))
                user_id = cursor.lastrowid
            
            elif role == 'parent':
                cursor.execute("""
                INSERT INTO PARENT (username, password, email, name, birthYear, country)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (username, password, email, name, birthYear, country))
                user_id = cursor.lastrowid
            
            else:
                raise ValueError("Invalid role provided")
            
            conn.commit()
            return user_id

    def get_user(self, id, role):
        """
        Retrieve a user by their ID and role.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            if role == 'player':
                query = "SELECT * FROM PLAYER WHERE id = ?"
            elif role == 'coach':
                query = "SELECT * FROM COACH WHERE id = ?"
            elif role == 'parent':
                query = "SELECT * FROM PARENT WHERE id = ?"
            else:
                raise ValueError("Invalid role provided")
            
            cursor.execute(query, (id,))
            return cursor.fetchone()
    def get_user_by_email(self, email):
        """
        Retrieve a user by their email and determine their role.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            # Check PLAYER table
            cursor.execute("SELECT * FROM PLAYER WHERE email = ?", (email,))
            user = cursor.fetchone()
            if user:
                return user, 'player'
            
            # Check COACH table
            cursor.execute("SELECT * FROM COACH WHERE email = ?", (email,))
            user = cursor.fetchone()
            if user:
                return user, 'coach'
            
            # Check PARENT table
            cursor.execute("SELECT * FROM PARENT WHERE email = ?", (email,))
            user = cursor.fetchone()
            if user:
                return user, 'parent'
            
            return None, None
    def update_user(self, id, role, **kwargs):
        """
        Update user information based on their role.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            if role == 'player':
                table = 'PLAYER'
            elif role == 'coach':
                table = 'COACH'
            elif role == 'parent':
                table = 'PARENT'
            else:
                raise ValueError("Invalid role provided")

            for key, value in kwargs.items():
                cursor.execute(f"""
                UPDATE {table} SET {key} = ? WHERE id = ?
                """, (value, id))
            conn.commit()
    def delete_user(self, id):
        """
        Delete a user from the PLAYER table.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            DELETE FROM PLAYER WHERE id = ?
            """, (id,))
            conn.commit()
            
    def get_categories_and_exercises_with_ratings(self, player_id):
    
        with self._get_connection() as conn:
            cursor = conn.cursor()
            print(player_id)

            query = """SELECT exercise_id, result, rating FROM PLAYER_EXERCISE WHERE player_Id = ?
            """
            
            cursor.execute(query, (player_id,))
            exercises = cursor.fetchall()
            
            
            category_data = {}
            for exercise in exercises:

                exercise_id = exercise[0]
                exercisenameandid = self.get_exercise_name_category_id(exercise_id)
                exercise_name = exercisenameandid[0]
                category_id = exercisenameandid[1]
                result = exercise[1]
                rating = exercise[2]

                if category_id not in category_data:
                    category_data[category_id] = [] 

                category_name = self.get_category_name(category_id)

                category_data[category_id].append({
                    "category": category_name,
                    "exercise_id": exercise_id,
                    "exercise": exercise_name,
                    "result": result,
                    "rating": rating
                })
    
        return category_data
    
    def get_categories_and_exercises_for_training_view(self, player_id):

        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            query = """ SELECT * FROM EXERCISE;
            """
            
            cursor.execute(query)
            exercises = cursor.fetchall()
            
            category_data = {}
            for exercise in exercises:
               
                exercise_id = exercise[0]
                category_id = exercise[1]
                exercise_name = exercise[2]

                if category_id not in category_data:
                    category_data[category_id] = []

                category_data[category_id].append({
                    "exercise_id": exercise_id,
                    "exercise": exercise_name
                })

        return category_data

    
    def get_exercise_name_category_id(self, exercise_id):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name, category_id FROM EXERCISE WHERE id = ?", (exercise_id,))
            exercise = cursor.fetchone()
            if exercise:
                return exercise
            return None
    def get_category_name(self, category_id):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM CATEGORY WHERE id = ?", (category_id,))
            category = cursor.fetchone()
            if category:
                return category[0]
            return None
        
    def get_default_exercises(self):
        
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM EXERCISE")
            exercises_data = cursor.fetchall()
            exercises = []
            for exercise in exercises_data:
                category_id = exercises_data[1]
                exercise_name = exercises_data[2]
                
                exercises.append({
                    "category_id": category_id,
                    "category": exercise_name
                })

            return exercises
        

    def create_team(self, team_name, coach_id):
        """
        Create a new team and assign the coach.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM TEAM WHERE name = ?", (team_name,))
            team = cursor.fetchone()
            if team:
                raise ValueError("Team name already exists")

            # Check if the coach is already associated with a team
            cursor.execute("SELECT id FROM TEAM WHERE coach_id = ?", (coach_id,))
            existing_team = cursor.fetchone()
            if existing_team:
                raise ValueError("Coach already has a team")
            
            cursor.execute("""
            INSERT INTO TEAM (name, coach_id)
            VALUES (?, ?)
            """, (team_name, coach_id))
            conn.commit()
   
    def update_exercise(self, data):
        exercise_name = data.get("exercise")
        playerId = data.get("playerId")
        duration = data.get("duration")
        rating = data.get("rating")
        extraInfo = data.get("extraInfo")
        timestamp = datetime.now()
    
        if not exercise_name:
            raise ValueError("Exercise name is required")
        
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                
                cursor.execute("SELECT id FROM EXERCISE WHERE name = ?", (exercise_name,))
                exercise_id_row = cursor.fetchone()
                
                if not exercise_id_row:
                    raise ValueError(f"Exercise '{exercise_name}' not found")
                
                exercise_id = exercise_id_row[0]
                
                cursor.execute("""
                    INSERT INTO PLAYER_EXERCISE (player_id, exercise_id, result, rating, timestamp, duration)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (playerId, exercise_id, extraInfo, rating, timestamp, duration))
                
                conn.commit()
        except Exception as e:
            raise e
     
    def get_team_by_coach(self, coach_id):
        """
        Retrieve a team by the coach ID.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT name FROM TEAM WHERE coach_id = ?
            """, (coach_id,))
            team = cursor.fetchone()
            if team:
                return {"teamName": team[0]}
            return None
                                  
    def join_team(self, team_name, player_id):
        """
        Add a player to a team and update the player's profile with the coach's information.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, coach_id FROM TEAM WHERE name = ?", (team_name,))
            team = cursor.fetchone()
            if not team:
                raise ValueError("Team not found")

            team_id = team[0]
            coach_id = team[1]

            cursor.execute("SELECT name, email FROM COACH WHERE id = ?", (coach_id,))
            coach = cursor.fetchone()
            if not coach:
                raise ValueError("Coach not found")

            coach_name = coach[0]
            coach_email = coach[1]

            cursor.execute("""
            UPDATE PLAYER
            SET team_id = ?, coach = ?, coachEmail = ?
            WHERE id = ?
            """, (team_id, coach_name, coach_email, player_id))
            conn.commit()
        
    def link_child(self, child_username, parent_id):
        """
        Link a child to a parent and update the parent's profile with the child's information.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email FROM PLAYER WHERE username = ?", (child_username,))
            child = cursor.fetchone()
            if not child:
                raise ValueError("Child not found")

            child_id = child[0]
            child_name = child[1]
            child_email = child[2]

            cursor.execute("SELECT name, email FROM PARENT WHERE id = ?", (parent_id,))
            parent = cursor.fetchone()
            if not parent:
                raise ValueError("Parent not found")

            parent_name = parent[0]
            parent_email = parent[1]

            cursor.execute("""
            UPDATE PARENT
            SET child_name = ?, child_email = ?
            WHERE id = ?
            """, (child_name, child_email, parent_id))

            cursor.execute("""
            UPDATE PLAYER
            SET parent = ?, parentEmail = ?
            WHERE id = ?
            """, (parent_name, parent_email, child_id))
                
            # Link the parent and child in the PARENT_PLAYER table
            cursor.execute("""
            INSERT OR IGNORE INTO PARENT_PLAYER (parent_id, player_id)
            VALUES (?, ?)
            """, (parent_id, child_id))
            
            conn.commit()
    