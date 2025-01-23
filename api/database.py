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
                kayttajatunnus TEXT UNIQUE NOT NULL,
                salasana TEXT NOT NULL,
                mailiosoite TEXT NOT NULL UNIQUE,
                nimi TEXT NOT NULL,
                kuva TEXT DEFAULT NULL,
                syntymavuosi INTEGER NOT NULL,
                maa TEXT NOT NULL,
                pelinumero INTEGER DEFAULT NULL,
                joukkue_id INTEGER,
                FOREIGN KEY (joukkue_id) REFERENCES JOUKKUE(id) ON DELETE SET NULL
            )
            """)
            
            # Create JOUKKUE table
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS JOUKKUE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nimi TEXT NOT NULL UNIQUE,
                valmentaja TEXT NOT NULL,
                valmentajan_mailiosoite TEXT NOT NULL UNIQUE
            )
            """)
            
            # Create HUOLTAJAT table
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS HUOLTAJAT (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kayttajatunnus_id INTEGER NOT NULL,
                nimi TEXT NOT NULL,
                mailiosoite TEXT NOT NULL UNIQUE,
                FOREIGN KEY (kayttajatunnus_id) REFERENCES PLAYER(kayttajatunnus) ON DELETE CASCADE
            )
            """)

    def _get_connection(self):
        """
        Establish a connection to the SQLite database.
        :return: SQLite connection object.
        """
        return sqlite3.connect(self.db_name)

    # --- CRUD Methods for PLAYER ---

    def add_user(self, kayttajatunnus, salasana, mailiosoite, nimi, syntymavuosi, maa, pelinumero=None, joukkue_id=None):
     """
    Add a new user to the PLAYER table.
    """
     pelinumero = pelinumero if pelinumero is not None else 0  
     joukkue_id = joukkue_id if joukkue_id is not None else None
    
     with self._get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO PLAYER (kayttajatunnus, salasana, mailiosoite, nimi, syntymavuosi, maa, pelinumero, joukkue_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (kayttajatunnus, salasana, mailiosoite, nimi, syntymavuosi, maa, pelinumero, joukkue_id))
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

        query = "SELECT * FROM PLAYER WHERE mailiosoite = ?"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        conn.close()
        return user

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

    # --- CRUD Methods for JOUKKUE ---

    def add_team(self, nimi, valmentaja, valmentajan_mailiosoite):
        """
        Add a new team to the JOUKKUE table.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO JOUKKUE (nimi, valmentaja, valmentajan_mailiosoite)
            VALUES (?, ?, ?)
            """, (nimi, valmentaja, valmentajan_mailiosoite))
            conn.commit()
            return cursor.lastrowid

    def get_team(self, id):
        """
        Retrieve a team by its ID.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT * FROM JOUKKUE WHERE id = ?
            """, (id,))
            return cursor.fetchone()

    # --- CRUD Methods for HUOLTAJAT ---

    def add_guardian(self, kayttajatunnus_id, nimi, mailiosoite):
        """
        Add a new guardian to the HUOLTAJAT table.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO HUOLTAJAT (kayttajatunnus_id, nimi, mailiosoite)
            VALUES (?, ?, ?)
            """, (kayttajatunnus_id, nimi, mailiosoite))
            conn.commit()
            return cursor.lastrowid

    def get_guardians_by_user(self, kayttajatunnus_id):
        """
        Retrieve all guardians for a specific user.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT * FROM HUOLTAJAT WHERE kayttajatunnus_id = ?
            """, (kayttajatunnus_id,))
            return cursor.fetchall()
