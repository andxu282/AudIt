from sqlalchemy import create_engine, text
from models.base import Base
from models.item import Item
from dotenv import load_dotenv
import os

load_dotenv()

def create_tables():
    engine = create_engine(os.getenv('DATABASE_URL'))
    Base.metadata.create_all(engine)

    print("Database tables successfully created!")
    print("\nTables created:")
    for table_name in Base.metadata.tables.keys():
        print(f"  - {table_name}")


def delete_tables():
    engine = create_engine(os.getenv('DATABASE_URL'))
    with engine.connect() as conn:
        # Drop tables manually with CASCADE
        conn.execute(text("DROP TABLE IF EXISTS items CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        conn.commit()

if __name__ == '__main__':
    delete_tables()
    create_tables()