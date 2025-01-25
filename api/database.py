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
            

    def _get_connection(self):
        """
        Establish a connection to the SQLite database.
        :return: SQLite connection object.
        """
        return sqlite3.connect(self.db_name)

    # --- CRUD Methods for PLAYER ---

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

   