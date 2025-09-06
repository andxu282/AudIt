from pydantic2ts import generate_typescript_defs

if __name__ == '__main__':
    # Generate TypeScript definitions from your schemas with enum support
    generate_typescript_defs(
        "schemas.py", 
        "../frontend/src/generated.ts",
        json2ts_cmd=['--use-union-types', 'false', '--declare-enums']
    )
    
    print("✅ TypeScript types generated successfully!")
