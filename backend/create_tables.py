from sqlalchemy import create_engine
from models.base import Base
from models.user import User
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

if __name__ == '__main__':
    create_tables()