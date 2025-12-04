import pdfplumber
import sys

pdf_path = sys.argv[1]

with pdfplumber.open(pdf_path) as pdf:
    print(f"Total pages: {len(pdf.pages)}")
    print("\n" + "="*80)
    
    for i, page in enumerate(pdf.pages):
        print(f"\n--- Page {i+1} ---")
        
        # Extract text to find context
        text = page.extract_text()
        if text:
            print("TEXT SNIPPET:")
            print(text[:500])
        
        # Extract tables
        tables = page.extract_tables()
        if tables:
            print(f"\nFOUND {len(tables)} TABLES:")
            for j, table in enumerate(tables):
                print(f"\nTable {j+1}:")
                # Print first 5 rows
                for row in table[:5]:
                    print(row)
                if len(table) > 5:
                    print(f"... ({len(table)-5} more rows)")
        else:
            print("\nNO TABLES FOUND")
            
        print("\n" + "="*80)
