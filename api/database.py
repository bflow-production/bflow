import sqlite3

class Database:
    def __init__(self, db_name="BFLOW.db"):
        """
        Initialize the Database class.
        :param db_name: Name of the SQLite database file.
        """
        self.db_name = db_name
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
                FOREIGN KEY (team_id) REFERENCES TEAM(id) ON DELETE SET NULL
            )
            """)
            cursor.execute("""
        CREATE TABLE IF NOT EXISTS CATEGORY (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
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
            result TEXT DEFAULT NULL, -- Example: "45 km/h" for SHO exercises
            rating INTEGER DEFAULT NULL CHECK (rating BETWEEN 1 AND 5), -- Self-assessment scale
            FOREIGN KEY (player_id) REFERENCES PLAYER(id) ON DELETE CASCADE,
            FOREIGN KEY (exercise_id) REFERENCES EXERCISE(id) ON DELETE CASCADE
        )
        """)
        
        cursor.execute("SELECT * FROM PLAYER_EXERCISE")
        print(cursor.fetchall()) 

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
        return sqlite3.connect(self.db_name)


    def add_user(self, username, password, email, name, birthYear, country, number=None, team_id=None):
     """
    Add a new user to the PLAYER table.
    """
     number = number if number is not None else 0  
     team_id = team_id if team_id is not None else None
    
     with self._get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO PLAYER (username, password, email, name, birthYear, country, number, team_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (username, password, email, name, birthYear, country, number, team_id))
        player_id = cursor.lastrowid  
        
        # Prepopulate PLAYER_EXERCISE
        cursor.execute("SELECT id FROM EXERCISE")
        exercises = cursor.fetchall()
        player_exercises = [(player_id, exercise_id[0]) for exercise_id in exercises]
        cursor.executemany("""
        INSERT INTO PLAYER_EXERCISE (player_id, exercise_id)
        VALUES (?, ?)
        """, player_exercises)
        
        cursor.execute("SELECT * FROM PLAYER_EXERCISE")
        print(cursor.fetchall())
        
        conn.commit()
        return cursor.lastrowid


    def get_user(self, id):
        """
        Retrieve a user by their ID.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT * FROM PLAYER WHERE id = ?
            """, (id,))
            return cursor.fetchone()
        
    def get_user_by_email(self, email):
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()

        query = "SELECT * FROM PLAYER WHERE email = ?"
        cursor.execute(query, (email,))
        return cursor.fetchone()

    def update_user(self, id, **kwargs):
        """
        Update user information.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            for key, value in kwargs.items():
                cursor.execute(f"""
                UPDATE PLAYER SET {key} = ? WHERE id = ?
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
     """
     Get all categories and exercises along with their current result and rating for a given player.
     :param player_id: The ID of the player whose exercises and ratings are to be fetched.
     :return: A dictionary with categories and exercises along with their results and ratings.
     """
     with self._get_connection() as conn:
         cursor = conn.cursor()
         
         query = """
         SELECT
             c.name AS category,
             e.name AS exercise,
             pe.result,
             pe.rating
         FROM
             CATEGORY c
         JOIN EXERCISE e ON c.id = e.category_id
         LEFT JOIN PLAYER_EXERCISE pe ON e.id = pe.exercise_id AND pe.player_id = ?
         """
         
         cursor.execute(query, (player_id,))
         exercises = cursor.fetchall()
         
         category_data = {}
         for exercise in exercises:
             category = exercise[0] 
             exercise_name = exercise[1]  
             result = exercise[2] if exercise[2] else None 
             rating = exercise[3] if exercise[3] else None  
             
          
             if category not in category_data:
                 category_data[category] = []
             category_data[category].append({
                 "exercise": exercise_name,
                 "result": result,
                 "rating": rating
             })
     
     return category_data

   
    def update_exercise(self, data):
     exercise_name = data.get("exercise")
     playerId = data.get("playerId")
     result = data.get("result")
     rating = data.get("rating")
     
     if not exercise_name:
         raise ValueError("Exercise name is required")
     
     if (result is None or result == "N/A") and (rating is None or rating == 0):
        raise ValueError("At least one of 'result' or 'rating' must be provided and valid")
     
     try:
         with self._get_connection() as conn:
             cursor = conn.cursor()
           
             cursor.execute("SELECT id FROM EXERCISE WHERE name = ?", (exercise_name,))
             exercise_id_row = cursor.fetchone()
             
             if not exercise_id_row:
                 raise ValueError(f"Exercise '{exercise_name}' not found")
             
             exercise_id = exercise_id_row[0]
            
             fields_to_update = []
             values = []
             
             if result is not None and result != "N/A":
                fields_to_update.append("result = ?")
                values.append(result)
            
             if rating is not None and rating != 0:
                fields_to_update.append("rating = ?")
                values.append(rating)
            
             values.extend([playerId, exercise_id])
             
             query = f"""
             UPDATE PLAYER_EXERCISE
             SET {', '.join(fields_to_update)}
             WHERE player_id = ? AND exercise_id = ?
             """
        
             cursor.execute(query, tuple(values))
             conn.commit()
             
             if cursor.rowcount > 0:
                 return {"message": "Exercise updated successfully."}
             else:
                 return {"error": "No matching exercise found for this player."}
     except Exception as e:
         raise e
 
                                  
    
       


   