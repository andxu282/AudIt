import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

def generate_typescript_types():
    database_url = os.getenv('DATABASE_URL')

    subprocess.run([
        'datamodel-codegen',
        '--url', database_url,
        '--output', '../backend/generated_types.py',
        '--output-model-type', 'pydantic_v2.BaseModel',
        '--field-constraints'
    ], check=True)

    print("TypeScript types generated from Pydantic schemas")

if __name__ == '__main__':
    generate_typescript_types()