from sqlmodel import create_engine, SQLModel,text
from models.user import User
from models.item import Item
from dotenv import load_dotenv
import os

load_dotenv()

def create_tables():
    engine = create_engine(os.getenv('DATABASE_URL'))
    SQLModel.metadata.create_all(engine)

    print("Database tables successfully created!")
    print("\nTables created:")
    for table_name in SQLModel.metadata.tables.keys():
        print(f"  - {table_name}")


def delete_tables():
    engine = create_engine(os.getenv('DATABASE_URL'))
    with engine.connect() as conn:
        # Drop tables manually with CASCADE
        conn.execute(text("DROP TABLE IF EXISTS items CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        conn.commit()

if __name__ == '__main__':
    create_tables()